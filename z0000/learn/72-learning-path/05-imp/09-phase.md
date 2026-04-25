# Response 10 — Phase 9 (Kubernetes — Keep the Whole System Alive)

Now we move from **containers** to **orchestration**.

Containers package software.

Kubernetes runs and manages it.

This is where:

> “Kubernetes keeps the whole system alive”

becomes real.

---

# Goal of Phase 9

Add:

* Deployments
* Services
* Self-healing
* Liveness and readiness probes
* Autoscaling
* Declarative desired state

Now we manage a living distributed system.

---

# Step 1 — Desired State Thinking

Instead of:

```text id="j7n3wp"
Run one payment process
```

You declare:

```text id="r2m8qf"
I want 3 payment instances always running
```

Kubernetes maintains that.

Huge mental shift.

---

# Step 2 — Deployments

Use Deployment for each service.

Examples:

```text id="y5v1ts"
order deployment

inventory deployment

payment deployment

shipping deployment
```

Each declares:

* image version
* replica count
* probes
* resources

---

# Step 3 — Replicas

Suppose:

```text id="k8p4mn"
payment replicas = 3
```

Kubernetes runs:

3 pods.

If one dies:

It replaces it.

Self-healing.

---

# Step 4 — Self-Healing Example

Pod crashes:

```text id="z6q2rd"
payment pod gone
```

Kubernetes notices.

Starts new pod automatically.

No human intervention.

Critical.

---

# Step 5 — Kubernetes Services

Do not confuse with business services.

Kubernetes “Service” provides stable network identity.

Example:

```text id="v4m7hk"
payment-service
```

Pods may change.

Service name stays.

Connects to discovery we discussed.

---

# Step 6 — Built-in Service Discovery

Clients call:

```text id="s9r3tw"
payment-service
```

not individual pod IPs.

Kubernetes routes to healthy pods.

This is Phase 7 realized operationally.

---

# Step 7 — Liveness Probe in Kubernetes

Uses your earlier:

```http id="n2q8fd"
GET /health
```

If failing repeatedly:

Kubernetes restarts pod.

Example:

```text id="g5m1xr"
health fails
→ restart container
```

Self-repair.

---

# Step 8 — Readiness Probe

Uses:

```http id="w7p4nk"
GET /ready
```

If not ready:

Pod removed from traffic.

Huge protection.

Example:

DB down.

Pod alive…

but not ready.

Traffic not sent there.

Excellent.

---

# Step 9 — Horizontal Scaling

Add autoscaling.

If load rises:

```text id="u1q6mv"
payment

3 pods -> 10 pods
```

Automatically.

Through Horizontal Pod Autoscaler.

Massive value.

---

# Step 10 — What Can Trigger Scaling?

Metrics like:

* CPU

* Memory

Later even custom metrics:

* queue lag

* event backlog

Useful for consumers.

---

# Step 11 — Redis and Broker on Kubernetes

Deploy:

Redis

and

Apache Kafka

as managed workloads too.

Not only app services.

Important.

---

# Step 12 — ConfigMaps

Non-secret configuration.

Examples:

```text id="d8n2pw"
BROKER_TOPIC

RETRY_LIMIT

CIRCUIT_THRESHOLD
```

Externalized.

Good practice.

---

# Step 13 — Secrets

Sensitive values.

Examples:

* payment credentials

* db password

* broker auth

Separate from images.

Critical.

---

# Step 14 — Rolling Updates

Deploy new version:

```text id="q3m7rk"
payment-service:1.0.1
```

Kubernetes can replace pods gradually.

No big bang.

Very important.

---

# Step 15 — Rollback

New version broken?

Rollback.

Return to:

```text id="h9v4tx"
payment-service:1.0.0
```

Huge operational safety.

---

# Step 16 — Architecture Now

```text id="m5q1nr"
Client
 |
Gateway pods
 |
Order pods
 |
Broker
 |
Inventory pods
Payment pods
Shipping pods
 |
Redis
```

All under Kubernetes.

---

# Step 17 — Failure Example

Payment pod dies.

Without orchestration:

Manual recovery.

With Kubernetes:

```text id="t6r8pw"
pod fails
 ↓

new pod scheduled
 ↓

service routes traffic
```

System stays alive.

---

# Step 18 — Deliverables of Phase 9

Now you have:

✔ Deployments

✔ Replicas

✔ Self-healing

✔ Services

✔ Liveness probes

✔ Readiness probes

✔ Autoscaling

✔ Rolling updates

✔ Rollback

This is major production capability.

---

# Difference from Phase 8

Phase 8:

```text id="p4n7kw"
Package services
```

Phase 9:

```text id="c8m2rf"
Run and keep services alive
```

Very different.

---

# What Still Missing

Still unresolved:

❌ observability

❌ tracing across saga

❌ metrics-driven insight

You can run a system…

but can you see it?

That is next.

---

## Next (Response 11 — Phase 10)

Next we add observability with:

* Prometheus
* Grafana
* Jaeger

to trace:

Gateway
→ Order
→ Inventory
→ Payment
→ Shipping

That makes failures visible.
