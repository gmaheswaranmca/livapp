# Bundle 3 — Kafka Events + Saga Choreography (Replace Synchronous Chaining)

Goal:
Remove direct REST chaining from Order -> Inventory -> Payment -> Shipping

Replace with:

Order publishes event
Services react through events

This is Phase 2 + Phase 3 implementation foundation.

Tech:

* Node TypeScript
* KafkaJS client
* Choreography-style Saga
* Using Kafka already running in Bundle 1

---

# 1. Install Kafka client

In all four services:

```bash
npm install kafkajs
```

---

# 2. Topics (auto-create enabled in dev)

We will use:

```text
order-events
inventory-events
payment-events
shipping-events
```

---

# 3. Shared Kafka Helper (add per service or shared-lib)

shared-lib/src/kafka.ts

```typescript
import { Kafka } from 'kafkajs';

export const kafka = new Kafka({
 clientId:'commerce-platform',
 brokers:['kafka:9092']
});

export async function publish(topic:string,message:any){
 const producer=kafka.producer();
 await producer.connect();
 await producer.send({
   topic,
   messages:[{
      key: message.orderId || message.eventId,
      value: JSON.stringify(message)
   }]
 });
 await producer.disconnect();
}
```

---

# 4. Event Envelope Standard

Use:

```json
{
 "eventId":"E1001",
 "eventType":"OrderCreated",
 "orderId":"O500",
 "version":1,
 "correlationId":"REQ-1"
}
```

All services use this.

---

# 5. Replace order-service POST flow

order-service/src/index.ts
(keep DB insert from Bundle2, remove synchronous service calls)

Replace main POST route logic with:

```typescript
import {publish} from './kafka';

app.post('/', async(req,res)=>{
 const body=req.body;
 const orderId='O500';

 await pool.query(
 'INSERT INTO orders(order_id,customer_id,amount,status) VALUES($1,$2,$3,$4)',
 [orderId,body.customerId,body.amount,'PENDING']
 );

 await publish('order-events',{
   eventId:'E1001',
   eventType:'OrderCreated',
   orderId,
   items:body.items,
   amount:body.amount,
   version:1,
   correlationId:'REQ-1'
 });

 res.json({
   orderId,
   status:'PENDING'
 });
});
```

Order returns immediately now.

Important shift.

---

# 6. Inventory Consumer

inventory-service/src/consumer.ts

```typescript
import {kafka,publish} from './kafka';
import {Pool} from 'pg';

const pool=new Pool({
 host:'inventory-db',
 user:'appuser',
 password:'apppassword',
 database:'inventorydb'
});

async function run(){
 const consumer=kafka.consumer({groupId:'inventory-group'});

 await consumer.connect();
 await consumer.subscribe({
   topic:'order-events'
 });

 await consumer.run({
 eachMessage: async({message})=>{

  const e=JSON.parse(message.value!.toString());

  if(e.eventType!=='OrderCreated') return;

  const sku=e.items[0].sku;
  const qty=e.items[0].qty;

  const c=await pool.connect();

  try{
   await c.query('BEGIN');

   const r=await c.query(
   'SELECT quantity_available FROM inventory_stock WHERE sku=$1 FOR UPDATE',
   [sku]
   );

   if(r.rows[0].quantity_available < qty){
      await c.query('ROLLBACK');

      await publish('inventory-events',{
       eventType:'InventoryReservationFailed',
       orderId:e.orderId,
       eventId:'E2002'
      });

      return;
   }

   await c.query(
   `UPDATE inventory_stock
      SET quantity_available=quantity_available-$1,
          quantity_reserved=quantity_reserved+$1
    WHERE sku=$2`,
    [qty,sku]
   );

   await c.query('COMMIT');

   await publish('inventory-events',{
     eventType:'InventoryReserved',
     orderId:e.orderId,
     amount:e.amount,
     eventId:'E2001'
   });

  }finally{
   c.release();
  }
 }
});
}

run();
```

---

# 7. Payment Consumer

payment-service/src/consumer.ts

