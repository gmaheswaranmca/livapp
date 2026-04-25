# Response 3 — Phase 2 (Introduce Event-Driven Architecture)

Now we remove direct chaining:

Old:

```text id="0d6h1a"
Order -> Inventory -> Payment -> Shipping
```

Problem:

* Tight coupling
* One slow service delays all
* Cascading failures possible
* Harder to scale independently

We move to **events**.

---

# Goal of Phase 2

Replace synchronous orchestration with asynchronous messaging.

Instead of:

"Call the next service"

Use:

"Publish an event"

Big mental shift.

---

# Step 1 — Introduce a Message Broker

Use one event backbone.

Examples:

* Apache Kafka
* RabbitMQ

For event-driven domain workflows, many choose Kafka.

For now assume Kafka.

---

# Step 2 — New Architecture

Before:

```text id="1nn5i2"
Order --> Inventory --> Payment --> Shipping
```

After:

```text id="q4gmec"
Order Service
   publishes OrderCreated
          |
        Broker
          |
Inventory consumes
publishes InventoryReserved
          |
        Broker
          |
Payment consumes
publishes PaymentAuthorized
          |
        Broker
          |
Shipping consumes
publishes ShipmentCreated
```

Everything flows through broker.

---

# Step 3 — Define Topics

Start simple.

```text id="b40icp"
order-events
inventory-events
payment-events
shipping-events
```

Possible alternative:

Single domain-events topic.

But start separated.

---

# Step 4 — Producers and Consumers

## Order Service

Produces:

```text id="bmv9rz"
OrderCreated
OrderCancelled
OrderCompleted
```

Consumes:

```text id="hwt4e8"
ShipmentCreated
PaymentFailed
InventoryReservationFailed
```

---

## Inventory Service

Consumes:

```text id="td4o2m"
OrderCreated
```

Produces:

```text id="6qkzrm"
InventoryReserved
InventoryReservationFailed
InventoryReleased
```

---

## Payment Service

Consumes:

```text id="j26x9w"
InventoryReserved
```

Produces:

```text id="1qlvnl"
PaymentAuthorized
PaymentFailed
```

---

## Shipping Service

Consumes:

```text id="j3n0gw"
PaymentAuthorized
```

Produces:

```text id="8y3h3n"
ShipmentCreated
ShipmentFailed
```

---

# Step 5 — New Order Flow

Customer still calls:

```http id="vrr8jk"
POST /api/orders
```

But Order service now:

* stores order PENDING
* publishes event
* returns immediately

Response may become:

```json id="c17jya"
{
 "orderId":"O500",
 "status":"Pending"
}
```

Later order reaches Completed asynchronously.

This is important.

---

# Step 6 — Event Sequence

```text id="g6stgb"
Customer places order
   ↓

OrderCreated
   ↓

Inventory reserves stock

InventoryReserved
   ↓

Payment authorizes

PaymentAuthorized
   ↓

Shipping creates shipment

ShipmentCreated
   ↓

OrderCompleted
```

---

# Step 7 — Event Envelope Standard

Very important.

Use consistent event shape.

```json id="ihmhv5"
{
 "eventId":"E1001",
 "eventType":"InventoryReserved",
 "version":1,
 "timestamp":"2026-04-25T10:00:00Z",
 "correlationId":"REQ-2026-0001",
 "payload":{
   "orderId":"O500",
   "reservationId":"R100"
 }
}
```

Always include:

* eventId
* eventType
* version
* correlationId
* payload

Mandatory.

---

# Step 8 — Consumer Logic Example

Inventory consumer:

```pseudo id="a8mfvc"
On OrderCreated:

check stock

if enough:
   reserve
   publish InventoryReserved

else:
   publish InventoryReservationFailed
```

No direct API call to payment.

Inventory only emits event.

---

Payment:

```pseudo id="5kr9jg"
On InventoryReserved:

authorize payment

if success
 publish PaymentAuthorized

if fail
 publish PaymentFailed
```

---

# Step 9 — Event Choreography

This is choreography style.

No central conductor yet.

Each service reacts.

Like dominoes.

```text id="yk7cxa"
OrderCreated
 triggers Inventory

InventoryReserved
 triggers Payment

PaymentAuthorized
 triggers Shipping
```

This prepares Saga.

---

# Step 10 — Failure Events

Failure is also event-driven.

Example:

Out of stock.

```text id="l2v7hm"
OrderCreated
  ↓

InventoryReservationFailed
  ↓

OrderCancelled
```

---

Payment failure:

```text id="4jz6od"
InventoryReserved
   ↓

PaymentFailed
   ↓

InventoryReleased
   ↓

OrderCancelled
```

Notice compensation begins via events.

---

# Step 11 — Delivery Semantics (Very Important)

Assume:

At-least-once delivery.

Meaning:

Message may be delivered twice.

Possible:

```text id="qfq6h3"
PaymentAuthorized arrives twice
```

Danger:

Double charge.

This is why Redis idempotency comes later.

For now, note the risk.

---

# Step 12 — Add Consumer Groups

In Kafka:

Payment instances:

```text id="fr3ij4"
payment-service
payment-service
payment-service
```

Same consumer group:

Only one handles a message.

This enables scale.

---

# Step 13 — Partition Key Strategy

Very important.

Use:

```text id="8yz1of"
partition key = orderId
```

Why?

All events for one order stay ordered.

Example:

```text id="9nsd6w"
O500 events
always in sequence
```

Critical for distributed workflows.

---

# Step 14 — Order State Updates

Order service consumes events to update status.

On:

InventoryReserved

set:

```text id="k8j1xg"
status=InventoryReserved
```

On PaymentAuthorized:

```text id="6w0eg8"
status=PaymentAuthorized
```

On ShipmentCreated:

```text id="8zrq3c"
status=Completed
```

Order remains system-of-record.

---

# Step 15 — New Architecture Picture

```text id="jlwm4t"
                +------------+
Client -------->| Gateway     |
                +------------+
                      |
                +------------+
                | Order      |
                +------------+
                      |
                publishes
                 OrderCreated
                      |
               +-------------+
               |   Kafka     |
               +-------------+
                  |    |   |
                  v    v   v

             Inventory
                |
         InventoryReserved
                |
             Payment
                |
         PaymentAuthorized
                |
             Shipping
                |
         ShipmentCreated
                |
             Order
```

---

# Step 16 — What NOT To Solve Yet

Still do NOT solve:

❌ duplicate messages
❌ retries
❌ poison messages
❌ circuit breaking
❌ service discovery

Those are next phases.

Do not pile everything in Phase 2.

---

# Deliverables of Phase 2

Now you have:

✔ Broker introduced

✔ Topics

✔ Producers

✔ Consumers

✔ Event contracts

✔ Async order flow

✔ Choreography model

✔ Partition strategy

✔ Correlation IDs flowing

This is now an event-driven system.

---

# Difference from Phase 1

Phase 1:

Request-response chain

```text id="rj1qyj"
Order calls Inventory
```

Phase 2:

Event chain

```text id="u7f1sn"
Order emits event
Inventory reacts
```

Huge architectural shift.
