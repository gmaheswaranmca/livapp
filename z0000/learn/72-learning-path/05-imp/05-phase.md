# Response 6 — Phase 5 (Retry Pattern, Backoff, and Dead Letter Handling)

Now we solve another major distributed systems reality:

**Not every failure is a real business failure.**

Sometimes it is only temporary.

Examples:

* Payment provider timeout
* Inventory DB deadlock
* Network glitch
* Broker connection interruption

If you cancel the order immediately, that is wrong.

You should retry first.

---

# Goal of Phase 5

Add:

* Retry policies
* Exponential backoff
* Dead Letter Queue (DLQ)
* Poison message handling
* Decide:

```text id="2b7qmx"
Retry?
or
Compensate?
```

Huge difference.

---

# Step 1 — Types of Failures

## Transient Failure (Retryable)

Temporary.

Examples:

* HTTP 503

* Connection timeout

* DB deadlock

May succeed on next attempt.

Retry these.

---

## Permanent Failure (Business Failure)

Not temporary.

Examples:

* Out of stock

* Card declined

* Fraud rejected

Do NOT retry these.

Compensate.

Important distinction.

---

# Step 2 — Decision Matrix

| Failure         | Action     |
| --------------- | ---------- |
| Network timeout | Retry      |
| Payment 503     | Retry      |
| DB deadlock     | Retry      |
| Card declined   | Compensate |
| Out of stock    | Compensate |

Never treat all failures the same.

---

# Step 3 — Basic Retry Policy

Example:

```text id="pt8x4m"
max attempts = 3
```

Flow:

```text id="q1f7ws"
Attempt 1

Fail

Retry

Attempt 2

Fail

Retry

Attempt 3

Fail

send to DLQ
```

---

# Step 4 — Exponential Backoff

Do NOT retry instantly.

Bad:

```text id="1p5mwr"
retry now
retry now
retry now
```

Can overload failing dependency.

Use backoff.

Example:

```text id="9v2qhe"
Attempt 1 -> wait 1 sec

Attempt 2 -> wait 2 sec

Attempt 3 -> wait 4 sec
```

Pattern:

```text id="1u9fda"
2^n
```

---

# Step 5 — Add Jitter

Important improvement.

Without jitter:

All instances retry same moment.

Retry storm.

Use randomness.

Example:

```text id="74w6gc"
4 seconds ± random
```

Very important at scale.

---

# Step 6 — Retry Metadata in Event

Add attempt count.

Example:

```json id="iq0s7v"
{
 "eventId":"E1001",
 "retryCount":2
}
```

Consumer can inspect:

Should I retry again?

Useful.

---

# Step 7 — Consumer Logic

```pseudo id="5j8nra"
consume event

try process

if transient error:

   if retryCount < 3

      republish with retryCount+1

   else

      send to DLQ
```

Basic pattern.

---

# Step 8 — Dead Letter Queue (DLQ)

When repeated failures continue:

Do not lose message.

Move it.

Example topic:

```text id="w2q7nf"
payment-dlq
```

or

```text id="mk5r4u"
inventory-dlq
```

Failed messages park there.

---

# Step 9 — What Goes To DLQ?

Example:

```text id="8h3tqx"
Payment event fails 3 times
```

Move original event to:

```text id="jlwmm9"
payment-dlq
```

Later:

* inspect
* replay
* fix manually or automatically

DLQ is safety net.

---

# Step 10 — Poison Messages

Poison message:

Always fails.

Example:

Malformed payload.

```json id="p4r7dx"
amount = null
```

Retrying forever is useless.

Should go directly to DLQ.

---

# Step 11 — Retry vs Compensation Logic

Important sequence:

```text id="5x9pmb"
Transient failure?
   Retry first

Permanent failure?
   Compensate
```

Never compensate too early.

---

Example:

Payment provider timeout:

Do NOT do:

```text id="ap3n7v"
Refund
Cancel order
```

Wrong.

Retry first.

Only compensate if retries exhausted.

---

# Step 12 — Payment Example Flow

```text id="4c7kzw"
InventoryReserved
  ↓

Try authorize payment

Timeout
  ↓

Retry 1

Timeout
  ↓

Retry 2

Success
  ↓

Publish PaymentAuthorized
```

No cancellation needed.

Order saved.

---

# Step 13 — If Retries Exhausted

```text id="c2v8jr"
Attempt 3 fails
```

Then:

```text id="tx5n3g"
PaymentFailed
```

Now compensation begins.

```text id="jlwmme"
ReleaseInventory

CancelOrder
```

That is correct ordering.

---

# Step 14 — Retry State in Redis (Optional Enhancement)

Use:

Redis

Key:

```text id="jlwmmf"
retry:payment:E1001
```

Value:

```text id="jlwmmg"
attempt=2
```

Useful across crashes.

---

# Step 15 — Architecture Now

```text id="jlwmmh"
InventoryReserved
   |
Payment Consumer
   |
Transient failure?
   |
Retry Policy
   |
Success --> PaymentAuthorized

or

Exhausted retries
   |
DLQ
   |
PaymentFailed
   |
Compensation
```

Now failure handling is intelligent.

---

# Step 16 — Broker Retry Topics (Optional Pattern)

Instead of sleeping inside consumer, use retry topics.

Example:

```text id="jlwmmi"
payment-retry-1
payment-retry-2
payment-retry-3
```

Progressive delays.

Common pattern in:

Apache Kafka

---

# Step 17 — What NOT To Retry

Never retry blindly:

Bad candidates:

* Card declined
* Validation error
* SKU does not exist

These are business failures.

Retry wastes resources.

---

# Step 18 — Deliverables of Phase 5

Now you have:

✔ Retry classification

✔ Exponential backoff

✔ Jitter

✔ Retry metadata

✔ Dead letter queues

✔ Poison handling

✔ Retry vs compensate logic

Huge resilience improvement.

---

# Difference from Phase 4

Phase 4 solved:

```text id="jlwmmj"
Duplicate safety
```

Phase 5 solves:

```text id="jlwmmk"
Temporary failure recovery
```

Very different problems.

---

# Still Missing

Still not solved:

❌ cascading failure protection
❌ service unavailable overload control
❌ dependency isolation

That is next:

Circuit breakers.

---

## Next (Response 7 — Phase 6)

Next we add:

* Circuit Breaker states
* Closed / Open / Half-Open
* fallback strategies
* preventing cascading failures
* where retries stop and breaker starts
* maybe using Resilience4j or Istio

That protects the system when retries are no longer enough.
