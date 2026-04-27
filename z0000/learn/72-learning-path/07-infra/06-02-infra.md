## Proposal (Two 4-Logical-Processor Machines)

## Machine 1 — Application Workloads

| Service                           | CPU Request | CPU Limit | RAM Request | RAM Limit |
| --------------------------------- | ----------: | --------: | ----------: | --------: |
| API Gateway                       |        250m |      500m |       512Mi |       1Gi |
| Order Service                     |        250m |      500m |       512Mi |       1Gi |
| Inventory Service                 |        250m |      500m |       512Mi |       1Gi |
| Payment Service                   |        250m |      500m |       512Mi |       1Gi |
| Shipping Service                  |        250m |      500m |       512Mi |       1Gi |
| Redis                             |        250m |      500m |       512Mi |       1Gi |
| PostgreSQL                        |        500m |     1000m |         2Gi |       3Gi |
| Apache Kafka *(optional phase 2)* |        500m |     1000m |         2Gi |       3Gi |

### Capacity (Without Kafka)

* CPU requested: ~2 cores
* RAM requested: ~5 GiB
* Safe on 4 logical processors / 12 GB

### Capacity (With Kafka)

* CPU requested: ~2.5 cores
* RAM requested: ~7 GiB
* Still fits

---

## Machine 2 — Monitoring Workloads

| Service       | CPU Request | CPU Limit | RAM Request | RAM Limit |
| ------------- | ----------: | --------: | ----------: | --------: |
| Prometheus    |        500m |     1000m |         1Gi |       2Gi |
| Grafana       |        250m |      500m |       512Mi |       1Gi |
| Jaeger        |        500m |     1000m |         1Gi |       2Gi |
| Loki          |        500m |     1000m |         1Gi |       2Gi |
| Node Exporter |        100m |      200m |       128Mi |     256Mi |
| cAdvisor      |        100m |      200m |       128Mi |     256Mi |

### Capacity

* CPU requested: ~1.95 cores
* RAM requested: ~3.75 GiB

Fits comfortably.

---

# Storage (Important)

Reserve:

| Component    | Disk     |
| ------------ | -------- |
| PostgreSQL   | 20–30 GB |
| Apache Kafka | 20 GB    |
| Prometheus   | 10 GB    |
| Loki         | 10 GB    |

---

## Suggested Replica Count

With your hardware:

* All microservices: 1 replica each
* Kafka: 1 broker
* PostgreSQL: 1 instance
* Redis: 1 instance
* Monitoring tools: 1 each

No horizontal scaling yet.

---

## Final Proposed Layout

### Laptop 1

7 containers initially
8 with Kafka

### Laptop 2

6 monitoring containers

**Total: 13–14 containers across both machines**

That is a realistic capacity plan for your hardware.
