# **kubectl + Minikube** 

**WSL Ubuntu (with Docker)** 

---

# ⚙️ 1. Prerequisite Check (IMPORTANT)

Run this first:

```bash
docker ps
```

✔ If it works → good
❌ If not → enable **WSL integration in Docker Desktop**

---

# 🚀 2. Install kubectl

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

chmod +x kubectl
sudo mv kubectl /usr/local/bin/
```

Verify:

```bash
kubectl version --client
```

---

# 🚀 3. Install Minikube

```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64

sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

Verify:

```bash
minikube version
```

---

# 🔥 4. Start Kubernetes Cluster (Core Step)

```bash
minikube start --driver=docker
```

👉 This is the key:

* Uses your Docker inside WSL
* No VM needed
* Lightweight setup

---

# ✅ 5. Verify Cluster

```bash
kubectl get nodes
```

Expected:

```
minikube   Ready   control-plane
```

---

# 🌐 6. First Deployment (Hands-on)

```bash
kubectl create deployment nginx-demo --image=nginx
kubectl expose deployment nginx-demo --type=NodePort --port=80
```

Open in browser:

```bash
minikube service nginx-demo
```

---

# 🧠 7. Understand What Just Happened

You created:

| Component  | Meaning               |
| ---------- | --------------------- |
| Deployment | Manages pods          |
| Pod        | Running container     |
| Service    | Exposes app           |
| NodePort   | Opens port externally |

---

# 🔍 8. Useful Commands (Daily Use)

```bash
kubectl get pods
kubectl get services
kubectl get deployments

kubectl describe pod <pod-name>
kubectl logs <pod-name>

kubectl delete deployment nginx-demo
```

---

# ⚠️ Common WSL Issues (Fixes)

### 🔸 If Minikube fails to start:

```bash
minikube delete
minikube start --driver=docker --force
```

---

### 🔸 If service not opening:

```bash
minikube service nginx-demo --url
```

---

### 🔸 If memory issue:

Increase WSL memory (`.wslconfig`):

```
[wsl2]
memory=4GB
processors=2
```

---

# 🧭 Your Learning Roadmap (Very Important)

Since you're teaching + learning, follow this order:

---

## 🥇 Level 1: Core Concepts

* Pod
* Deployment
* Service
* Namespace

---

## 🥈 Level 2: YAML Mastery

```yaml
apiVersion:
kind:
metadata:
spec:
```

👉 Start writing instead of CLI

---

## 🥉 Level 3: Real Apps

* Node.js app
* React + API
* MySQL inside K8s

---

## 🏆 Level 4: Advanced

* ConfigMap
* Secrets
* Ingress
* Horizontal Scaling

---

# 💡 Pro Tip (Very Important)

Instead of always using CLI:

👉 Do this:

```bash
kubectl create deployment test --image=nginx --dry-run=client -o yaml
```

➡️ Convert commands → YAML → learn faster
