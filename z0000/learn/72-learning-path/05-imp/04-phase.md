# Response 5 — Phase 4 (Redis for Idempotency, Speed, and Safety)

Now we solve a serious distributed systems problem:

**Messages can arrive more than once.**

Example:

```text id="a1x3p7"
PaymentAuthorized delivered twice
```

Danger:

* customer charged twice
* inventory reserved twice
* shipment created twice

Unacceptable.

This is where:

Redis

enters.

---

# Goal of Phase 4

Use Redis for:

* Idempotency
* Duplicate-event protection
* Fast saga state lookup
* Distributed locking
* Performance caching

Redis is not just "cache".

It becomes safety infrastructure.

---

# Step 1 — What Idempotency Means

Same request processed twice:

Result must be same as once.

Example:

```text id="a7o9c2"
Charge payment once

Repeat same request

still one charge
```

That is idempotent behavior.

---

# Step 2 — Where Duplicates Come From

Can happen because of:

* Broker redelivery
* Consumer restart
* Network timeout ambiguity
* Producer retries
* User double-submit

Example:

Customer clicks Pay twice.

Or:

Broker resends event.

Both must be safe.

---

# Step 3 — Idempotency Key Pattern

Every business request gets a key.

Example:

```text id="t8w5rm"
Idempotency-Key:
PAY-O500-01
```

Store in Redis.

---

## Redis Key

```text id="5j3c4q"
idempotency:payment:PAY-O500-01
```

Value:

```json id="mk7w2b"
{
 "status":"processed",
 "paymentId":"P900"
}
```

---

# Step 4 — Payment Flow with Redis

Before charging:

Check Redis.

Pseudo:

```pseudo id="y6q2vf"
if key exists:

 return existing result

else

 process payment

 store key

 return success
```

Now duplicate event is harmless.

---

# Step 5 — Event Deduplication

Use eventId.

Event:

```json id="cl8y2h"
{
 "eventId":"E1001"
}
```

Store:

```text id="wb4z9m"
processed:event:E1001
```

Consumer logic:

```pseudo id="r9n2cx"
if processed:event exists

ignore event

else

process

mark processed
```

Classic dedup.

---

# Step 6 — Use SETNX (Critical)

Redis supports:

```text id="3gh6te"
SETNX
Set if not exists
```

Perfect for idempotency.

Example:

```text id="m0p7kf"
SETNX payment:O500 processing
```

If already exists:

Do not process again.

This is foundational.

---

# Step 7 — Redis Key Strategy

Design keys carefully.

---

## Idempotency

```text id="p6e8qa"
idempotency:order:{requestId}

idempotency:payment:{requestId}
```

Examples:

```text id="3m7xkr"
idempotency:payment:PAY-O500
```

---

## Processed Events

```text id="u4d9ln"
processed:event:{eventId}
```

---

## Saga State Cache

```text id="t9g6wh"
saga:order:{orderId}
```

Example:

```json id="tpr2nw"
{
 "state":"PAYMENT_DONE"
}
```

Fast lookup.

---

## Stock Cache

```text id="d4h8pz"
stock:sku:P1
```

---

## Lock Keys

```text id="8qf5va"
lock:inventory:sku:P1
```

---

# Step 8 — Distributed Lock for Inventory

Problem:

Two orders reserve same last item.

Need atomic control.

Use lock.

```text id="jq6p7v"
lock:inventory:sku:P1
```

Flow:

```pseudo id="m5k1ts"
acquire lock

check stock

reserve

release lock
```

Prevents overselling.

---

# Step 9 — Saga State in Redis

Instead of only database:

Cache saga progress.

```text id="7r2jlwm"
saga:order:O500
```

Value:

```json id="g8x6qn"
{
 "step":"PAYMENT_DONE",
 "status":"ACTIVE"
}
```

Fast recovery.

Useful if consumer crashes.

---

# Step 10 — Use TTL (Very Important)

Not all keys forever.

Example:

```text id="az1r8y"
idempotency keys expire 24h
```

Example:

```text id="v3q7hj"
TTL 86400
```

Otherwise Redis grows endlessly.

---

# Step 11 — Consumer Flow Now

Before:

```pseudo id="pq5zme"
consume event

process
```

Now:

```pseudo id="u6f2rd"
consume event

check processed:event

if already processed
 stop

else

process

mark processed
```

Much safer.

---

# Step 12 — Example Duplicate PaymentAuthorized

First event:

```text id="39p2xa"
PaymentAuthorized E1001
```

processed:

```text id="vc6k0s"
processed:event:E1001=true
```

Duplicate arrives again.

Consumer sees:

```text id="0g8myn"
already processed
ignore
```

No double shipping.

---

# Step 13 — Cache for Speed (Secondary Use)

Redis also speeds reads.

Examples:

```text id="z2m8qr"
order summary cache

stock availability cache
```

Key:

```text id="j5v9du"
order:summary:O500
```

This is secondary to safety.

Safety first.

---

# Step 14 — Failure Scenario

Suppose payment processed…

but service crashes before DB commit uncertainty.

Redis idempotency helps recovery.

Retry comes:

same key detected.

Avoid duplicate charge.

Huge value.

---

# Step 15 — Architecture Picture

```text id="3d7jwm"
OrderCreated
   |
 Broker
   |
Payment Consumer
   |
Check Redis

processed:event?

 if yes -> ignore

 if no:
   authorize payment
   store idempotency key
   mark processed:event
   publish PaymentAuthorized
```

Redis sits beside services.

---

# Step 16 — Add Redis But Do NOT Put Everything In It

Bad:

```text id="5n2fye"
Use Redis as primary database
```

No.

Redis supports:

* coordination
* safety
* cache

System-of-record remains databases.

Important.

---

# Step 17 — Deliverables of Phase 4

Now you have:

✔ Idempotency keys

✔ Duplicate-event protection

✔ Processed-event registry

✔ Redis key strategy

✔ Distributed locks

✔ Saga cache

✔ TTL strategy

✔ Oversell protection

Massive resilience gain.

---

# Difference from Phase 3

Phase 3:

```text id="9q2hbr"
Compensation exists
```

But duplicates can still break it.

Phase 4:

```text id="a8w4tz"
Compensation + duplicate safety
```

Now it becomes trustworthy.

---

# Step 18 — What Still Missing

Still unresolved:

❌ transient retries
❌ dead-letter handling
❌ circuit breakers
❌ service discovery

Those come next.
