# Bundle 7 — Observability Stack (Prometheus + Grafana + Jaeger + Instrumentation)

Goal:
Implement Phase 10 observability.

Adds:

* Metrics collection
* Dashboards
* Distributed tracing
* Alerts foundation
* Service instrumentation

Uses:

* Prometheus
* Grafana
* Jaeger

---

# 1. Add Metrics Library

In services:

```bash
npm install prom-client
```

---

# 2. Add Basic Metrics Instrumentation

Example in order-service/src/metrics.ts

```typescript
import client from 'prom-client';

export const register = new client.Registry();

client.collectDefaultMetrics({ register });

export const orderCounter = new client.Counter({
 name:'orders_created_total',
 help:'Total orders created'
});

export const paymentRetryCounter = new client.Counter({
 name:'payment_retry_total',
 help:'Total payment retries'
});

register.registerMetric(orderCounter);
register.registerMetric(paymentRetryCounter);
```

---

# 3. Expose /metrics Endpoint

In service index.ts:

```typescript
import {register,orderCounter} from './metrics';

app.get('/metrics', async(req,res)=>{
 res.set('Content-Type',register.contentType);
 res.end(await register.metrics());
});
```

Increment on order creation:

```typescript
orderCounter.inc();
```

---

# 4. Prometheus Config

k8s/prometheus-config.yaml

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
 name: prometheus-config
 namespace: commerce
data:
 prometheus.yml: |
   global:
     scrape_interval: 15s
   scrape_configs:
    - job_name: order-service
      static_configs:
       - targets:
         - order-service:5000

    - job_name: payment-service
      static_configs:
       - targets:
         - payment-service:5002
```

---

# 5. Prometheus Deployment

k8s/prometheus.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: prometheus
 namespace: commerce
spec:
 replicas:1
 selector:
  matchLabels:
   app: prometheus
 template:
  metadata:
   labels:
    app: prometheus
  spec:
   containers:
   - name: prometheus
     image: prom/prometheus
     ports:
      - containerPort:9090
     volumeMounts:
      - name: config
        mountPath: /etc/prometheus
   volumes:
    - name: config
      configMap:
       name: prometheus-config
---
apiVersion: v1
kind: Service
metadata:
 name: prometheus
 namespace: commerce
spec:
 selector:
  app: prometheus
 ports:
 - port:9090
```

---

# 6. Grafana Deployment

k8s/grafana.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: grafana
 namespace: commerce
spec:
 replicas:1
 selector:
  matchLabels:
   app:grafana
 template:
  metadata:
   labels:
    app:grafana
  spec:
   containers:
   - name:grafana
     image:grafana/grafana
     ports:
      - containerPort:3000
---
apiVersion: v1
kind: Service
metadata:
 name:grafana
 namespace:commerce
spec:
 selector:
  app:grafana
 ports:
 - port:3000
```

---

# 7. Add Grafana Dashboard Panels

Create panels for:

```text
orders_created_total

payment_retry_total
```

Later add:

* DLQ count
* circuit open count
* consumer lag

---

# 8. Add Trace Library

Install:

```bash
npm install @opentelemetry/api
```

(keeping minimal for learning)

---

# 9. Simple Trace Context Propagation

At request entry:

```typescript
const traceId='TRACE-'+Date.now();
```

Pass in headers:

```typescript
headers:{
 'x-trace-id':traceId
}
```

For events include:

```json
traceId:"TRACE-123"
```

Use same through saga.

---

# 10. Jaeger Deployment

k8s/jaeger.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: jaeger
 namespace: commerce
spec:
 replicas:1
 selector:
  matchLabels:
   app: jaeger
 template:
  metadata:
   labels:
    app: jaeger
  spec:
   containers:
   - name: jaeger
     image: jaegertracing/all-in-one
     ports:
      - containerPort:16686
---
apiVersion: v1
kind: Service
metadata:
 name: jaeger
 namespace: commerce
spec:
 selector:
  app: jaeger
 ports:
 - port:16686
```

---

# 11. Structured Logging

Replace random logs.

Use:

```typescript
console.log(JSON.stringify({
 orderId:e.orderId,
 event:e.eventType,
 correlationId:e.correlationId,
 traceId:e.traceId
}));
```

Important.

---

# 12. Alert Example (Prometheus Rule)

k8s/alerts.yaml

```yaml
groups:
- name: commerce
  rules:
  - alert: HighPaymentRetry
    expr: payment_retry_total > 10
```

Foundation.

---

# 13. Saga Metrics

Add:

```typescript
new client.Gauge({
 name:'sagas_compensating',
 help:'Sagas compensating'
});
```

Track stuck workflows.

---

# 14. Apply

```bash
kubectl apply -f k8s/prometheus-config.yaml
kubectl apply -f k8s/prometheus.yaml
kubectl apply -f k8s/grafana.yaml
kubectl apply -f k8s/jaeger.yaml
```

---

# 15. Access

Port-forward:

```bash
kubectl port-forward svc/prometheus 9090:9090 -n commerce

kubectl port-forward svc/grafana 3000:3000 -n commerce

kubectl port-forward svc/jaeger 16686:16686 -n commerce
```

---

# 16. Verify Metrics

```bash
curl http://localhost:5000/metrics
```

Should show:

```text
orders_created_total
```

---

# 17. What This Implements

✔ Metrics instrumentation
✔ Prometheus scraping
✔ Grafana dashboards
✔ Trace propagation foundation
✔ Jaeger deployment
✔ Structured logs
✔ Alert rule example

Observability layer established.

---

# 18. Still Missing

Not yet added:

* CI/CD pipeline
* GitOps deployment flow
* Argo CD
* Chaos testing

---

## Next = Bundle 8

Will add:

* GitHub Actions
* image build pipeline
* deployment pipeline
* Argo CD GitOps flow
