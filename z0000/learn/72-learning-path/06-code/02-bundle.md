# Bundle 2 — Core Service Code (CRUD + APIs + Databases + Synchronous Flow)

Goal: make the 4 services actually work end-to-end (Phase 1 implementation).

Tech:

* Node + TypeScript + Express
* PostgreSQL (one DB per service)
* Using the Bundle 1 docker-compose

---

# 1. Install additional package in each service

Add to each service package.json dependencies:

```json
"pg":"^8.12.0",
"uuid":"^10.0.0"
```

Then:

```bash
npm install
```

---

# 2. Database Schemas

## order_db

Connect:

```bash
psql -h localhost -p 5432 -U appuser -d orderdb
```

Create:

```sql
CREATE TABLE orders (
  order_id VARCHAR(50) PRIMARY KEY,
  customer_id VARCHAR(50),
  amount NUMERIC(12,2),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE order_items (
 id SERIAL PRIMARY KEY,
 order_id VARCHAR(50),
 sku VARCHAR(50),
 qty INT
);
```

---

## inventory_db

```sql
CREATE TABLE inventory_stock (
 sku VARCHAR(50) PRIMARY KEY,
 quantity_available INT,
 quantity_reserved INT DEFAULT 0
);

INSERT INTO inventory_stock VALUES ('P1',100,0);
```

---

## payment_db

```sql
CREATE TABLE payments (
 payment_id VARCHAR(50) PRIMARY KEY,
 order_id VARCHAR(50),
 amount NUMERIC(12,2),
 status VARCHAR(50),
 created_at TIMESTAMP DEFAULT NOW()
);
```

---

## shipping_db

```sql
CREATE TABLE shipments (
 shipment_id VARCHAR(50) PRIMARY KEY,
 order_id VARCHAR(50),
 status VARCHAR(50),
 created_at TIMESTAMP DEFAULT NOW()
);
```

---

# 3. inventory-service/src/index.ts

```typescript
import express from "express";
import {Pool} from "pg";

const app=express();
app.use(express.json());

const pool=new Pool({
 host:"inventory-db",
 user:"appuser",
 password:"apppassword",
 database:"inventorydb",
 port:5432
});

app.get('/health',(req,res)=>res.json({status:'UP'}));

app.post('/inventory/reserve', async(req,res)=>{
 const {orderId,items}=req.body;
 const sku=items[0].sku;
 const qty=items[0].qty;

 const c=await pool.connect();
 try{
   await c.query('BEGIN');

   const r=await c.query(
    'SELECT quantity_available FROM inventory_stock WHERE sku=$1 FOR UPDATE',
    [sku]
   );

   if(r.rows.length===0){
      await c.query('ROLLBACK');
      return res.status(404).json({error:'SKU_NOT_FOUND'});
   }

   if(r.rows[0].quantity_available < qty){
      await c.query('ROLLBACK');
      return res.status(400).json({error:'OUT_OF_STOCK'});
   }

   await c.query(
    `UPDATE inventory_stock
      SET quantity_available=quantity_available-$1,
          quantity_reserved=quantity_reserved+$1
      WHERE sku=$2`,
    [qty,sku]
   );

   await c.query('COMMIT');

   res.json({reservationId:'R100',status:'Reserved'});
 }catch(e){
   await c.query('ROLLBACK');
   res.status(500).json({error:'RESERVE_FAILED'});
 }finally{
   c.release();
 }
});

app.listen(5001);
```

---

# 4. payment-service/src/index.ts

```typescript
import express from "express";
import {Pool} from "pg";

const app=express();
app.use(express.json());

const pool=new Pool({
 host:'payment-db',
 user:'appuser',
 password:'apppassword',
 database:'paymentdb',
 port:5432
});

app.post('/payments/authorize', async(req,res)=>{
 const {orderId,amount}=req.body;

 const paymentId='P900';

 await pool.query(
 'INSERT INTO payments(payment_id,order_id,amount,status) VALUES($1,$2,$3,$4)',
 [paymentId,orderId,amount,'AUTHORIZED']
 );

 res.json({paymentId,status:'Authorized'});
});

app.listen(5002);
```

---

# 5. shipping-service/src/index.ts

