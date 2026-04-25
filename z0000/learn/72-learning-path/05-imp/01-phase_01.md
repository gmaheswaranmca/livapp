# Response 2 — Phase 1 (Basic Microservices Skeleton — Synchronous First)

Now we move from domain model → executable services.

**Goal of Phase 1**

Build the simplest working system first.

No:

* Saga yet
* Event broker yet
* Redis yet
* Circuit breakers yet
* Kubernetes yet

Only:

* 4 services
* Gateway
* Synchronous calls
* Happy path works

This is your baseline.

---

# Step 1 — Services to Build

We create four independent services.

```text
order-service
inventory-service
payment-service
shipping-service
```

And one entry point:

```text
api-gateway
```

---

# Step 2 — Initial Architecture

```text
Client
   |
API Gateway
   |
Order Service
   |
   +---- Inventory Service
   |
   +---- Payment Service
   |
   +---- Shipping Service
```

Order coordinates for now.

Later Saga replaces this.

---

# Step 3 — Responsibilities

## Order Service

Owns:

* Create order
* Validate request
* Call inventory
* Call payment
* Call shipping
* Mark order completed

Temporary orchestration here.

---

## Inventory Service

Exposes:

Reserve stock

Example endpoint:

```http
POST /inventory/reserve
```

---

## Payment Service

```http
POST /payments/authorize
```

---

## Shipping Service

```http
POST /shipments/create
```

---

# Step 4 — Gateway Routes

API Gateway routes requests.

Example:

| Client Route   | Target Service    |
| -------------- | ----------------- |
| /api/orders    | Order Service     |
| /api/inventory | Inventory Service |
| /api/payments  | Payment Service   |
| /api/shipping  | Shipping Service  |

Gateway concerns later:

* Auth
* Rate limiting
* Routing
* Request tracing

For now only routing.

---

# Step 5 — External API Contract

Client places order:

```http
POST /api/orders
```

Request:

```json
{
 "customerId":"C101",
 "items":[
   {
     "sku":"P1",
     "qty":2
   }
 ],
 "amount":2500
}
```

Response:

```json
{
 "orderId":"O500",
 "status":"Completed"
}
```

---

# Step 6 — Internal Service Contracts

## Inventory API

Request

```json
{
 "orderId":"O500",
 "items":[
   {
      "sku":"P1",
      "qty":2
   }
 ]
}
```

Response

```json
{
 "reservationId":"R100",
 "status":"Reserved"
}
```

---

## Payment API

```json
{
 "orderId":"O500",
 "amount":2500
}
```

Response

```json
{
 "paymentId":"P900",
 "status":"Authorized"
}
```

---

## Shipping API

```json
{
 "orderId":"O500"
}
```

Response

```json
{
 "shipmentId":"S333",
 "status":"Created"
}
```

---

# Step 7 — Synchronous Happy Path Flow

Sequence:

```text
Client submits order
   ↓

Gateway forwards request
   ↓

Order Service

Create order(status=PENDING)

Call Inventory Reserve

if success
   call Payment

if success
   call Shipping

if success
   mark order COMPLETED
```

---

## Sequence Diagram

```text
Client
 |
Gateway
 |
Order Service
 |------reserve-----> Inventory
 |<-----success------|
 |
 |----authorize-----> Payment
 |<-----success------|
 |
 |----create--------> Shipping
 |<-----success------|
 |
complete order
```

---

# Step 8 — Pseudo Orchestration Logic

```pseudo
CreateOrder()

save order PENDING

reserve inventory()

if fail:
  cancel order
  return

authorize payment()

if fail:
   release inventory
   cancel order
   return

create shipment()

if fail:
   refund payment
   release inventory
   cancel order
   return

mark completed
```

Notice:

Compensation appears already.

Manual for now.

Formal Saga later.

---

# Step 9 — Initial Tables

## order_db

```text
orders
order_items
```

Fields conceptually:

```text
orders
order_id
customer_id
amount
status
created_at
```

---

## inventory_db

```text
inventory_stock
inventory_reservations
```

---

## payment_db

```text
payments
```

---

## shipping_db

```text
shipments
```

---

# Step 10 — Service-to-Service Communication

Initially simple REST.

Example:

Order service calls:

* inventory-service:5001

* payment-service:5002

* shipping-service:5003

Later replaced by:

* Service discovery

Later after that:

* Event messaging

Do not overengineer early.

---

# Step 11 — Failure Handling (Minimal)

Handle only immediate failures.

Example:

Inventory says no stock:

```json
{
 "error":"OUT_OF_STOCK"
}
```

Order becomes:

```text
Cancelled
```

---

Payment timeout:

```text
rollback inventory
cancel order
```

---

Shipping failure:

```text
refund payment
release stock
cancel order
```

Still synchronous rollback.

---

# Step 12 — Correlation ID (Add Now)

Even before events.

Generate:

```text
X-Correlation-ID
```

Example:

```text
REQ-2026-0001
```

Pass it through:

Gateway
→ Order
→ Inventory
→ Payment
→ Shipping

This becomes distributed tracing later.

Very important.

---

# Step 13 — Tech Stack Example

Possible stack:

Gateway:

* NGINX
* Kong

Services:

* Node/Express
* Flask
* Spring Boot
  (any)

Databases:

* PostgreSQL

---

# Step 14 — What NOT To Add Yet

Do not add:

❌ Kafka
❌ Redis
❌ Circuit breaker
❌ Retry engine
❌ Kubernetes

Because:

If happy path doesn't work, resilience layers only hide bad design.

---

# Resulting Phase 1 Architecture

```text
                +----------------+
Client -------->| API Gateway     |
                +----------------+
                        |
                +----------------+
                | Order Service   |
                +----------------+
                  |      |      |
                  |      |      |
                  v      v      v

             Inventory Payment Shipping
```

Simple but working.

---

# Deliverables of Phase 1

You now have:

✔ Gateway

✔ 4 services

✔ APIs

✔ Request contracts

✔ Synchronous orchestration

✔ Manual rollback logic

✔ Correlation IDs

✔ Independent databases

This is your “Monolith decomposed into services” stage.

---

# Why We Do This Before Events

Because first we validate:

* Business flow works
* Boundaries are correct
* APIs are correct
* Data ownership is correct

Only then replace synchronous coupling with events.

---

## Next (Response 3 — Phase 2)

Next we replace REST chaining with:

* Event-driven architecture
* Apache Kafka topics (or RabbitMQ queues)
* publishers / consumers
* event contracts
* asynchronous order processing flow
* choreography foundation for Saga

That is where microservices become real distributed systems.
