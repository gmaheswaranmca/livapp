# Response 7 — Phase 6 (Circuit Breakers — Stop Cascading Failures)

Retries solve **temporary** failures.

But what if a dependency is actually unhealthy?

Example:

Payment provider is down for 20 minutes.

Retries alone may cause:

* retry storms
* thread exhaustion
* queue buildup
* cascading failure into other services

That is where circuit breakers protect the system.

---

# Goal of Phase 6

Add:

* Circuit breaker states
* Failure thresholds
* Fallback behavior
* Prevent cascading failures
* Decide:

```text id="6p2vxm"
Retry?
or
Open circuit?
```

---

# Step 1 — What Is a Circuit Breaker?

Same idea as an electrical breaker.

When failures exceed threshold:

Stop sending requests.

Protect system.

---

# Step 2 — Three States

## Closed

Normal mode.

Requests allowed.

```text id="9m4qhd"
Requests flow normally
```

---

## Open

Dependency considered unhealthy.

Requests blocked immediately.

```text id="8r7jfs"
Do not call dependency
fail fast
```

---

## Half-Open

Test recovery.

Allow limited trial requests.

```text id="5t1wkn"
Try a few requests
```

If they succeed:

Close circuit.

If fail:

Open again.

---

# Step 3 — State Flow

```text id="g7p3xa"
Closed
 ↓ failures exceed threshold

Open
 ↓ wait period

Half-Open
 ↓ success

Closed
```

or

```text id="v2m6je"
Half-Open
 ↓ failure

Open again
```

---

# Step 4 — Example Threshold

Suppose:

```text id="j9k4rb"
50% failures
over last 20 requests
```

Then:

Open breaker.

This is policy.

---

# Step 5 — Payment Example

Without breaker:

```text id="w3d9pt"
Payment down

Every order retries payment

System overload grows
```

Bad.

---

With breaker:

```text id="r4n2gx"
Failures exceed threshold

Circuit opens

New requests fail fast
```

System survives.

---

# Step 6 — Where Breaker Lives

Often around outbound dependency calls.

Example:

Order → Payment provider

Wrap payment client.

---

Concept:

```text id="3q8mvu"
PaymentClient
  inside breaker
```

---

# Step 7 — Flow with Retry + Breaker

Order matters.

First:

Retry small transient errors.

If repeated failures accumulate:

Open breaker.

Pattern:

```text id="8c5hny"
Try retry

Still failing repeatedly?

Open circuit
```

Retries and breaker work together.

---

# Step 8 — Pseudocode

```pseudo id="7n1qrd"
if breaker open

   fail fast

else

   try call payment

   if success
      record success

   if fail
      record failure

      maybe retry

      if threshold exceeded
         open breaker
```

---

# Step 9 — Fallback Strategy

When circuit open:

What should happen?

Choices:

---

## Fallback A — Reject immediately

```text id="0m7tqb"
Payment temporarily unavailable
```

Simple.

---

## Fallback B — Queue for later

Could publish:

```text id="w1k8rs"
PaymentPending
```

and process later.

Useful for some domains.

---

## Fallback C — Trigger compensation

If in active saga:

```text id="y5r2hf"
Payment unavailable
 → PaymentFailed
 → compensate
```

Depends design.

---

# Step 10 — Half-Open Example

After 30 seconds:

Allow 3 test requests.

```text id="p9c4wv"
trial 1 success

trial 2 success

trial 3 success
```

Close breaker.

Recovery proven.

---

# Step 11 — Distinguish Retry vs Breaker

Retry:

```text id="n8d6zk"
Maybe this request can succeed soon
```

Breaker:

```text id="b2h9fa"
Dependency itself is unhealthy
```

Different concern.

---

# Step 12 — Prevent Cascading Failure

Without breaker:

```text id="k1m5xp"
Payment slow
 ↓

Order threads block
 ↓

Gateway queues grow
 ↓

Whole system degrades
```

Cascade.

Breaker stops this.

---

# Step 13 — Bulkhead Thinking (Related)

Often paired concept.

Isolate resources.

Example:

Payment gets its own connection pool.

Failure in payment does not consume all threads.

Often discussed with breakers.

---

# Step 14 — Metrics to Track

Track:

* failure rate
* slow call rate
* open count
* half-open transitions

Useful in observability later.

---

# Step 15 — Tools

Code library approach:

Resilience4j

Can provide:

* retry
* circuit breaker
* bulkhead

---

Service mesh approach:

Istio

Can apply resilience policies at network layer.

---

# Step 16 — Architecture Now

```text id="t7v3jd"
InventoryReserved
   |
Payment Consumer
   |
Retry policy
   |
Circuit Breaker
   |
if closed:
   call payment

if open:
   fail fast
   fallback
```

Now dependency overload is controlled.

---

# Step 17 — Example Failure Timeline

```text id="z2w6qn"
Call 1 fail

Call 2 fail

Call 3 fail

Call 4 fail

threshold reached

OPEN circuit
```

Next requests:

```text id="e4r8mc"
blocked immediately
```

Huge protection.

---

# Step 18 — Deliverables of Phase 6

Now you have:

✔ Circuit states

✔ Threshold rules

✔ Retry + breaker interaction

✔ Fallback strategies

✔ Cascading failure protection

✔ Half-open recovery model

Massive production maturity increase.

---

# Difference from Phase 5

Phase 5:

```text id="d8q2pf"
Recover temporary failures
```

Phase 6:

```text id="h5m1zr"
Protect system when dependency unhealthy
```

Different problem.

---

# Still Missing

Still unresolved:

❌ hardcoded service locations
❌ dynamic instance discovery
❌ scaling services dynamically

That is next.

---

## Next (Response 8 — Phase 7)

Next we add:

* Service Discovery
* dynamic instance registration
* locating service instances
* Kubernetes native discovery
* maybe Consul or Eureka

That removes hardcoded service endpoints.
