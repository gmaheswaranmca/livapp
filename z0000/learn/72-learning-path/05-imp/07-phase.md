# Response 8 — Phase 7 (Service Discovery — Find Service Instances Dynamically)

So far, some places may still assume fixed locations like:

```text id="q3n8tw"
payment-service:5002
```

That works in early development.

It breaks in real distributed systems.

Why?

Instances scale up/down.

Containers move.

IPs change.

We need dynamic discovery.

---

# Goal of Phase 7

Remove hardcoded endpoints.

Add:

* Service registration
* Service lookup
* Dynamic routing
* Load distribution
* Health-aware instance selection

---

# Step 1 — What Is Service Discovery?

A mechanism for answering:

```text id="m2w7kp"
Where is Payment Service right now?
```

Not once.

Continuously.

---

# Step 2 — Problem Without Discovery

Suppose:

Payment pod dies.

Old address:

```text id="u6r1df"
10.2.1.17
```

New pod starts:

```text id="y9c4qs"
10.2.5.91
```

Hardcoded client still calls dead address.

Failure.

---

# Step 3 — Registry Model

Services register themselves.

Example registry stores:

```text id="b7p5xn"
payment-service
  instance A
  instance B
  instance C
```

Clients resolve by name.

Not by hardcoded host.

---

# Step 4 — Service Registration

On startup:

Payment instance registers:

```text id="c8j2fr"
service = payment-service
instance = payment-2
address = 10.2.5.91
```

Registry knows it.

---

# Step 5 — Discovery Flow

Instead of:

```text id="z4m8qd"
call 10.2.5.91
```

Client asks:

```text id="r6v1hk"
find payment-service
```

Registry returns healthy instance.

Then call proceeds.

---

# Step 6 — Client-Side Discovery

Client chooses instance.

Flow:

```text id="n9t4wb"
Order Service
   |
ask registry for payment-service
   |
receive healthy instances
   |
pick one
   |
call payment
```

Client has load balancing logic.

---

# Step 7 — Server-Side Discovery

Alternative:

Gateway/proxy chooses instance.

Flow:

```text id="g2q7mf"
Order
  |
call payment-service name
  |
proxy resolves instance
```

Often simpler for apps.

---

# Step 8 — Kubernetes Native Discovery

In:

Kubernetes

this is built in.

Use DNS.

Example:

```text id="w3p8xn"
payment-service.default.svc.cluster.local
```

Clients call service name.

Kubernetes routes to healthy pods.

Very powerful.

---

# Step 9 — Tools Outside Kubernetes

Examples:

* Consul

* Eureka

Registry-based models.

Useful if not relying only on Kubernetes.

---

# Step 10 — Health Checks Matter

Discovery should return healthy instances only.

Suppose:

3 payment instances:

```text id="f7m1xr"
A healthy

B healthy

C unhealthy
```

C should not be returned.

Health-aware routing.

Critical.

---

# Step 11 — Discovery + Circuit Breaker

They complement each other.

Circuit breaker says:

```text id="j5n2kp"
This dependency path unhealthy
```

Discovery may route to another instance.

Example:

```text id="e1q6tw"
payment instance A bad

discover B instead
```

Great combination.

---

# Step 12 — Discovery + Scaling

Suppose traffic increases.

Scale:

```text id="p4r9ms"
Payment pods

3 → 10
```

Discovery automatically sees more instances.

Clients do not change code.

Huge benefit.

---

# Step 13 — Example Flow Now

Before:

```text id="s8w2nf"
Order
 -> fixed payment endpoint
```

After:

```text id="k7m3pv"
Order
 -> discover payment-service
 -> select healthy instance
 -> call
```

Dynamic.

---

# Step 14 — Service Naming Convention

Use stable logical names.

Examples:

```text id="a6d8qx"
order-service

inventory-service

payment-service

shipping-service
```

Names stable.

Instances ephemeral.

Important distinction.

---

# Step 15 — Discovery in Event Systems

Even with:

Apache Kafka

discovery still matters.

Why?

Consumers still need:

* databases
* Redis
* external providers
* sometimes synchronous side calls

Discovery still useful.

---

# Step 16 — Retry + Discovery Interaction

Example:

Payment instance A times out.

Retry can target another healthy instance.

```text id="h3v7qr"
retry to different instance
```

Better than retrying same dead one.

---

# Step 17 — Architecture Now

```text id="u5n4tw"
Order Service
   |
Service Discovery
   |
Find payment-service
   |
Healthy instance selected
   |
Circuit Breaker + Retry
   |
Payment call
```

Now location is dynamic.

---

# Step 18 — Deliverables of Phase 7

Now you have:

✔ Service registration

✔ Dynamic lookup

✔ Health-aware routing

✔ Load distribution

✔ Discovery + breaker integration

✔ Discovery + scaling support

Major distributed maturity improvement.

---

# Difference from Phase 6

Phase 6:

```text id="q1p7ks"
Protect from unhealthy dependency
```

Phase 7:

```text id="m8r3fd"
Find healthy dependency instances dynamically
```

Different concern.

---

# Still Missing

Still unresolved:

❌ packaging services for deployment
❌ container standardization
❌ self-healing runtime

That comes next.

---

## Next (Response 9 — Phase 8)

Next we add:

* Containerization
* Dockerfiles
* health probes
* configs and secrets
* packaging Order/Inventory/Payment/Shipping
* broker + Redis containers

That prepares for Kubernetes.
