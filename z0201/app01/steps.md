# 1. Setup of dockers "postgres" and "order-service" with limits for each containers
## Steps
```bash
## Open Terminal
cd \z0201\app01\services
## Create dir structure
```

## Dir Structure
```
services/
├── .env
├── docker-compose.yml
├── order-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── src/index.ts
```

## Continuing Commands:
```bash
## Check node 
node -v
npm -v
```

## services/.env
```dotenv
POSTGRES_USER=appuser
POSTGRES_PASSWORD=apppassword
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

POSTGRES_DB=appdb
ORDER_DB=orderdb

ORDER_PORT=5000
```

## services/db-init/init.sql
```sql
CREATE DATABASE orderdb;
```

## in dir "services/order-service"
```bash
npm init
## follow all default steps for creating init

npm install express pg
npm install -D typescript ts-node
npm install -D @types/express
npm install -D @types/express @types/node
npm install -D @types/pg
```

## services/order-service/tsconfig.json
```json
{
 "compilerOptions":{
   "target":"ES2020",
   "module":"commonjs",
   "strict":true
 }
}
```

## services/order-service/package.json
```json
{
 ...
 "scripts":{
   ...,
   "dev":"ts-node src/index.ts"
 }
 ...
}
```

## services/order-service/index.ts
```ts
import express from "express";

const app = express();

app.use(express.json());

app.get("/health",(req,res)=>{
 res.json({status:"UP"});
});

app.post("/",(req,res)=>{
 res.json({
   orderId:"O500",
   status:"PENDING",
   message:"Bundle1 skeleton running"
 });
});

app.listen(5000,()=>{
 console.log("Order service running 5000");
});
```

## services/order-service/Dockerfile
```dockerfile 
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm","run","dev"]
```

## services/docker-compose.yml
```
services:
  postgres:
    image: postgres:16
    container_name: postgres

    environment:
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: apppassword
      POSTGRES_DB: appdb

    ports:
      - "5432:5432"

    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./db-init:/docker-entrypoint-initdb.d
    deploy:
      resources:
        limits:
          cpus: "0.8"
          memory: 2G
      
  order-service:
    build: ./order-service
    container_name: order-service
    env_file: .env
    ports:
      - "5000:5000"
    depends_on:
      - postgres
    deploy:
      resources:
        limits:
          cpus: "0.3"
          memory: 512M

volumes:
  postgres_data:
```

## Continuing Commands:
```bash
## Check node 
node -v
npm -v

## WSL List distributions 
wsl -l -v

## Start distribution "mern_dockr" @ dir "livapp_z0201\z0201\app01\services"
wsl -d mern_dockr

## Check docker 
docker -v
docker compose version

## Run Docker 
dockerd &

## Open another terminal
## cd \z0201\app01\services
cd z0201/app01/services

## Start distribution "mern_dockr" @ dir "livapp_z0201\z0201\app01\services"
wsl -d mern_dockr 
```


## Run dockers
```bash
docker compose up --build -d

## to list running compose projects containers
docker compose ps

## to list all running containers
docker ps -a

## to remove the services
docker compose down

## to remove the services with volume
docker compose down -v

## to check the logs of order service
docker compose logs order-service

## to check the logs of postgres
docker compose logs postgres

## to check dockers stats (capacities)
docker stats

## to check docker compose project stats (capacities)
docker compose stats
```

## Test Order Service:
Using curl
```bash id="16"
curl http://localhost:5000/health

curl -X POST http://localhost:5000/
```

Or

Test in thunder client.

## Test Postgres
```bash
psql --version

psql -h localhost -p 5432 -U appuser -d orderdb

## To connect to another db (psql meta-command)
\c appdb

## To list db (psql meta-command)
\list

##   SQL alternative (regular SQL)
SELECT datname FROM pg_database;

## To list tables
\dt

##   List tables: SQL alternative (regular SQL)
SELECT tablename 
FROM pg_tables
WHERE schemaname='public';

## List tables in all schemas
\dt *.*

##   To quit out of multi page list
  :q

## List schemas
\dn

## List tables in a specific schema (example: orders)
\dt orders.*

## Describe a table
\d customers
#     or
\d+ customers # More about table

## Exit psql
\q
```

### If psql (client/shell/cli) not installed in wsl ubuntu distribution, use below steps:
```bash
sudo apt update

sudo apt install postgresql-client -y

psql --version
## Output
## psql (PostgreSQL) 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)
```

