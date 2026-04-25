# Response 11 — Phase 10 (Observability — Make the System Visible)

At this point, the system can run.

But if something goes wrong…

Can you answer:

* Which service failed?
* Where is latency rising?
* Which order is stuck in a saga?
* Did retries explode?
* Why is the circuit breaker opening?

If not, you are flying blind.

That is why we add observability.

---

# Goal of Phase 10

Add visibility through:

* Logs
* Metrics
* Distributed tracing

Three pillars.

---

# Step 1 — The Three Pillars

## Logs

Discrete events.

Examples:

```text id="l2p7mw"
OrderCreated received

Payment retry attempt 2

Circuit opened
```

---

## Metrics

Numbers over time.

Examples:

```text id="n8q3rf"
payment latency

retry count

orders completed per minute
```

---

## Traces

One request’s journey.

Example:

```text id="v5m1td"
Gateway
→ Order
→ Inventory
→ Payment
→ Shipping
```

For one order.

Huge difference.

---

# Step 2 — Metrics System

Use:

Prometheus

Collect metrics from services.

Examples:

* request count
* error rate
* latency histograms
* consumer lag
* breaker open count

---

# Step 3 — Dashboards

Visualize with:

Grafana

Dashboards for:

* Order throughput

* Payment failures

* Kafka lag

* Redis latency

Very practical.

---

# Step 4 — Distributed Tracing

Use:

Jaeger

or similar.

Trace one correlation.

Example:

```text id="p3r8nk"
REQ-2026-0001
```

through all services.

This is where earlier correlation IDs pay off.

---

# Step 5 — Trace Flow

```text id="w1m6qf"
Gateway receives request

span 1
↓

Order span

span 2
↓

Inventory span

span 3
↓

Payment span

span 4
↓

Shipping span
```

All linked.

This is a distributed trace.

---

# Step 6 — What Is a Span?

One unit of work.

Example:

```text id="y9q2pr"
Reserve inventory took 40 ms
```

That is a span.

Trace = collection of spans.

---

# Step 7 — Key Metrics to Add

## Business Metrics

Examples:

```text id="j4m7tw"
orders completed

orders cancelled

refund count
```

---

## System Metrics

```text id="d8r1pk"
CPU

memory

pod restarts
```

---

## Resilience Metrics

```text id="u3q6hn"
retry attempts

DLQ count

circuit open events
```

Very important.

---

# Step 8 — Observe Saga Health

Track:

```text id="t5m9qw"
sagas in STARTED

sagas in COMPENSATING

stuck sagas
```

Huge value.

Otherwise stuck workflows hide.

---

# Step 9 — Example Problem Diagnosis

Order stuck.

Trace shows:

```text id="e2n8rf"
Gateway 20 ms

Order 15 ms

Inventory 30 ms

Payment 8000 ms
```

Problem found:

Payment.

Without tracing—

hard to know.

---

# Step 10 — Consumer Lag Metrics

For:

Apache Kafka

watch lag.

Example:

```text id="m6p4tv"
payment consumer lag rising
```

Maybe consumers too slow.

Very important.

---

# Step 11 — Alerting

Metrics should trigger alerts.

Examples:

If:

```text id="s1q8rk"
DLQ messages > threshold
```

Alert.

---

If:

```text id="f7m2wd"
circuit open count spikes
```

Alert.

---

If:

```text id="r9n5ph"
error rate > 5%
```

Alert.

Do not rely only on dashboards.

---

# Step 12 — Structured Logging

Avoid random text logs.

Bad:

```text id="h3q7mx"
something broke
```

Bad.

Use structured logs.

Example:

```json id="c5m1tw"
{
 "orderId":"O500",
 "event":"PaymentFailed",
 "correlationId":"REQ-2026-0001"
}
```

Much better.

---

# Step 13 — Log + Trace Correlation

Logs should include:

```text id="k2r8nv"
correlationId
traceId
```

Then logs and traces connect.

Very powerful.

---

# Step 14 — Observability Architecture

```text id="v8m3qp"
Services
 |   |   |
metrics logs traces
 |   |   |
Prometheus
Grafana
Jaeger
```

Visibility layer beside runtime.

---

# Step 15 — What to Watch Regularly

Watch:

* retry spikes
* compensation spikes
* payment latency
* inventory lock contention
* Redis errors
* consumer lag

These reveal system stress.

---

# Step 16 — Deliverables of Phase 10

Now you have:

✔ Metrics

✔ Dashboards

✔ Distributed tracing

✔ Structured logs

✔ Alerting

✔ Saga observability

✔ Consumer lag visibility

Major operational maturity.

---

# Difference from Phase 9

Phase 9:

```text id="a4n7rq"
Keep system alive
```

Phase 10:

```text id="q8m2pw"
See what system is doing
```

Different concern.

---

# What Still Missing

Still unresolved:

❌ production hardening policies

❌ event version evolution

❌ safe deployments

❌ chaos testing

That is final phase.

---

## Next (Response 12 — Phase 11)

Next we do production hardening:

* Outbox pattern
* Event versioning evolution
* Blue/Green deploy
* GitOps with Argo CD
* Chaos testing with Chaos Mesh

That makes it enterprise-grade.
