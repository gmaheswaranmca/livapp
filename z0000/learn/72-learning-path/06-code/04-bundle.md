# Bundle 4 — Redis Idempotency + Retry + DLQ + Circuit Breaker

Goal:
Make Bundle 3 safe under duplicates and transient failures.

Implements Phase 4 + Phase 5 + core of Phase 6.

Adds:

* Redis event dedup
* Idempotency keys
* Retry with exponential backoff
* DLQ topic
* Circuit breaker (application-level)

Tech:

* ioredis
* KafkaJS
* lightweight in-process breaker pattern

---

# 1. Install

In services needing consumers:

```bash
npm install ioredis
```

---

# 2. Shared Redis Helper

shared-lib/src/redis.ts

```typescript
import Redis from 'ioredis';

export const redis=new Redis({
 host:'redis',
 port:6379
});
```

---

# 3. Event Dedup Utility

shared-lib/src/dedup.ts

```typescript
import {redis} from './redis';

export async function alreadyProcessed(eventId:string){
 const key=`processed:event:${eventId}`;
 const exists=await redis.exists(key);
 return exists===1;
}

export async function markProcessed(eventId:string){
 await redis.set(
  `processed:event:${eventId}`,
  '1',
  'EX',
  86400
 );
}
```

---

# 4. Use Dedup in Every Consumer

At top of each consumer message handler:

```typescript
import {alreadyProcessed,markProcessed} from './dedup';

const e=JSON.parse(message.value!.toString());

if(await alreadyProcessed(e.eventId)){
 console.log('Duplicate ignored');
 return;
}
```

After successful processing:

```typescript
await markProcessed(e.eventId);
```

This prevents duplicate side effects.

---

# 5. Payment Idempotency Key

shared-lib/src/idempotency.ts

```typescript
import {redis} from './redis';

export async function beginPayment(requestId:string){
 const key=`idempotency:payment:${requestId}`;

 const result=await redis.set(
   key,
   'processing',
   'NX',
   'EX',
   86400
 );

 return result==='OK';
}

export async function storePaymentResult(requestId:string,paymentId:string){
 await redis.set(
 `idempotency:payment:${requestId}`,
 JSON.stringify({paymentId,status:'AUTHORIZED'}),
 'EX',86400
 );
}
```

---

# 6. Use in Payment Consumer

Before authorizing payment:

```typescript
const allowed=await beginPayment(`PAY-${e.orderId}`);

if(!allowed){
 console.log('Duplicate payment prevented');
 return;
}
```

After insert:

```typescript
await storePaymentResult(
 `PAY-${e.orderId}`,
 'P900'
);
```

Prevents double charge.

---

# 7. Retry Helper

shared-lib/src/retry.ts

```typescript
function sleep(ms:number){
 return new Promise(r=>setTimeout(r,ms));
}

export async function retry(
 fn:any,
 attempts=3
){
 let i=0;

 while(i<attempts){
   try{
      return await fn();
   }
   catch(e){
      i++;

      if(i>=attempts) throw e;

      const delay=Math.pow(2,i)*1000+
                  Math.floor(Math.random()*500);

      await sleep(delay);
   }
 }
}
```

---

# 8. Use Retry Around Payment Provider Logic

Replace payment authorization block:

```typescript
import {retry} from './retry';

await retry(async()=>{

 // simulate provider call
 const providerAvailable=true;

 if(!providerAvailable)
   throw new Error('TEMP_FAILURE');

 await pool.query(
 'INSERT INTO payments(payment_id,order_id,amount,status) VALUES($1,$2,$3,$4)',
 ['P900',e.orderId,e.amount,'AUTHORIZED']
 );

});
```

Transient failures recover.

---

# 9. DLQ Topic

Add topic:

```text
payment-dlq
```

On retry exhaustion:

```typescript
catch(err){
 await publish('payment-dlq',{
   eventType:'PaymentDeadLetter',
   failedEvent:e,
   reason:'RetryExhausted'
 });

 await publish('payment-events',{
   eventType:'PaymentFailed',
   orderId:e.orderId,
   eventId:'E3999'
 });
}
```

Now compensation can begin.

---

# 10. Simple Circuit Breaker

shared-lib/src/breaker.ts

```typescript
let failures=0;
let state='CLOSED';
let openedAt=0;

export function breakerOpen(){
 return state==='OPEN';
}

export async function protectedCall(fn:any){

 if(state==='OPEN'){

   if(Date.now()-openedAt > 30000){
      state='HALF_OPEN';
   }
   else{
      throw new Error('CIRCUIT_OPEN');
   }
 }

 try{
   const result=await fn();

   failures=0;

   if(state==='HALF_OPEN')
      state='CLOSED';

   return result;
 }
 catch(e){

   failures++;

   if(failures>=5){
      state='OPEN';
      openedAt=Date.now();
   }

   throw e;
 }
}
```

---

# 11. Wrap Payment External Call with Breaker

```typescript
import {protectedCall} from './breaker';

await protectedCall(async()=>{

 return await retry(async()=>{

   const providerAvailable=true;

   if(!providerAvailable)
      throw new Error('TEMP_FAIL');

   await pool.query(
   'INSERT INTO payments(payment_id,order_id,amount,status) VALUES($1,$2,$3,$4)',
   ['P900',e.orderId,e.amount,'AUTHORIZED']
   );

 });

});
```

Layering:

retry inside breaker.

Correct ordering.

---

# 12. Handle Open Circuit

```typescript
catch(err){
 if(err.message==='CIRCUIT_OPEN'){

  await publish('payment-events',{
    eventType:'PaymentFailed',
    orderId:e.orderId,
    reason:'CircuitOpen'
  });
 }
}
```

Fail fast.

---

# 13. Inventory Compensation Consumer

Ensure inventory listens to payment-events:

```typescript
if(e.eventType==='PaymentFailed'){

 await pool.query(
 `UPDATE inventory_stock
 SET quantity_available=quantity_available+2,
     quantity_reserved=quantity_reserved-2
 WHERE sku='P1'`
 );

 await publish('inventory-events',{
   eventType:'InventoryReleased',
   orderId:e.orderId,
   eventId:'E2003'
 });
}
```

Compensation still works.

---

# 14. Redis Key Strategy Now Active

Using:

```text
processed:event:E1001

idempotency:payment:PAY-O500
```

Can later add:

```text
saga:order:O500
```

in next bundle.

---

# 15. Test Duplicate Event Safety

Produce same InventoryReserved twice.

Second one should log:

```text
Duplicate ignored
```

and NOT create second payment.

---

# 16. Test Retry

Set:

```typescript
const providerAvailable=false
```

Observe:

attempts with backoff.

Then:

DLQ event.

Then:

PaymentFailed compensation.

---

# 17. Test Circuit Breaker

Force repeated failures.

After threshold:

```text
CIRCUIT_OPEN
```

New requests fail fast.

Half-open after 30 sec.

---

# 18. What This Implements

✔ Duplicate-event protection
✔ Payment idempotency
✔ Retry with exponential backoff
✔ Jitter
✔ DLQ
✔ Circuit breaker
✔ Compensation still integrated

Massive resilience jump.

---

# 19. Still Missing

Not yet added:

* transactional outbox
* event publishing reliability gap
* event version evolution handling
* Kubernetes manifests

Next bundle addresses the dangerous DB commit / event publish gap.

---

## Next = Bundle 5

Will add:

* outbox_events table
* publisher worker
* transactional outbox
* event version handling