```typescript
import {kafka,publish} from './kafka';
import {Pool} from 'pg';

const pool=new Pool({
 host:'payment-db',
 user:'appuser',
 password:'apppassword',
 database:'paymentdb'
});

async function run(){
 const consumer=kafka.consumer({groupId:'payment-group'});

 await consumer.connect();
 await consumer.subscribe({topic:'inventory-events'});

 await consumer.run({
 eachMessage: async({message})=>{

 const e=JSON.parse(message.value!.toString());

 if(e.eventType!=='InventoryReserved') return;

 await pool.query(
 'INSERT INTO payments(payment_id,order_id,amount,status) VALUES($1,$2,$3,$4)',
 ['P900',e.orderId,e.amount,'AUTHORIZED']
 );

 await publish('payment-events',{
   eventType:'PaymentAuthorized',
   orderId:e.orderId,
   eventId:'E3001'
 });

 }
});
}

run();
```

---

# 8. Shipping Consumer

shipping-service/src/consumer.ts

```typescript
import {kafka,publish} from './kafka';
import {Pool} from 'pg';

const pool=new Pool({
 host:'shipping-db',
 user:'appuser',
 password:'apppassword',
 database:'shippingdb'
});

async function run(){
 const consumer=kafka.consumer({groupId:'shipping-group'});

 await consumer.connect();
 await consumer.subscribe({topic:'payment-events'});

 await consumer.run({
 eachMessage: async({message})=>{

 const e=JSON.parse(message.value!.toString());

 if(e.eventType!=='PaymentAuthorized') return;

 await pool.query(
 'INSERT INTO shipments(shipment_id,order_id,status) VALUES($1,$2,$3)',
 ['S333',e.orderId,'CREATED']
 );

 await publish('shipping-events',{
  eventType:'ShipmentCreated',
  orderId:e.orderId,
  eventId:'E4001'
 });

 }
});
}

run();
```

---

# 9. Order Consumer (Complete Order)

order-service/src/order-consumer.ts

```typescript
import {kafka} from './kafka';

async function run(){
 const consumer=kafka.consumer({groupId:'order-group'});

 await consumer.connect();
 await consumer.subscribe({topic:'shipping-events'});
 await consumer.subscribe({topic:'inventory-events'});
 await consumer.subscribe({topic:'payment-events'});

 await consumer.run({
 eachMessage: async({message})=>{

 const e=JSON.parse(message.value!.toString());

 if(e.eventType==='ShipmentCreated'){
   await pool.query(
   'UPDATE orders SET status=$1 WHERE order_id=$2',
   ['COMPLETED',e.orderId]
   );
 }

 if(e.eventType==='InventoryReservationFailed'){
   await pool.query(
   'UPDATE orders SET status=$1 WHERE order_id=$2',
   ['CANCELLED',e.orderId]
   );
 }

 }
});
}

run();
```

---

# 10. Compensation Example (Payment Failure)

Simulate in payment consumer:

Instead of PaymentAuthorized:

publish:

```json
{
 "eventType":"PaymentFailed"
}
```

Then inventory consumer can subscribe to payment-events and release stock.

Add in inventory-service:

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
  orderId:e.orderId
 });
}
```

Basic compensation path.

---

# 11. Run consumers

Simplest dev option:

Add in package.json:

```json
"scripts":{
 "dev":"ts-node src/index.ts",
 "consumer":"ts-node src/consumer.ts"
}
```

Run consumer process in service container or combine later.

For now you may run second process manually.

---

# 12. Rebuild

```bash
docker compose down

docker compose up --build
```

---

# 13. Test

Create order:

```bash
curl -X POST http://localhost:8080/api/orders \
-H "Content-Type: application/json" \
-d '{
"customerId":"C101",
"items":[{"sku":"P1","qty":2}],
"amount":2500
}'
```

Immediate response:

```json
{
 "status":"PENDING"
}
```

Then verify later:

```sql
SELECT status FROM orders WHERE order_id='O500';
```

Should become:

```text
COMPLETED
```

asynchronously.

---

# 14. Architecture Now

Client
→ Gateway
→ Order saves + publishes OrderCreated

Kafka
→ Inventory reacts
→ Payment reacts
→ Shipping reacts
→ Order marks completed

Actual choreography.

---

# 15. What This Implements

✔ Kafka producers
✔ Kafka consumers
✔ Topics
✔ Choreography Saga
✔ Compensation foundation
✔ Async order processing

This is real distributed workflow.

---

# 16. Still Missing (By Design)

Not yet added:

* Redis idempotency
* duplicate-event protection
* retries
* DLQ
* circuit breakers
* outbox

That is Bundle 4 onward.

---

## Next = Bundle 4

Will add:

* Redis keys
* processed:event dedup
* idempotency
* retries
* DLQ
* circuit breaker
