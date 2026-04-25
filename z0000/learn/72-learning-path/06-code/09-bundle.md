# Bundle 9 — Chaos Engineering + Load Testing + Resilience Verification

Goal:
Prove the system survives failures.

Implements production hardening verification.

Adds:

* Chaos experiments
* Load tests
* Failure injections
* Verification checks

---

# 1. Install Chaos Tool

Use:

Chaos via entity["software","Chaos Mesh","Chaos engineering platform"]

Install (example):

```bash
kubectl create ns chaos-testing
```

(Use official install method for your cluster.)

---

# 2. Chaos Scenario 1 — Kill Payment Pod

Experiment:

```yaml
apiVersion: chaos-mesh.org/v1alpha1
kind: PodChaos
metadata:
 name: kill-payment
 namespace: chaos-testing
spec:
 action: pod-kill
 mode: one
 selector:
  namespaces:
   - commerce
  labelSelectors:
   app: payment-service
 duration: "30s"
```

Apply:

```bash
kubectl apply -f kill-payment.yaml
```

Expected:

* Kubernetes recreates pod
* Orders continue
* retries may occur
* breaker may open if needed

Verify resilience.

---

# 3. Chaos Scenario 2 — Add Network Latency

Inject latency to payment.

```yaml
kind: NetworkChaos
spec:
 action: delay
 delay:
  latency: "2000ms"
```

Expected:

* retries rise
* latency visible in metrics
* possibly breaker activity

Observe in:

* entity["software","Grafana","Observability dashboards"]
* entity["software","Jaeger","Distributed tracing system"]

---

# 4. Chaos Scenario 3 — Break Redis Temporarily

Simulate:

* dedup unavailable
* idempotency dependency degraded

Observe behavior.

This exposes coordination risks.

---

# 5. Load Testing Tool

Use simple open-source tool (example k6 style script).

load-test.js

```javascript
import http from 'k6/http';

export default function(){
 http.post(
 'http://gateway/api/orders',
 JSON.stringify({
   customerId:'C101',
   items:[{sku:'P1',qty:1}],
   amount:100
 }),
 {
 headers:{'Content-Type':'application/json'}
 }
 );
}
```

Run:

```bash
k6 run load-test.js
```

---

# 6. Load Scenarios

Test:

## Moderate

```text
100 virtual users
```

---

## Spike

```text
100 -> 1000 quickly
```

Watch HPA.

---

## Sustained

```text
30 minutes
```

Check leaks.

---

# 7. What To Observe During Load

Watch:

* payment pod scaling
* retry counts
* DLQ count
* consumer lag
* circuit opens

Very important.

---

# 8. Resilience Verification Checklist

If payment unavailable 5 min:

Expected:

✔ retries happen

✔ breaker opens

✔ no cascading failure

✔ compensation works if exhausted

✔ system recovers

This is the test.

---

# 9. Failure Drill — Kafka Unavailable

Simulate broker outage.

Expected:

* outbox accumulates PENDING
* publisher retries later
* no event loss

This verifies Bundle 5.

---

# 10. Verify Duplicate Safety Under Load

Under concurrent load:

Verify no duplicate payment.

Check:

```text
idempotency:payment:* keys
```

and payments table.

No double charges.

Critical.

---

# 11. Simple Success SLO Example

Define target.

Example:

```text
99.9% order success
```

and:

```text
p95 latency < 500ms
```

Measure against it.

---

# 12. Manual Failure GameDay Ideas

Run drills:

* kill inventory pods
* force payment failures
* saturate Redis

Practice incident response.

Very mature practice.

---

# 13. What This Implements

✔ Chaos experiments
✔ Pod failure tests
✔ Network delay tests
✔ Load tests
✔ Resilience verification
✔ Failure drills

You now test the architecture, not just trust it.

---

# 14. Still Missing

Only final packaging / environment promotion remains.

---

## Next = Bundle 10

Will add:

* dev/test/prod environment packaging
* config overlays
* production packaging structure
* release promotion model
