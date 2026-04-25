# Response 4 — Phase 3 (Saga Pattern — Distributed Transaction)

Now we solve the core distributed systems problem:

**What if one service succeeds, and a later service fails?**

Example:

* Inventory reserved ✔
* Payment authorized ✔
* Shipping creation fails ✖

Without a strategy:

* stock remains reserved
* payment may remain captured
* order may be inconsistent

That is why we need a **Saga**.

---

# Goal of Phase 3

Implement distributed consistency through:

* Forward steps
* Compensation steps
* Saga state tracking

Not ACID distributed transaction.

Business consistency.

---

# Step 1 — What Is a Saga?

A saga is:

```text id="2k6q8z"
A sequence of local transactions
plus compensating transactions.
```

Each service commits its own database.

If later step fails:

Undo earlier steps through compensation.

---

# Step 2 — Our Forward Flow

Business path:

```text id="hf7l6w"
1 Reserve Inventory

2 Authorize Payment

3 Create Shipment

4 Complete Order
```

---

# Step 3 — Compensation Flow

If something fails:

```text id="tjlwmj"
CreateShipment fails
    ↓

RefundPayment

ReleaseInventory

CancelOrder
```

Undo in reverse order.

Very important.

---

# Step 4 — Compensation Mapping

| Forward Action    | Compensation                          |
| ----------------- | ------------------------------------- |
| Reserve Inventory | Release Inventory                     |
| Authorize Payment | Refund Payment                        |
| Create Shipment   | Cancel Shipment                       |
| Complete Order    | Cancel Order (before completion only) |

Every forward action should have undo logic.

---

# Step 5 — Two Saga Styles

## Style A — Choreography Saga

Services react only through events.

No central controller.

```text id="n6p78x"
OrderCreated
 ↓

InventoryReserved
 ↓

PaymentAuthorized
 ↓

ShipmentCreated
```

Failure:

```text id="n2iz4r"
PaymentFailed
 ↓

InventoryReleased
 ↓

OrderCancelled
```

Each service reacts.

---

## Style B — Orchestrated Saga

A central coordinator decides next step.

Example:

```text id="g7az6d"
Saga Coordinator

Step1 -> Reserve Inventory

Step2 -> Authorize Payment

Step3 -> Create Shipment
```

On failure:

Coordinator sends:

* RefundPayment

* ReleaseInventory

---

## Which for our system?

For learning:

Start with choreography.

For complex enterprise workflows:

Often orchestration.

We can begin with Order Service as temporary coordinator.

---

# Step 6 — Add Saga State Machine

Track each order’s saga.

Possible states:

```text id="wh12s8"
STARTED

INVENTORY_DONE

PAYMENT_DONE

SHIPPING_DONE

COMPLETED

FAILED

COMPENSATING

CANCELLED
```

This matters.

Without state, recovery is hard.

---

# Step 7 — Saga State Table

Add table:

```text id="jlwmm2"
order_sagas
```

Fields conceptually:

```text id="pqg08u"
saga_id
order_id
current_step
status
correlation_id
updated_at
```

Example:

```text id="znt5xe"
S100
O500
PAYMENT_DONE
COMPENSATING
```

---

# Step 8 — Happy Path Saga Sequence

```text id="a3v1m2"
OrderCreated
 ↓

Reserve Inventory
 ↓

InventoryReserved

update saga:
INVENTORY_DONE

↓

Authorize Payment

update saga:
PAYMENT_DONE

↓

Create Shipment

update saga:
SHIPPING_DONE

↓

OrderCompleted
```

---

# Step 9 — Failure Scenario Example

Suppose shipping fails.

Sequence:

```text id="3h8s4f"
OrderCreated

InventoryReserved

PaymentAuthorized

ShipmentFailed
```

Now:

```text id="pkb8sj"
Saga enters COMPENSATING
```

Then:

```text id="m5o2jz"
RefundPayment
 ↓

PaymentRefunded

ReleaseInventory
 ↓

InventoryReleased

OrderCancelled
```

Done.

---

# Step 10 — Compensation Events

Add events.

Payment:

```text id="e13b7r"
RefundRequested
PaymentRefunded
```

Inventory:

```text id="szq5n1"
ReleaseInventoryRequested
InventoryReleased
```

Shipping:

```text id="x1rd6t"
ShipmentCancelled
```

These are part of domain.

---

# Step 11 — Orchestrator Pseudocode

```pseudo id="jlwmm7"
Start Saga

reserve inventory

if fail:
 cancel order

authorize payment

if fail:
 release inventory
 cancel order

create shipment

if fail:
 refund payment
 release inventory
 cancel order

complete order
```

Looks like Phase 1 logic—

but now distributed through events and persisted state.

Huge difference.

---

# Step 12 — Important Rule

Compensation is NOT rollback.

It is a new business transaction.

Example:

RefundPayment is not "reverse database commit".

It is a new domain action.

Very important mindset.

---

# Step 13 — Idempotent Compensation

Suppose duplicate event:

```text id="9n4kr2"
RefundRequested arrives twice
```

Second refund must not double refund.

Compensations must be safe to repeat.

This is why Phase 4 introduces Redis.

---

# Step 14 — Timeout Handling

What if Payment never responds?

Need timeout.

Example:

```text id="tyj1a4"
wait 30 seconds

if no PaymentAuthorized
 trigger compensation
```

This becomes part of saga.

---

# Step 15 — Saga Log (Audit)

Store every transition.

Example:

```text id="jlwmmc"
saga_log
-----------
STARTED

INVENTORY_DONE

PAYMENT_DONE

COMPENSATING

CANCELLED
```

Useful for:

* Recovery
* Debugging
* Audit

Very important in production.

---

# Step 16 — Architecture Picture

```text id="jlwmmf"
Client
  |
Gateway
  |
Order starts Saga
  |
OrderCreated
  |
Broker
  |
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
ShipmentFailed
  |
Compensation Events
  |
RefundPayment
ReleaseInventory
CancelOrder
```

That is distributed transaction behavior.

---

# Step 17 — Failure Matrix

Think in scenarios.

| Failure         | Compensation                                      |
| --------------- | ------------------------------------------------- |
| Inventory fails | Cancel order                                      |
| Payment fails   | Release inventory + cancel order                  |
| Shipping fails  | Refund payment + release inventory + cancel order |

Model these explicitly.

---

# Step 18 — What We Still Haven’t Solved

Still missing:

❌ Duplicate message handling
❌ Idempotency keys
❌ Retry backoff
❌ Circuit breakers
❌ Poison event recovery

Next phases solve these.

---

# Deliverables of Phase 3

Now you have:

✔ Saga pattern

✔ Compensation design

✔ Saga state machine

✔ Failure workflows

✔ Timeout idea

✔ Audit log

✔ Distributed consistency model

This is where your system stops being "just event-driven" and becomes transactional.

---

## Difference from Phase 2

Phase 2:

```text id="x9z2k1"
Events trigger other events.
```

Phase 3:

```text id="w3m7fp"
Events + compensation maintain consistency.
```

Massive upgrade.
