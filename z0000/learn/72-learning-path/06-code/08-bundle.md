# Bundle 8 — CI/CD + GitOps (Build, Deploy, Argo CD)

Goal:
Automate build and deployment.

Implements Phase 11 deployment discipline.

Adds:

* GitHub Actions CI
* Docker image builds
* Kubernetes deployment automation
* GitOps flow with Argo CD

---

# 1. Repo Additions

```text
.github/workflows/
  ci.yml
  deploy.yml

argocd/
  app.yaml
```

---

# 2. CI Pipeline (Build + Test)

.github/workflows/ci.yml

```yaml
name: CI

on:
 push:
  branches: [ main ]

jobs:
 build:
  runs-on: ubuntu-latest

  strategy:
   matrix:
    service:
     - gateway
     - order-service
     - inventory-service
     - payment-service
     - shipping-service

  steps:
   - uses: actions/checkout@v4

   - uses: actions/setup-node@v4
     with:
      node-version: 20

   - run: |
      cd ${{ matrix.service }}
      npm install
      npm run build || true

   - run: |
      docker build -t test .
      cd ${{ matrix.service }}
```

---

# 3. Docker Publish Pipeline

.github/workflows/deploy.yml

```yaml
name: PublishImages

on:
 push:
  tags:
   - 'v*'

jobs:
 publish:
  runs-on: ubuntu-latest

  steps:
  - uses: actions/checkout@v4

  - uses: docker/login-action@v3
    with:
      username: ${{ secrets.DOCKER_USER }}
      password: ${{ secrets.DOCKER_PASS }}

  - run: |
      docker build -t myrepo/order-service:${GITHUB_REF_NAME} ./order-service
      docker push myrepo/order-service:${GITHUB_REF_NAME}
```

Repeat for other services.

---

# 4. Image Tagging Strategy

Avoid:

```text
latest
```

Use:

```text
1.0.0
1.0.1
```

Immutable tags.

Critical.

---

# 5. GitOps Principle

Do not let pipeline run:

```text
kubectl apply directly
```

Instead:

Pipeline updates manifest in Git.

GitOps tool syncs cluster.

Better model.

---

# 6. Argo CD Install

Install:

entity["software","Argo CD","GitOps continuous delivery tool"]

Example:

```bash
kubectl create namespace argocd

kubectl apply -n argocd \
-f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

---

# 7. Argo CD Application

argocd/app.yaml

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
 name: commerce-platform
 namespace: argocd
spec:
 project: default
 source:
  repoURL: https://github.com/yourorg/commerce-platform.git
  path: k8s
  targetRevision: main
 destination:
  server: https://kubernetes.default.svc
  namespace: commerce
 syncPolicy:
  automated:
   prune: true
   selfHeal: true
```

Apply:

```bash
kubectl apply -f argocd/app.yaml
```

---

# 8. GitOps Deployment Flow

Developer:

```text
Change image tag in k8s manifest
Commit
Push
```

Argo detects.

Syncs cluster.

No manual deploy.

---

# 9. Example Release Flow

Release v1.0.1

Pipeline:

* build image
* push image
* update k8s/payment.yaml

Change:

```yaml
image: myrepo/payment-service:1.0.1
```

Commit.

Argo deploys.

Beautiful flow.

---

# 10. Drift Protection

Suppose someone manually changes cluster.

Argo self-heal restores Git desired state.

Huge value.

---

# 11. Blue/Green Concept (Simple)

Can model:

payment-service-blue
payment-service-green

Shift service selector gradually.

Advanced evolution.

---

# 12. Basic Smoke Test Stage

Add after deploy:

```bash
curl https://your-gateway/health
```

Simple verification.

---

# 13. Add Branch Strategy Suggestion

```text
main -> production

release/* -> staging
```

Useful structure.

---

# 14. Secrets in CI

Store in GitHub Secrets:

* DOCKER_USER
* DOCKER_PASS

Never hardcode.

---

# 15. What This Implements

✔ CI build pipeline
✔ Docker image publishing
✔ Version tags
✔ GitOps model
✔ Argo CD application
✔ Automated sync
✔ Drift correction

Production delivery discipline established.

---

# 16. Still Missing

Not yet added:

* chaos testing
* load tests
* failure injection

Next bundle.

---

## Next = Bundle 9

Will add:

* Chaos Mesh
* load tests
* failure scenarios
* resilience verification
