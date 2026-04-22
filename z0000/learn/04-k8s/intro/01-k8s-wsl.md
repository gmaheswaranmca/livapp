# 🔥 Best Options to Run Kubernetes in WSL (Ubuntu)

## ✅ Option 1: Use Minikube (Recommended for learning)

👉 This is the easiest and most flexible setup.

### 🧠 Why Minikube?

* Runs a single-node Kubernetes cluster
* Works well with Docker
* Supports WSL

---

### ⚙️ Step-by-step Installation

### 1. Install kubectl (K8s CLI)

```bash
sudo apt update
sudo apt install -y curl

curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

chmod +x kubectl
sudo mv kubectl /usr/local/bin/
```

Check:

```bash
kubectl version --client
```

---

### 2. Install Minikube

```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

Check:

```bash
minikube version
```

---

### 3. Start Kubernetes Cluster (IMPORTANT)

Since you already have Docker:

```bash
minikube start --driver=docker

# or 
# a very common Minikube + Docker + WSL issue
#   Docker driver should NOT be used as root
#       Why this happens
#       - The Docker driver expects a non-root user
#       - Running with sudo = root → ❌ blocked for safety reasons
# Solution (Recommended)
#   Exit root
#   $ exit
# Add your user to docker group # Run this without sudo:
sudo usermod -aG docker $USER
# Apply group changes
newgrp docker
# Verify Docker works without sudo
docker ps 
minikube start --driver=docker
# Or
# Alternative (Not Recommended but works): If you really want to run as root:
minikube start --driver=docker --force
```

👉 This uses Docker as the runtime inside WSL.

---

### 4. Verify Cluster

```bash
kubectl get nodes 
```

You should see:

```
NAME       STATUS   ROLES           AGE   VERSION
minikube   Ready    control-plane   ...
```

---

### 5. Deploy First App 🚀

```bash
kubectl create deployment hello --image=nginx
kubectl expose deployment hello --type=NodePort --port=80
```

Access:

```bash
minikube service hello
```

---

## ✅ Option 2: Use Kind (Best for real cluster simulation)

👉 Kind = Kubernetes IN Docker

### 🧠 Why Kind?

* Runs **real multi-node clusters**
* Used in CI/CD pipelines
* Closer to production than Minikube

---

### Install Kind

```bash
curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

---

### Create Cluster

```bash
kind create cluster
```

---

### Verify

```bash
kubectl cluster-info
```

---

## ✅ Option 3: Enable Kubernetes in Docker Desktop (Easiest UI way)

👉 If you are okay using Windows UI

* Open Docker Desktop
* Settings → Kubernetes → Enable

✔ Pros:

* Zero setup
* GUI support

❌ Cons:

* Less control
* Heavier

---

# ⚡ WSL-Specific Tips (Important)

### 🔸 1. Ensure Docker works inside WSL

```bash
docker ps
```

If not → enable WSL integration in Docker Desktop

---

### 🔸 2. Increase WSL resources

Edit `.wslconfig` (Windows side):

```
[wsl2]
memory=4GB
processors=2
```

---

### 🔸 3. Avoid systemd issues

If Minikube fails:

```bash
minikube start --driver=docker --container-runtime=docker
```

---

# 🧠 Which One Should You Choose?

| Goal                  | Best Tool        |
| --------------------- | ---------------- |
| Beginner / Learning   | ✅ Minikube       |
| Real cluster behavior | ✅ Kind           |
| Easiest setup         | ✅ Docker Desktop |

---

# 🚀 My Recommendation (for you)

Since you're:

* already using Docker
* teaching / learning backend + DevOps

👉 Go with:
👉 **Minikube first → then Kind**