```typescript
import express from 'express';
import {Pool} from 'pg';

const app=express();
app.use(express.json());

const pool=new Pool({
 host:'shipping-db',
 user:'appuser',
 password:'apppassword',
 database:'shippingdb',
 port:5432
});

app.post('/shipments/create', async(req,res)=>{
 const {orderId}=req.body;

 const shipmentId='S333';

 await pool.query(
 'INSERT INTO shipments(shipment_id,order_id,status) VALUES($1,$2,$3)',
 [shipmentId,orderId,'CREATED']
 );

 res.json({shipmentId,status:'Created'});
});

app.listen(5003);
```

---

# 6. order-service/src/index.ts

This becomes temporary synchronous orchestrator.

```typescript
import express from 'express';
import {Pool} from 'pg';

const app=express();
app.use(express.json());

const pool=new Pool({
 host:'order-db',
 user:'appuser',
 password:'apppassword',
 database:'orderdb',
 port:5432
});

async function postJson(url:string,payload:any){
 const r=await fetch(url,{
   method:'POST',
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify(payload)
 });
 if(!r.ok) throw new Error(await r.text());
 return r.json();
}

app.post('/', async(req,res)=>{
 const body=req.body || {
   customerId:'C101',
   items:[{sku:'P1',qty:2}],
   amount:2500
 };

 const orderId='O500';

 try{
   await pool.query(
   'INSERT INTO orders(order_id,customer_id,amount,status) VALUES($1,$2,$3,$4)',
   [orderId,body.customerId,body.amount,'PENDING']
   );

   await pool.query(
   'INSERT INTO order_items(order_id,sku,qty) VALUES($1,$2,$3)',
   [orderId,body.items[0].sku,body.items[0].qty]
   );

   await postJson(
    'http://inventory-service:5001/inventory/reserve',
    {orderId,items:body.items}
   );

   await postJson(
    'http://payment-service:5002/payments/authorize',
    {orderId,amount:body.amount}
   );

   await postJson(
    'http://shipping-service:5003/shipments/create',
    {orderId}
   );

   await pool.query(
    'UPDATE orders SET status=$1 WHERE order_id=$2',
    ['COMPLETED',orderId]
   );

   res.json({orderId,status:'COMPLETED'});
 }
 catch(e){
   await pool.query(
    'UPDATE orders SET status=$1 WHERE order_id=$2',
    ['CANCELLED',orderId]
   );

   res.status(500).json({
     orderId,
     status:'CANCELLED',
     error:'FLOW_FAILED'
   });
 }
});

app.listen(5000);
```

---

# 7. Gateway unchanged (from Bundle1)

Still:

```http
POST /api/orders
```

routes to order-service.

---

# 8. Rebuild

```bash
docker compose down

docker compose up --build
```

---

# 9. Test

```bash
curl -X POST http://localhost:8080/api/orders \
-H "Content-Type: application/json" \
-d '{
"customerId":"C101",
"items":[{"sku":"P1","qty":2}],
"amount":2500
}'
```

Expected:

```json
{
 "orderId":"O500",
 "status":"COMPLETED"
}
```

---

# 10. Verify Database State

Order:

```sql
SELECT * FROM orders;
```

Should show:

```text
COMPLETED
```

Inventory:

```sql
SELECT * FROM inventory_stock;
```

Should show reduced available quantity.

---

# 11. Current Flow

Working now:

Client
→ Gateway
→ Order Service
→ Inventory Service
→ Payment Service
→ Shipping Service

Exactly Phase 1 implemented.

---

# 12. Known Gaps (Expected)

Still missing by design:

* no Kafka events yet
* no Saga through broker
* no Redis idempotency yet
* no retries
* no circuit breaker
* no outbox

Those are Bundle 3 onward.

---

# 13. Optional Failure Test

Set inventory quantity_available = 0

```sql
UPDATE inventory_stock
SET quantity_available=0
WHERE sku='P1';
```

Re-run order.

Should return:

```json
status: CANCELLED
```

Simple compensation placeholder.

---

## Next = Bundle 3

Will add:

* Kafka producers
* consumers
* OrderCreated event
* InventoryReserved event
* choreography Saga
* compensation events
* remove synchronous chaining
