# Bundle 10 — Production Packaging (Dev/Test/Prod Promotion + Release Packaging)

Goal:
Package the platform for multiple environments and controlled promotion.

Final bundle.

Adds:

* Environment structure
* Config overlays
* Promotion model
* Release packaging approach

---

# 1. Directory Structure

```text
k8s/
 base/
   gateway.yaml
   order.yaml
   inventory.yaml
   payment.yaml
   shipping.yaml

 overlays/
   dev/
   test/
   prod/
```

Base shared.

Environment overrides in overlays.

---

# 2. Dev Overlay Example

Lower scale.

```yaml
replicas:1
```

Simpler resources.

---

# 3. Prod Overlay Example

Higher scale.

```yaml
replicas:3
```

Different:

* larger limits
* HPA enabled
* stricter policies

---

# 4. Config Per Environment

Example:

Dev:

```text
RETRY_LIMIT=2
```

Prod:

```text
RETRY_LIMIT=3
```

Different settings possible.

---

# 5. Promotion Path

```text
dev
 -> test
 -> prod
```

Same artifact promoted.

Do not rebuild different binaries.

Important principle.

---

# 6. Release Candidate Flow

Example:

```text
1.0.2-rc1
```

Deploy to test.

Validate.

Promote same image to prod.

---

# 7. Versioned Release Manifest

Example:

```yaml
image: myrepo/payment-service:1.0.2
```

Commit acts as release definition.

---

# 8. Simple Kustomize Style Concept

Apply overlay:

```bash
kubectl apply -k k8s/overlays/dev
```

or

```bash
kubectl apply -k k8s/overlays/prod
```

Clean approach.

---

# 9. Environment Differences

Dev:

* cheaper
* lower replicas
* relaxed scale

Test:

* production-like
* load testing

Prod:

* hardened
* monitored
* controlled releases

---

# 10. Release Checklist Example

Before prod:

✔ tests passed

✔ chaos checks passed

✔ dashboards healthy

✔ no critical alerts

✔ rollback ready

Very useful.

---

# 11. Production Safety Controls

Require:

* approved change
* rollback plan
* health verification

Operational discipline.

---

# 12. Backup / Restore Note

Production package should include runbooks for:

* PostgreSQL restore
* Redis recovery approach
* Kafka recovery approach

Hardening includes recovery.

---

# 13. Example Release Flow

Developer ships:

```text
1.0.2
```

CI builds image.

GitOps updates test.

After validation:

promote same image to prod.

Clean model.

---

# 14. What This Completes

You now have:

✔ Microservices code
✔ Saga
✔ Redis idempotency
✔ Retry + breaker
✔ Outbox
✔ Kubernetes
✔ Observability
✔ GitOps
✔ Chaos testing
✔ Environment packaging

Complete reference implementation path.

---

# 15. Final Architecture Stack

Client
→ Gateway
→ Order Service
→ Inventory Service
→ Payment Service
→ Shipping Service

Backbone:

entity["software","Apache Kafka","Distributed event streaming platform"]

Coordination:

entity["software","Redis","In-memory data store"]

Persistence:

entity["software","PostgreSQL","Relational database"]

Runtime:

entity["software","Kubernetes","Container orchestration platform"]

Visibility:

entity["software","Prometheus","Monitoring toolkit"]

entity["software","Grafana","Observability dashboards"]

entity["software","Jaeger","Distributed tracing system"]

Delivery:

entity["software","Argo CD","GitOps continuous delivery tool"]

Verification:

entity["software","Chaos Mesh","Chaos engineering platform"]

---

# 16. What I Would Improve Next (Real Production)

Natural next upgrades:

* Managed Kafka
* Managed PostgreSQL
* Service mesh with entity["software","Istio","Service mesh"]
* CQRS
* Event sourcing
* Multi-region

Those are advanced evolution layers.

---

# 17. End State

You now have a credible enterprise microservices reference platform blueprint.
