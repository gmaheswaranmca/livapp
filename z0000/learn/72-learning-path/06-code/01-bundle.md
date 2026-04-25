# Bundle 1 — Monorepo + Local Dev Foundation (Runnable Local Platform)

We’ll build a local development platform first using:

* Node.js + TypeScript (services)
* Apache Kafka (single-node dev mode via KRaft)
* Redis
* PostgreSQL (one DB per service, separate containers)
* Docker Compose

Goal:

```bash id="1"
docker compose up --build
```

brings up the platform.

---

# 1. Prerequisites

Install:

* Docker Desktop (or Docker Engine + Compose)
* Node 20+
* Git

Verify:

```bash id="2"
docker --version
docker compose version
node -v
```

---

# 2. Repository Structure

```text id="3"
commerce-platform/
├── .env
├── docker-compose.yml
├── shared-lib/
│   ├── package.json
│   └── src/
│       └── correlation.ts
├── gateway/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       └── index.ts
├── order-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── src/index.ts
├── inventory-service/
├── payment-service/
└── shipping-service/
```

For Bundle 1, inventory/payment/shipping can mirror order-service skeleton.

---

# 3. Root .env

Create:

```dotenv id="4"
POSTGRES_USER=appuser
POSTGRES_PASSWORD=apppassword

ORDER_DB=orderdb
INVENTORY_DB=inventorydb
PAYMENT_DB=paymentdb
SHIPPING_DB=shippingdb

REDIS_HOST=redis
REDIS_PORT=6379

KAFKA_BROKER=kafka:9092

GATEWAY_PORT=8080

ORDER_PORT=5000
INVENTORY_PORT=5001
PAYMENT_PORT=5002
SHIPPING_PORT=5003
```

---

# 4. Root docker-compose.yml

Create:

```yaml id="5"
services:

  gateway:
    build: ./gateway
    container_name: gateway
    env_file: .env
    ports:
      - "8080:8080"
    depends_on:
      - order-service

  order-service:
    build: ./order-service
    container_name: order-service
    env_file: .env
    ports:
      - "5000:5000"
    depends_on:
      - order-db
      - redis
      - kafka

  inventory-service:
    build: ./inventory-service
    container_name: inventory-service
    env_file: .env
    ports:
      - "5001:5001"

  payment-service:
    build: ./payment-service
    container_name: payment-service
    env_file: .env
    ports:
      - "5002:5002"

  shipping-service:
    build: ./shipping-service
    container_name: shipping-service
    env_file: .env
    ports:
      - "5003:5003"

  redis:
    image: redis:7
    container_name: redis
    ports:
      - "6379:6379"

  order-db:
    image: postgres:16
    container_name: order-db
    environment:
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: apppassword
      POSTGRES_DB: orderdb
    ports:
      - "5432:5432"

  inventory-db:
    image: postgres:16
    container_name: inventory-db
    environment:
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: apppassword
      POSTGRES_DB: inventorydb
    ports:
      - "5433:5432"

  payment-db:
    image: postgres:16
    container_name: payment-db
    environment:
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: apppassword
      POSTGRES_DB: paymentdb
    ports:
      - "5434:5432"

  shipping-db:
    image: postgres:16
    container_name: shipping-db
    environment:
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: apppassword
      POSTGRES_DB: shippingdb
    ports:
      - "5435:5432"

  kafka:
    image: bitnami/kafka:latest
    container_name: kafka
    ports:
      - "9092:9092"
    environment:
      KAFKA_CFG_NODE_ID: 1
      KAFKA_CFG_PROCESS_ROLES: controller,broker
      KAFKA_CFG_CONTROLLER_LISTENER_NAMES: CONTROLLER
      KAFKA_CFG_LISTENERS: PLAINTEXT://:9092,CONTROLLER://:9093
      KAFKA_CFG_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092
      KAFKA_CFG_CONTROLLER_QUORUM_VOTERS: 1@kafka:9093
      KAFKA_CFG_AUTO_CREATE_TOPICS_ENABLE: "true"
      ALLOW_PLAINTEXT_LISTENER: "yes"
```

---

# 5. Gateway package.json

Create:

```json id="6"
{
 "name":"gateway",
 "version":"1.0.0",
 "scripts":{
   "dev":"ts-node src/index.ts"
 },
 "dependencies":{
   "express":"^4.19.2",
   "http-proxy-middleware":"^3.0.0"
 },
 "devDependencies":{
   "typescript":"^5.6.3",
   "ts-node":"^10.9.2"
 }
}
```

---

# 6. Gateway tsconfig.json

```json id="7"
{
 "compilerOptions":{
   "target":"ES2020",
   "module":"commonjs",
   "strict":true
 }
}
```

---

# 7. Gateway src/index.ts

```typescript id="8"
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(
 "/api/orders",
 createProxyMiddleware({
   target:"http://order-service:5000",
   changeOrigin:true
 })
);

app.get("/health",(req,res)=>{
 res.json({status:"UP"});
});

app.listen(8080,()=>{
 console.log("Gateway running on 8080");
});
```

---

# 8. Gateway Dockerfile

```dockerfile id="9"
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm","run","dev"]
```

---

# 9. order-service package.json

```json id="10"
{
 "name":"order-service",
 "version":"1.0.0",
 "scripts":{
   "dev":"ts-node src/index.ts"
 },
 "dependencies":{
   "express":"^4.19.2",
   "pg":"^8.12.0",
   "ioredis":"^5.4.1"
 },
 "devDependencies":{
   "typescript":"^5.6.3",
   "ts-node":"^10.9.2"
 }
}
```

---

# 10. order-service src/index.ts

```typescript id="11"
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

---

# 11. order-service Dockerfile

```dockerfile id="12"
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm","run","dev"]
```

---

# 12. Clone order-service Skeleton for Others

Copy same skeleton for:

```text id="13"
inventory-service
payment-service
shipping-service
```

Change:

* service name
* port
* Docker EXPOSE

Use:

5001, 5002, 5003

---

# 13. Shared Correlation Middleware (Optional now, used later)

shared-lib/src/correlation.ts

```typescript id="14"
export function correlationId(){
 return "REQ-" + Date.now();
}
```

We expand later.

---

# 14. Bring It Up

From root:

```bash id="15"
docker compose up --build
```

---

# 15. Test Health

Gateway:

```bash id="16"
curl http://localhost:8080/health
```

Expected:

```json id="17"
{"status":"UP"}
```

---

Order via gateway:

```bash id="18"
curl -X POST http://localhost:8080/api/orders
```

Expected:

```json id="19"
{
 "orderId":"O500",
 "status":"PENDING"
}
```

---

# 16. Verify Infra Containers

Check:

```bash id="20"
docker ps
```

Should show:

* gateway
* order-service
* inventory-service
* payment-service
* shipping-service
* redis
* kafka
* 4 postgres containers

---

# 17. What Bundle 1 Gives You

Working local platform:

✔ Monorepo

✔ Dockerized services

✔ Gateway

✔ 4 service skeletons

✔ Redis running

✔ Kafka running

✔ 4 databases running

✔ Local compose environment

Foundation complete.

---

# 18. Not Implemented Yet (By Design)

Still intentionally missing:

❌ real DB persistence
❌ actual order tables
❌ service-to-service logic
❌ Kafka producers/consumers
❌ saga
❌ Redis idempotency

Those come next.

---

## Next = Bundle 2

Next I can give:

* full service code
* PostgreSQL schema creation
* order create logic
* inventory reserve API
* payment authorize API
* shipping create API
* synchronous end-to-end flow

Say:

**Bundle 2**