Use: below link to download installer for Windows
```text
Search "psql client installer download" in "Google Search"

https://www.postgresql.org/download/windows/

https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

## Pick -> v16.13 -> Windows x86-64 -> Download -> Run installer

## Pick "Command Line Tools" only.
  [ ] PostgreSQL Server
  [ ] pgAdmin 4
  [ ] Stack Builder
  [x] Command Line Tools

## During installation : Pre Installation Summary
  Installation Directory: C:\Program Files\PostgreSQL\16
  Command Line Tools Installation Directory: C:\Program Files\PostgreSQL\16
  Installation Log: C:\Users\gmahe\AppData\Local\Temp\install-postgresql.log

## Check in cmd prompt
psql --version

Otherwise add "path" into "user env var PATH"
  ## ie "C:\Program Files\PostgreSQL\16\bin"
```

# 2. order-service to work with postgres and to receive order
## orderdb Connect and create Tables:
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

## services/order-service/index.ts
```ts
import express from 'express';
import {Pool} from 'pg';

const db_user = process.env.POSTGRES_USER || "default_user";
const db_pass = process.env.POSTGRES_PASSWORD || "default_password";
const db_host = process.env.POSTGRES_HOST || "default_host";
const db_port = process.env.POSTGRES_PORT || "default_port";
const db_name = process.env.ORDER_DB || "default_db";
const app_port = process.env.ORDER_PORT || "default_order_port";

/*console.log(`
  db_user: ${db_user}
  db_pass: ${db_pass}
  db_host: ${db_host}
  db_port: ${db_port}
  db_name: ${db_name}
  `)*/

const app=express();
app.use(express.json());

const pool=new Pool({
 host:db_host,
 user:db_user,
 password:db_pass,
 database:db_name,
 port: parseInt(db_port)
});

/* Health */
app.get("/health",(req,res)=>{
 res.json({status:"UP"});
});

/* create order */
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

app.listen(app_port, () => {
  console.log(`Server Started at localhost:${app_port}`)
});
```

## Rebuild

```bash
docker compose down

docker compose up --build -d
```

---

## Test

```bash
curl http://localhost:5000/health


curl -X POST http://localhost:5000/ \
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

## Verify Database State
```bash
psql -h localhost -p 5432 -U appuser -d orderdb
```

Order:

```sql
SELECT * FROM orders;
```

Should show:

```text
COMPLETED
```

# 3. order-service -> inventory-service -> payment-service -> shipment-service (synchronous) without gateway
## services/db-init/init.sql
```sql
CREATE DATABASE orderdb;
CREATE DATABASE inventorydb;
CREATE DATABASE paymentdb;
CREATE DATABASE shippingdb;
```

## database setup
Go to wsl ubuntu distribution:

Open a terminal:
```bash
cd livapp_z0201\z0201\app01\services

wsl -l -d 

wsl -d mern_dockr

dockerd &
```

Open another terminal:
```bash
cd livapp_z0201\z0201\app01\services

wsl -l -d 

wsl -d mern_dockr
```

And then:
```bash
docker compose down -v

docker compose up --build -d

psql -h localhost -p 5432 -U appuser -d orderdb

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

\list
\dt
\dn

\d orders
\d order_items


\c inventorydb  # Or \c inv<tab>  it will autofill

CREATE TABLE inventory_stock (
 sku VARCHAR(50) PRIMARY KEY,
 quantity_available INT,
 quantity_reserved INT DEFAULT 0
);

INSERT INTO inventory_stock VALUES ('P1',100,0);
\list
\dt
\dn

\d inventory_stock

select * from inventory_stock;

\c paymentdb

CREATE TABLE payments (
 payment_id VARCHAR(50) PRIMARY KEY,
 order_id VARCHAR(50),
 amount NUMERIC(12,2),
 status VARCHAR(50),
 created_at TIMESTAMP DEFAULT NOW()
);

\list
\dt
\dn

\d payments

\c shippingdb

CREATE TABLE shipments (
 shipment_id VARCHAR(50) PRIMARY KEY,
 order_id VARCHAR(50),
 status VARCHAR(50),
 created_at TIMESTAMP DEFAULT NOW()
);

\list
\dt
\dn

\d shipments

\q

clear
```

| Repeat order-service node project setup to invertory-service, payment-service and shipment-service
## in dir "services/inventory-service"
in terminal: 
* Note: Exit if you are in wsl ubuntu
```bash
cd services/inventory-service
npm init
## follow all default steps for creating init

