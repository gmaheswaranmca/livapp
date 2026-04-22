# 1. Bounded Contexts (DDD)

**From:** Domain-Driven Design
A **Bounded Context** defines a clear boundary where a particular domain model applies.

### Problem it solves

Without boundaries:

* Same “Customer” means different things in different departments.

Example:

| Department | Meaning of Customer |
| ---------- | ------------------- |
| Sales      | Prospect/Lead       |
| Billing    | Paying customer     |
| Support    | Ticket owner        |

If one shared model is used → confusion.

---

## Solution

Split into contexts.

Example E-commerce:

```text
Order Service
- Order
- OrderItem
- ShipmentStatus

Inventory Service
- Product
- Stock
- Warehouse

Billing Service
- Invoice
- Payment
```

Each owns its data and rules.

---

## Characteristics

* Own database
* Own business logic
* Own terminology
* Loose coupling

---

## Example

Instead of:

```text
Monolith:
Customer Table used by everything
```

Use:

```text
Customer Context
Order Context
Payment Context
Support Context
```

---

## Benefit

* Better autonomy
* Easier scaling
* Reduced coupling
* Natural microservice boundaries

---

# 2. API Gateway

An **API Gateway** is the single entry point for clients.

Common technologies:

* Kong
* NGINX
* Spring Cloud Gateway
* Amazon API Gateway

---

## Without Gateway

```text
Frontend calls:
Auth Service
Order Service
Trainer Service
Payment Service
```

Messy.

---

## With Gateway

```text
Client
   |
API Gateway
 |   |   |
Auth Orders Payments
```

---

## Responsibilities

### Routing

```http
/api/auth/*  -> auth-service
/api/order/* -> order-service
```

---

### Authentication

Validate:

* JWT
* OAuth
* Tokens

---

### Rate Limiting

```text
100 requests per minute
```

---

### Load Balancing

Distribute traffic.

---

### Response Aggregation

Gateway combines:

```text
User profile + orders + payments
```

into one response.

---

## Benefit

* Centralized security
* Single endpoint
* Easier client integration

---

# 3. Service Discovery

In microservices, instances change constantly.

```text
auth-service:
10.2.3.4 today
10.2.9.7 tomorrow
```

Hardcoding breaks.

---

## Solution

Use a registry.

Services register themselves.

```text
Auth Service → Registry
Order Service → Registry
```

Clients ask:

```text
Where is auth-service?
```

Registry answers.

---

## Tools

* Consul
* Eureka
* Kubernetes (built-in discovery via DNS)

---

## Example in Kubernetes

```text
auth-service.default.svc.cluster.local
```

Stable name.

Pods can change.

---

## Benefit

* Dynamic location
* Auto-scaling support
* No hardcoded endpoints

---

# 4. Circuit Breaker

Inspired by electrical breakers.

Stops repeated failures.

---

## Problem

Order service calls Payment.

Payment is down.

Without breaker:

```text
retry retry retry retry...
system collapse
```

Cascade failure.

---

## Circuit Breaker States

### Closed

Normal traffic.

```text
Requests allowed
```

---

### Open

Failures exceed threshold.

```text
Stop calling dependency
Return fallback
```

---

### Half-Open

Try small test traffic.

If healthy → close again.

---

## Example

```text
Payment unavailable
Return:
"Payment processing delayed"
```

instead of crashing.

---

## Tools

* Resilience4j
* Hystrix (legacy)

---

## Benefit

* Prevents cascading failure
* Improves resilience

---

# 5. Retry Patterns

Temporary failures often recover.

Retry instead of fail immediately.

---

## Examples

* Network glitch
* Timeout
* Temporary lock

---

## Simple Retry

```text
Attempt 1
Attempt 2
Attempt 3
Fail
```

---

## Exponential Backoff

Better:

```text
Wait 1 sec
Wait 2 sec
Wait 4 sec
```

---

## With Jitter

Add randomness:

```text
4 sec ± random
```

Avoids retry storms.

---

## Example

```text
Payment API timeout
Retry 3 times
Then fail
```

---

## Rule

Retry only for:

✅ transient errors

Not for:

❌ invalid data
❌ authentication errors

---

## Benefit

Handles temporary failures.

---

# 6. Saga Pattern

Hardest but critical.

Used for distributed transactions.

---

## Problem

Classic database transaction:

```sql
BEGIN
Update Order
Update Payment
Update Inventory
COMMIT
```

Works in one DB.

Not across multiple services.

---

## Saga solution

Sequence of local transactions.

Each step has compensation if failure occurs.

---

## Example

Order Placement

```text
1 Create Order
2 Reserve Inventory
3 Charge Payment
4 Arrange Shipping
```

---

If step 3 fails:

```text
Compensate:
Undo inventory reservation
Cancel order
```

---

## Two Styles

### Choreography

Services emit events.

```text
OrderCreated
InventoryReserved
PaymentProcessed
```

No central coordinator.

---

### Orchestration

Central saga coordinator controls flow.

```text
Do step1
Do step2
Compensate if failure
```

---

## Benefit

Distributed consistency.

---

# 7. Event-Driven Architecture (EDA)

Services communicate through events.

---

## Instead of direct calls

Bad:

```text
Order calls Inventory
Order calls Billing
Order calls Shipping
```

Tight coupling.

---

## Use events

```text
Order publishes:

OrderCreated
```

Others react:

```text
Inventory reserves stock
Billing charges
Shipping prepares delivery
```

---

## Event Broker

Use:

* Apache Kafka
* RabbitMQ
* Amazon SNS
* Amazon SQS

---

## Flow

```text
Producer -> Broker -> Consumers
```

---

## Benefits

* Loose coupling
* Async processing
* Scalability
* Real-time systems

---

# How They Fit Together

```text
Bounded Contexts
   ↓
Microservices boundaries

API Gateway
   ↓
Entry point

Service Discovery
   ↓
Find services

Retry + Circuit Breaker
   ↓
Handle failures

Saga
   ↓
Cross-service consistency

Event-driven Architecture
   ↓
Async communication
```

---

# Real Enterprise Example (Amazon-like Checkout)

```text
API Gateway receives checkout request

Order Service (Bounded Context)
   |
Saga starts

Publishes OrderCreated event

Inventory Service reserves stock
Payment Service charges card
Shipping Service prepares shipment

If payment fails:
Compensation runs

Retries for temporary errors

Circuit breaker protects failing payment provider

Service discovery locates instances
```

Everything works together.

---

## Typical Learning Order

Learn in this order:

1. Bounded Contexts
2. API Gateway
3. Service Discovery
4. Retry Patterns
5. Circuit Breaker
6. Event-driven Architecture
7. Saga Pattern

This is how many teams introduce them.
