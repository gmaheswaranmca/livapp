With **12 threads / 6 cores**, you’re in much better shape. For a learning/lab environment, that machine can run a meaningful chunk of the stack.

## What I’d run there comfortably

### Can likely run together (with sensible limits)

* Gateway
* Order Service
* Inventory Service
* Payment Service
* Shipping Service
* PostgreSQL (prefer one instance, multiple schemas for dev)
* Redis
* Apache Kafka (single-node dev)
* Prometheus
* Grafana
* Jaeger

That gets you through Bundles 1–7 credibly.

---

## I would still be cautious with these locally

Use later or sparingly:

* Full local multi-node Kubernetes cluster (possible, but heavier)
* Argo CD (can run, but maybe not necessary at first)
* Chaos Mesh (I’d add only when stable)

---

## My recommended order on that machine

### Stage 1

Run Bundles 1–5 with Docker Compose only.

That already teaches:

* Saga
* Events
* Retry
* Circuit breakers
* Outbox
* Idempotency

Huge value.

---

### Stage 2

Add Bundle 7:

* Prometheus
* Grafana
* Jaeger

Now you have observability.

---

### Stage 3 (Optional)

Then try Bundle 6 (Kubernetes) if you want orchestration practice.

But honestly, Docker Compose first.

---

## Important: Cap resource usage

Even on 12 threads, don’t let everything run unrestricted.

Set limits.

Examples:

For Node services:

```text id="71o7f5"
CPU limit: 0.5
Memory: 256–512 MB each
```

Kafka:

```text id="9p7fxa"
1 broker only
```

Payment replicas:

```text id="9iy8wr"
1 replica (not 3)
```

Do not use production-style replica counts in a dev lab.

---

## What I would simplify

For development, I would reduce:

Instead of:

```text id="7g1ksg"
4 Postgres containers
```

Use:

```text id="7o0x3a"
1 Postgres container
4 schemas
```

Huge savings.

I’d do the same even on a strong laptop.

---

## My honest opinion

If your friend’s machine is available:

**That is the better place to run the full learning platform.**

Your 4-thread machine:

* develop code
* edit services
* test small pieces

Friend’s 12-thread machine:

* run integrated stack

That is a very practical split.

---

## What 12-thread machine could probably support

Reasonably:

* Bundles 1–7 fully
* Parts of Bundle 8
* Some controlled Bundle 9 experiments

That is already a serious platform.

---

If you tell me **how much RAM that 12-thread machine has (8GB? 16GB? 32GB?)**, I can tell you whether it can even handle a local Kubernetes lab.