npm install express pg
npm install -D typescript ts-node
npm install -D @types/express
npm install -D @types/express @types/node
npm install -D @types/pg
```

## services/inventory-service/tsconfig.json
```json
{
 "compilerOptions":{
   "target":"ES2020",
   "module":"commonjs",
   "strict":true
 }
}
```

## services/inventory-service/package.json
```json
{
 ...
 "scripts":{
   ...,
   "dev":"ts-node src/index.ts"
 }
 ...
}
```

## services/inventory-service/index.ts
```typescript
import express from "express";
import {Pool} from "pg";

const db_user = process.env.POSTGRES_USER || "default_user";
const db_pass = process.env.POSTGRES_PASSWORD || "default_password";
const db_host = process.env.POSTGRES_HOST || "default_host";
const db_port = process.env.POSTGRES_PORT || "default_port";
const db_name = process.env.INVENTORY_DB || "default_db";
const app_port = process.env.INVENTORY_PORT || "default_app_port";

const app=express();
app.use(express.json());

const pool=new Pool({
 host:db_host,
 user:db_user,
 password:db_pass,
 database:db_name,
 port: parseInt(db_port)
});

app.get('/inventory/health',(req,res)=>res.json({status:'UP'}));

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

app.listen(app_port, () => {
  console.log(`Server Started at localhost:${app_port}`)
});
```

## services/inventory-service/Dockerfile
```dockerfile 
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5001

CMD ["npm","run","dev"]
```

## in dir "services/payment-service"
```bash
npm init
## follow all default steps for creating init

npm install express pg
npm install -D typescript ts-node
npm install -D @types/express
npm install -D @types/express @types/node
npm install -D @types/pg
```

## services/payment-service/tsconfig.json
```json
{
 "compilerOptions":{
   "target":"ES2020",
   "module":"commonjs",
   "strict":true
 }
}
```

## services/payment-service/package.json
```json
{
 ...
 "scripts":{
   ...,
   "dev":"ts-node src/index.ts"
 }
 ...
}
```

## services/payment-service/index.ts
```typescript
import express from "express";
import {Pool} from "pg";

const db_user = process.env.POSTGRES_USER || "default_user";
const db_pass = process.env.POSTGRES_PASSWORD || "default_password";
const db_host = process.env.POSTGRES_HOST || "default_host";
const db_port = process.env.POSTGRES_PORT || "default_port";
const db_name = process.env.PAYMENT_DB || "default_db";
const app_port = process.env.PAYMENT_PORT || "default_app_port";

const app=express();
app.use(express.json());

const pool=new Pool({
 host:db_host,
 user:db_user,
 password:db_pass,
 database:db_name,
 port: parseInt(db_port)
});

app.get('/payments/health',(req,res)=>res.json({status:'UP'}));
app.post('/payments/authorize', async(req,res)=>{
  const {orderId,amount}=req.body;

  const paymentId='P900';

  await pool.query(
  'INSERT INTO payments(payment_id,order_id,amount,status) VALUES($1,$2,$3,$4)',
  [paymentId,orderId,amount,'AUTHORIZED']
  );

  res.json({paymentId,status:'Authorized'});
});

app.listen(app_port, () => {
  console.log(`Server Started at localhost:${app_port}`)
});
```

## in dir "services/shipment-service"
```bash
npm init
## follow all default steps for creating init

npm install express pg
npm install -D typescript ts-node
npm install -D @types/express
npm install -D @types/express @types/node
npm install -D @types/pg
```
## services/payment-service/Dockerfile
```dockerfile 
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5002

CMD ["npm","run","dev"]
```

## services/shipping-service/tsconfig.json
```json
{
 "compilerOptions":{
   "target":"ES2020",
   "module":"commonjs",
   "strict":true
 }
}
```

## services/shipping-service/package.json
```json
{
 ...
 "scripts":{
   ...,
   "dev":"ts-node src/index.ts"
 }
 ...
}
```

## services/shipping-service/index.ts
```ts
import express from "express";
import {Pool} from "pg";

const db_user = process.env.POSTGRES_USER || "default_user";
const db_pass = process.env.POSTGRES_PASSWORD || "default_password";
const db_host = process.env.POSTGRES_HOST || "default_host";
const db_port = process.env.POSTGRES_PORT || "default_port";
const db_name = process.env.SHIPPING_DB || "default_db";
const app_port = process.env.SHIPPING_PORT || "default_app_port";

const app=express();
app.use(express.json());

const pool=new Pool({
 host:db_host,
 user:db_user,
 password:db_pass,
 database:db_name,
 port: parseInt(db_port)
});

app.get('/shipments/health',(req,res)=>res.json({status:'UP'}));
app.post('/shipments/create', async(req,res)=>{
 const {orderId}=req.body;

 const shipmentId='S333';

 await pool.query(
 'INSERT INTO shipments(shipment_id,order_id,status) VALUES($1,$2,$3)',
 [shipmentId,orderId,'CREATED']
 );

 res.json({shipmentId,status:'Created'});
});

