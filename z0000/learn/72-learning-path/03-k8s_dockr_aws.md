# **Kubernetes + Docker + AWS enterprise architecture**.

# Enterprise Architecture Mapping

```text id="cnocj7"
Internet
   |
Route53 (DNS)
   |
CloudFront (CDN)
   |
API Gateway / Ingress
   |
Kubernetes Cluster (EKS)
   |
------------------------------------------------
| auth-service      order-service              |
| inventory-service payment-service            |
| notification-service                         |
------------------------------------------------
   |
Databases / Redis / Kafka
```

---

# 1. Bounded Contexts → Separate Microservices

Each domain becomes its own service.

| Bounded Context | Microservice      | Database    |
| --------------- | ----------------- | ----------- |
| Identity        | Auth Service      | Users DB    |
| Ordering        | Order Service     | Orders DB   |
| Inventory       | Inventory Service | Stock DB    |
| Billing         | Payment Service   | Payments DB |

Example:

```text id="vvlt0h"
auth-service
order-service
payment-service
inventory-service
```

Containerized using:

* Docker

Deployed in:

* Kubernetes
* Managed in AWS by Amazon Elastic Kubernetes Service

---

# 2. API Gateway → Ingress Layer

User requests enter through gateway.

## AWS Options

* Amazon API Gateway
* NGINX Ingress
* Kong

Flow:

```text id="ntywlm"
Browser
→ CloudFront
→ API Gateway
→ Kubernetes Ingress
→ Services
```

Responsibilities:

* JWT auth
* SSL termination
* Rate limits
* Routing

Example:

```http id="m6aqgf"
/api/auth → auth-service
/api/orders → order-service
```

---

# 3. Service Discovery → Kubernetes Built-In

You usually don’t run separate discovery in modern Kubernetes.

Kubernetes does it.

```text id="2njs4l"
auth-service.default.svc.cluster.local
```

Services find each other by DNS.

Order service can call:

```text id="6xd7hl"
http://payment-service
```

without knowing pod IPs.

---

## Kubernetes handles:

* Service registration
* Discovery
* Internal load balancing

---

# 4. Retry Patterns → Inside Services

Example:

Order service calls payment provider.

Use:

* Retry 3 times
* Exponential backoff

```text id="5kwjlwm"
1 sec
2 sec
4 sec
```

Often implemented in:

* Resilience4j
* Service mesh like Istio

---

# 5. Circuit Breaker → Service Resilience

Suppose payment provider is down.

Without breaker:

```text id="qh21ls"
all pods keep calling
threads exhausted
system failure
```

With circuit breaker:

```text id="2x0k2h"
stop requests
fallback response
```

Often configured:

* In code (Resilience4j)

or

* At mesh level with Istio

---

# 6. Saga Pattern → Cross-Service Transactions

Order workflow:

```text id="0kch9s"
Order Created
Reserve Stock
Charge Card
Ship Item
```

If payment fails:

```text id="rvj9eu"
Undo Stock
Cancel Order
```

This is saga.

Can be managed via:

* Event choreography using Apache Kafka

or

* Orchestrator service

---

# 7. Event-Driven Architecture → Kafka Layer

Use event bus.

```text id="8mjlwm"
order-service
   |
publishes OrderCreated
   |
Kafka
   |
inventory-service
payment-service
notification-service
```

Services react independently.

---

## AWS equivalents

* Amazon Managed Streaming for Apache Kafka
* Amazon SNS
* Amazon SQS

---

# 8. Docker’s Role

Docker packages each service.

Example:

```text id="jyjlwm"
order-service image
payment-service image
inventory-service image
```

Kubernetes runs containers from those images.

---

# 9. AWS Infrastructure Mapping

| Concern    | AWS Service                               |
| ---------- | ----------------------------------------- |
| DNS        | Amazon Route 53                           |
| CDN        | Amazon CloudFront                         |
| Gateway    | Amazon API Gateway                        |
| Kubernetes | Amazon Elastic Kubernetes Service         |
| Database   | Amazon RDS                                |
| Cache      | Amazon ElastiCache                        |
| Events     | Amazon Managed Streaming for Apache Kafka |

---

# Full Flow

```text id="r60mrl"
User clicks Checkout

CloudFront receives request

API Gateway routes request

Order Service creates order

Saga starts

OrderCreated event sent to Kafka

Inventory reserves stock

Payment charges card

Shipping prepares delivery

Redis caches hot reads

Circuit breaker protects payment

Retry handles transient failures

Service discovery locates services

Kubernetes auto-scales pods
```

---

# Where Redis Fits

Redis (via Redis or Amazon ElastiCache):

Used for:

* Cache-aside
* Session storage
* Rate limiting counters
* Distributed locks
* Idempotency keys

Example:

```text id="6dujlwm"
rate_limit:user123
product:567
idempotency:payment789
```

---

# Company-Style Layered View

```text id="cq0dtm"
Presentation Layer
- React
- CloudFront

Gateway Layer
- API Gateway
- Ingress

Service Layer
- Auth
- Orders
- Inventory
- Payments

Resilience Layer
- Retry
- Circuit Breaker

Messaging Layer
- Kafka

Data Layer
- Postgres
- Redis

Infrastructure Layer
- Docker
- Kubernetes
- AWS
```

---

# What Large Companies Typically Use

Often some mix of:

* Netflix

  * Circuit breakers
  * Service discovery
  * Event-driven

* Amazon

  * Sagas
  * Event-driven
  * Massive bounded contexts

* Uber

  * Domain-based microservices
  * Kafka-heavy systems

---

## Practical Adoption Order (Very Important)

Do NOT start with everything.

Start:

```text id="c1f5xg"
1 Docker
2 Kubernetes
3 API Gateway
4 Service Discovery
5 Redis Cache
6 Retry
7 Circuit Breaker
8 Kafka Events
9 Saga
```

This is realistic.
