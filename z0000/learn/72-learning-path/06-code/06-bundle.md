# Bundle 6 — Kubernetes Manifests (Deployments, Services, Probes, HPA, Config)

Goal:
Deploy the platform onto Kubernetes.

Implements Phase 9.

Includes:

* Namespace
* ConfigMap
* Secret
* Deployments
* Services
* Probes
* HPA
* Apply commands

Assume images are pushed to a registry.
Example image names:

```text
myrepo/gateway:1.0.0
myrepo/order-service:1.0.0
myrepo/inventory-service:1.0.0
myrepo/payment-service:1.0.0
myrepo/shipping-service:1.0.0
```

---

# 1. Directory

```text
k8s/
  namespace.yaml
  configmap.yaml
  secret.yaml
  gateway.yaml
  order.yaml
  inventory.yaml
  payment.yaml
  shipping.yaml
  hpa-payment.yaml
```

---

# 2. namespace.yaml

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: commerce
```

---

# 3. configmap.yaml

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: commerce-config
  namespace: commerce
data:
  KAFKA_BROKER: kafka:9092
  REDIS_HOST: redis
  RETRY_LIMIT: "3"
```

---

# 4. secret.yaml

(base64 values replace placeholders)

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: commerce-secret
  namespace: commerce
type: Opaque
data:
  DB_USER: YXBwdXNlcg==
  DB_PASSWORD: YXBwcGFzc3dvcmQ=
```

---

# 5. gateway.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: gateway
 namespace: commerce
spec:
 replicas: 2
 selector:
   matchLabels:
     app: gateway
 template:
   metadata:
     labels:
       app: gateway
   spec:
     containers:
      - name: gateway
        image: myrepo/gateway:1.0.0
        ports:
         - containerPort: 8080
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 5
---
apiVersion: v1
kind: Service
metadata:
 name: gateway
 namespace: commerce
spec:
 type: LoadBalancer
 selector:
   app: gateway
 ports:
  - port: 80
    targetPort: 8080
```

---

# 6. order.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: order-service
 namespace: commerce
spec:
 replicas: 2
 selector:
   matchLabels:
     app: order-service
 template:
   metadata:
     labels:
       app: order-service
   spec:
     containers:
      - name: order-service
        image: myrepo/order-service:1.0.0
        ports:
         - containerPort: 5000
        envFrom:
         - configMapRef:
             name: commerce-config
         - secretRef:
             name: commerce-secret
        livenessProbe:
          httpGet:
            path: /health
            port: 5000
        readinessProbe:
          httpGet:
            path: /health
            port: 5000
        resources:
          requests:
            cpu: "200m"
            memory: "256Mi"
          limits:
            cpu: "500m"
            memory: "512Mi"
---
apiVersion: v1
kind: Service
metadata:
 name: order-service
 namespace: commerce
spec:
 selector:
   app: order-service
 ports:
  - port: 5000
    targetPort: 5000
```

---

# 7. inventory.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: inventory-service
 namespace: commerce
spec:
 replicas: 2
 selector:
   matchLabels:
     app: inventory-service
 template:
   metadata:
     labels:
       app: inventory-service
   spec:
     containers:
      - name: inventory-service
        image: myrepo/inventory-service:1.0.0
        ports:
         - containerPort: 5001
        livenessProbe:
          httpGet:
            path: /health
            port: 5001
        readinessProbe:
          httpGet:
            path: /health
            port: 5001
---
apiVersion: v1
kind: Service
metadata:
 name: inventory-service
 namespace: commerce
spec:
 selector:
   app: inventory-service
 ports:
  - port: 5001
    targetPort: 5001
```

---

# 8. payment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: payment-service
 namespace: commerce
spec:
 replicas: 3
 selector:
   matchLabels:
     app: payment-service
 template:
   metadata:
     labels:
       app: payment-service
   spec:
     containers:
      - name: payment-service
        image: myrepo/payment-service:1.0.0
        ports:
         - containerPort: 5002
        livenessProbe:
          httpGet:
            path: /health
            port: 5002
        readinessProbe:
          httpGet:
            path: /health
            port: 5002
---
apiVersion: v1
kind: Service
metadata:
 name: payment-service
 namespace: commerce
spec:
 selector:
   app: payment-service
 ports:
  - port: 5002
    targetPort: 5002
```

---

# 9. shipping.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: shipping-service
 namespace: commerce
spec:
 replicas: 2
 selector:
   matchLabels:
     app: shipping-service
 template:
   metadata:
     labels:
       app: shipping-service
   spec:
     containers:
      - name: shipping-service
        image: myrepo/shipping-service:1.0.0
        ports:
         - containerPort: 5003
        livenessProbe:
          httpGet:
            path: /health
            port: 5003
        readinessProbe:
          httpGet:
            path: /health
            port: 5003
---
apiVersion: v1
kind: Service
metadata:
 name: shipping-service
 namespace: commerce
spec:
 selector:
   app: shipping-service
 ports:
  - port: 5003
    targetPort: 5003
```

---

# 10. Payment HPA

hpa-payment.yaml

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
 name: payment-hpa
 namespace: commerce
spec:
 scaleTargetRef:
   apiVersion: apps/v1
   kind: Deployment
   name: payment-service
 minReplicas: 3
 maxReplicas: 10
 metrics:
 - type: Resource
   resource:
     name: cpu
     target:
       type: Utilization
       averageUtilization: 70
```

---

# 11. Redis (simple dev manifest)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: redis
 namespace: commerce
spec:
 replicas: 1
 selector:
   matchLabels:
     app: redis
 template:
   metadata:
     labels:
       app: redis
   spec:
     containers:
      - name: redis
        image: redis:7
---
apiVersion: v1
kind: Service
metadata:
 name: redis
 namespace: commerce
spec:
 selector:
   app: redis
 ports:
  - port: 6379
```

---

# 12. Kafka Note

For production Kafka use operator/managed cluster.
For learning you can deploy later via Strimzi or managed.
For now assume broker reachable as:

```text
kafka:9092
```

---

# 13. Apply

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/
```

---

# 14. Verify

```bash
kubectl get pods -n commerce

kubectl get svc -n commerce
```

---

# 15. Test Self-Healing

Delete a payment pod:

```bash
kubectl delete pod <payment-pod-name> -n commerce
```

Deployment should recreate it.

Phase 9 self-healing verified.

---

# 16. Test Scaling

```bash
kubectl get hpa -n commerce
```

Generate load.

Payment pods should scale.

---

# 17. Rolling Update

Change image:

```bash
kubectl set image deployment/payment-service \
payment-service=myrepo/payment-service:1.0.1 \
-n commerce
```

Rollback:

```bash
kubectl rollout undo deployment/payment-service -n commerce
```

---

# 18. What This Implements

✔ Deployments
✔ Services
✔ Liveness probes
✔ Readiness probes
✔ HPA
✔ ConfigMap
✔ Secret
✔ Rolling updates
✔ Rollback

Kubernetes runtime established.

---

# 19. Still Missing

Not yet added:

* Prometheus
* Grafana
* Jaeger
* instrumentation
* dashboards

Next = observability stack.

---

## Next = Bundle 7

Will add:

* Prometheus manifests
* Grafana setup
* Jaeger tracing
* service instrumentation
* dashboards