app.listen(app_port, () => {
  console.log(`Server Started at localhost:${app_port}`)
});
```
## services/shipping-service/Dockerfile
```dockerfile 
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5003

CMD ["npm","run","dev"]
```

## services/order-service/index.ts
```ts
import express from "express";
import {Pool} from "pg";

const db_user = process.env.POSTGRES_USER || "default_user";
const db_pass = process.env.POSTGRES_PASSWORD || "default_password";
const db_host = process.env.POSTGRES_HOST || "default_host";
const db_port = process.env.POSTGRES_PORT || "default_port";
const db_name = process.env.ORDER_DB || "default_db";
const app_port = process.env.ORDER_PORT || "default_app_port";

const app=express();
app.use(express.json());

const pool=new Pool({
 host:db_host,
 user:db_user,
 password:db_pass,
 database:db_name,
 port: parseInt(db_port)
});

app.get('/orders/health',(req,res)=>res.json({status:'UP'}));

async function postJson(url:string,payload:any){
 const r=await fetch(url,{
   method:'POST',
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify(payload)
 });
 if(!r.ok) throw new Error(await r.text());
 return r.json();
}

app.post('/orders/create', async(req,res)=>{
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

app.listen(app_port, () => {
  console.log(`Server Started at localhost:${app_port}`)
});
```

## services/.env
```dotenv 
POSTGRES_USER=appuser
POSTGRES_PASSWORD=apppassword
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

POSTGRES_DB=appdb
ORDER_DB=orderdb
INVENTORY_DB=inventorydb
PAYMENT_DB=paymentdb
SHIPPING_DB=shippingdb

ORDER_PORT=5000
INVENTORY_PORT=5001
PAYMENT_PORT=5002
SHIPPING_PORT=5003
```

## services/docker-compose.yml
```yml
services:
  order-service:
    build: ./order-service
    container_name: order-service
    env_file: .env

    ports:
      - "5000:5000"

    depends_on:
      - postgres

    deploy:
      resources:
        limits:
          cpus: "0.3"
          memory: 512M

  inventory-service:
    build: ./inventory-service
    container_name: inventory-service
    env_file: .env

    ports:
      - "5001:5001"

    depends_on:
      - postgres

    deploy:
      resources:
        limits:
          cpus: "0.3"
          memory: 512M

  payment-service:
    build: ./payment-service
    container_name: payment-service
    env_file: .env
    ports:
      - "5002:5002"

    depends_on:
      - postgres

    deploy:
      resources:
        limits:
          cpus: "0.3"
          memory: 512M

  shipping-service:
    build: ./shipping-service
    container_name: shipping-service
    env_file: .env

    ports:
      - "5003:5003"

    depends_on:
      - postgres

    deploy:
      resources:
        limits:
          cpus: "0.3"
          memory: 512M

  postgres:
    image: postgres:16
    container_name: postgres

    environment:
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: apppassword
      POSTGRES_DB: appdb

    ports:
      - "5432:5432"

    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./db-init:/docker-entrypoint-initdb.d

    deploy:
      resources:
        limits:
          cpus: "0.8"
          memory: 2G


volumes:
  postgres_data:
```

## Rebuild

```bash
docker compose down

docker compose up --build -d

# check capacity usage / limits
docker compose stats
```

## Test

```bash
curl http://localhost:5000/orders/health

curl http://localhost:5001/inventory/health

curl http://localhost:5002/payments/health

curl http://localhost:5003/shipments/health

curl -X POST http://localhost:5000/orders/create \
-H "Content-Type: application/json" \
-d '{
"customerId":"C101",
"items":[{"sku":"P1","qty":2}],
"amount":2500
}'
```

## Check in DB
```bash
psql -h localhost -p 5432 -U appuser -d orderdb

SELECT * FROM orders;

SELECT * FROM order_items;

\c inventorydb  # Or \c inv<tab>  it will autofill

SELECT * FROM inventory_stock;

\c paymentdb

SELECT * FROM payments;

\c shippingdb

SELECT * FROM shipments;

\q

clear
```

# 4. order-service -> inventory-service -> payment-service -> shipment-service (synchronous) with gateway
## in dir "services/gateway"
```bash
npm init
## follow all default steps for creating init

npm install express http-proxy-middleware
npm install -D typescript ts-node
npm install -D @types/express @types/node

```

## services/gateway/tsconfig.json
```json
{
 "compilerOptions":{
   "target":"ES2020",
   "module":"commonjs",
   "strict":true
 }
}
```

## services/gateway/package.json
```json
{
 ...
 "scripts":{
   ...,
   "dev":"ts-node src/index.ts"
 }
 ...
}
```

## services/gateway/index.ts
```typescript
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app_port = process.env.GATEWAY_PORT || "default_app_port";
const order_port = process.env.ORDER_PORT || "default_order_port";

const app = express();


/*
app.use(
 "/api/orders",
 createProxyMiddleware({
   target:`http://order-service:${order_port}`,
   changeOrigin:true
 })
);*/

app.use(
  "/api/orders",
  createProxyMiddleware({
    target: `http://order-service:${order_port}`, // use localhost if not in Docker
    changeOrigin: true,
    pathRewrite: {
      "^/api/orders": ""
    }
  })
);

app.get("/health",(req,res)=>{
 res.json({status:"UP"});
});

app.listen(app_port,()=>{
 console.log(`Gateway Started at localhost:${app_port}`);
});
```

## services/gateway/Dockerfile
```dockerfile 
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm","run","dev"]
```

## services/.env
```dotenv 
POSTGRES_USER=appuser
POSTGRES_PASSWORD=apppassword
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

POSTGRES_DB=appdb
ORDER_DB=orderdb
INVENTORY_DB=inventorydb
PAYMENT_DB=paymentdb
SHIPPING_DB=shippingdb

ORDER_PORT=5000
INVENTORY_PORT=5001
PAYMENT_PORT=5002
SHIPPING_PORT=5003

GATEWAY_PORT=8080
```

## services/docker-compose.yml
```yml
services:
  gateway:
    build: ./gateway
    container_name: gateway
    env_file: .env

    ports:
      - "8080:8080"

    depends_on:
      - order-service

    deploy:
      resources:
        limits:
          cpus: "0.3"
          memory: 512M

  order-service:
    build: ./order-service
    container_name: order-service
    env_file: .env

    ports:
      - "5000:5000"

    depends_on:
      - postgres

    deploy:
      resources:
        limits:
          cpus: "0.3"
          memory: 512M

  inventory-service:
    build: ./inventory-service
    container_name: inventory-service
    env_file: .env

    ports:
      - "5001:5001"

    depends_on:
      - postgres

    deploy:
      resources:
        limits:
          cpus: "0.3"
          memory: 512M

  payment-service:
    build: ./payment-service
    container_name: payment-service
    env_file: .env
    ports:
      - "5002:5002"

    depends_on:
      - postgres

    deploy:
      resources:
        limits:
          cpus: "0.3"
          memory: 512M

  shipping-service:
    build: ./shipping-service
    container_name: shipping-service
    env_file: .env

    ports:
      - "5003:5003"

    depends_on:
      - postgres

    deploy:
      resources:
        limits:
          cpus: "0.3"
          memory: 512M

  postgres:
    image: postgres:16
    container_name: postgres

    environment:
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: apppassword
      POSTGRES_DB: appdb

    ports:
      - "5432:5432"

    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./db-init:/docker-entrypoint-initdb.d

    deploy:
      resources:
        limits:
          cpus: "0.8"
          memory: 2G


volumes:
  postgres_data:
```

Capacity Calc:
```
CPU   RAM   Service
0.3   0.5g  gateway
0.3   0.5g  order-service
0.3   0.5g  inventory-service
0.3   0.5g  payment-service
0.3   0.5g  shipping-service
0.8   2.0g  postgres
----------------------------
2.3   4.5g  total
----------------------------
```

## Rebuild

```bash
docker compose down

docker compose up --build -d

# check capacity usage / limits
docker compose stats

# build only specified service
docker compose up -d --build gateway
```

## Test

```bash
curl http://localhost:5000/orders/health

curl http://localhost:5001/inventory/health

curl http://localhost:5002/payments/health

curl http://localhost:5003/shipments/health

curl http://localhost:8080/health

curl http://localhost:8080/api/orders/orders/health

curl -X POST http://localhost:8080/api/orders/orders/create \
-H "Content-Type: application/json" \
-d '{
"customerId":"C101",
"items":[{"sku":"P1","qty":2}],
"amount":2500
}'
```

## Check in DB
```bash
psql -h localhost -p 5432 -U appuser -d orderdb

SELECT * FROM orders;

SELECT * FROM order_items;

\c inventorydb  # Or \c inv<tab>  it will autofill

SELECT * FROM inventory_stock;

\c paymentdb

SELECT * FROM payments;

\c shippingdb

SELECT * FROM shipments;

\q

clear
```