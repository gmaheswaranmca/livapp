# Bundle 5 — Transactional Outbox + Event Versioning

Goal:
Eliminate the dangerous gap:

DB commit succeeds
but event publish fails.

This bundle implements Phase 11 foundation:

* Outbox Pattern
* Publisher worker
* Reliable event publication
* Event version evolution

---

# 1. The Failure We Fix

Bad sequence:

```text
Insert order
Commit
Crash
OrderCreated never published
```

Workflow broken.

Outbox solves this.

---

# 2. Add Outbox Table (order_db)

Run in orderdb:

```sql
CREATE TABLE outbox_events (
 id SERIAL PRIMARY KEY,
 event_id VARCHAR(100),
 aggregate_id VARCHAR(100),
 event_type VARCHAR(100),
 version INT,
 payload JSONB,
 status VARCHAR(20) DEFAULT 'PENDING',
 created_at TIMESTAMP DEFAULT NOW(),
 sent_at TIMESTAMP
);
```

---

# 3. Change Order Create Logic

Do NOT publish directly from request handler anymore.

Replace Bundle3 order POST with:

```typescript
const c=await pool.connect();

try{
 await c.query('BEGIN');

 await c.query(
 'INSERT INTO orders(order_id,customer_id,amount,status) VALUES($1,$2,$3,$4)',
 [orderId,body.customerId,body.amount,'PENDING']
 );

 const eventPayload={
   eventId:'E1001',
   eventType:'OrderCreated',
   orderId,
   items:body.items,
   amount:body.amount,
   version:1,
   correlationId:'REQ-1'
 };

 await c.query(
 `INSERT INTO outbox_events(
  event_id,
  aggregate_id,
  event_type,
  version,
  payload,
  status
 ) VALUES($1,$2,$3,$4,$5,$6)`,
 [
  'E1001',
  orderId,
  'OrderCreated',
  1,
  JSON.stringify(eventPayload),
  'PENDING'
 ]
 );

 await c.query('COMMIT');

 res.json({orderId,status:'PENDING'});
}
catch(e){
 await c.query('ROLLBACK');
 throw e;
}
finally{
 c.release();
}
```

Important:
No Kafka publish here.

Only DB transaction.

---

# 4. Outbox Publisher Worker

order-service/src/outbox-publisher.ts

```typescript
import {Pool} from 'pg';
import {publish} from './kafka';

const pool=new Pool({
 host:'order-db',
 user:'appuser',
 password:'apppassword',
 database:'orderdb'
});

async function poll(){

 const rows=await pool.query(
 `SELECT *
  FROM outbox_events
  WHERE status='PENDING'
  ORDER BY id
  LIMIT 50`
 );

 for(const r of rows.rows){

   try{

    await publish(
      'order-events',
      r.payload
    );

    await pool.query(
    `UPDATE outbox_events
      SET status='SENT',
          sent_at=NOW()
      WHERE id=$1`,
      [r.id]
    );

   }
   catch(e){
     console.log('publish failed, retry later');
   }
 }
}

setInterval(poll,3000);
```

This is the relay.

---

# 5. Add Script

order-service/package.json

```json
"scripts":{
 "dev":"ts-node src/index.ts",
 "outbox":"ts-node src/outbox-publisher.ts"
}
```

Run alongside service.

---

# 6. Crash Safety Now

Suppose request succeeds.

App crashes.

When publisher returns:

```text
PENDING events still in outbox
```

Publisher sends later.

No lost event.

Critical guarantee.

---

# 7. Optional Claim Pattern (Avoid Double Publishers)

If multiple publisher instances later:

Use claim step.

Example:

```sql
UPDATE outbox_events
SET status='SENDING'
WHERE id=$1
AND status='PENDING';
```

Prevents duplicate workers publishing same row.

Good evolution.

---

# 8. Event Versioning Rules

We already have:

```json
version:1
```

Now define evolution.

---

Version 1:

```json
{
 "orderId":"O500",
 "amount":2500
}
```

---

Version 2:

```json
{
 "orderId":"O500",
 "amount":2500,
 "countryCode":"IN"
}
```

Added field.

Backward-compatible.

Good.

---

# 9. Consumer Handles Multiple Versions

Example payment consumer:

```typescript
if(e.version===1){
 amount=e.amount;
}

if(e.version===2){
 amount=e.amount;
 country=e.countryCode;
}
```

Consumers evolve safely.

---

# 10. Schema Validation Layer (Simple)

shared-lib/src/validate.ts

```typescript
export function validateOrderCreated(e:any){
 if(!e.orderId)
   throw new Error('invalid event');

 if(!e.version)
   throw new Error('missing version');
}
```

Call before processing.

Basic discipline.

---

# 11. Add Version in All Published Events

Inventory:

```json
{
 "eventType":"InventoryReserved",
 "version":1
}
```

Payment:

```json
{
 "eventType":"PaymentAuthorized",
 "version":1
}
```

Always.

---

# 12. Optional Inbox Pattern (Advanced Safety)

You already have:

```text
processed:event:E1001
```

That acts like lightweight inbox.

Combined with outbox:

Very strong pattern.

---

# 13. Test Outbox

Temporarily stop publisher.

Create order.

Verify:

```sql
SELECT * FROM outbox_events;
```

Should show:

```text
PENDING
```

Start publisher.

Should become:

```text
SENT
```

and workflow continues.

Perfect.

---

# 14. Test Publish Failure

Break Kafka temporarily.

Publisher should:

```text
publish failed, retry later
```

No event loss.

When Kafka returns:

publishes successfully.

---

# 15. What This Implements

✔ Transactional outbox
✔ Publisher relay
✔ Reliable event publication
✔ Crash gap removed
✔ Event version evolution model
✔ Basic schema validation

Major enterprise step.

---

# 16. Architecture Now

Client
→ Order transaction

* write order
* write outbox

Outbox Publisher
→ Kafka

Consumers react

This is safer than direct publish.

---

# 17. Still Missing

Not yet added:

* Kubernetes manifests
* probes
* HPA
* ConfigMaps
* Secrets
* observability stack manifests

Next we move infra.

---

## Next = Bundle 6

Will add:

* Kubernetes YAML
* Deployments
* Services
* probes
* HPA
* ConfigMaps
* Secrets
* deploy commands
