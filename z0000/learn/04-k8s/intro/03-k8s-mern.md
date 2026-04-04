# 🧠 1. MERN on Kubernetes — Architecture

![Image](https://miro.medium.com/1%2AD4D9a2cq7uv2pgf_KH2rgw.jpeg)

![Image](https://miro.medium.com/v2/resize%3Afit%3A1400/1%2AS_YmlHDJafrz9oBZWa2inA.png)

![Image](https://miro.medium.com/v2/resize%3Afit%3A1400/1%2Ag5zMZD8J5x7qd_JNco1NAg.png)

![Image](https://miro.medium.com/v2/resize%3Afit%3A959/1%2A1XJj7H00paHSB5QJshvtwA.png)

### 🔷 Components

| Layer    | Tech         | K8s Object                               |
| -------- | ------------ | ---------------------------------------- |
| Frontend | React        | Deployment + Service                     |
| Backend  | Node/Express | Deployment + Service                     |
| Database | MongoDB      | StatefulSet (or Deployment for learning) |
| Storage  | Volume       | PersistentVolume + PVC                   |
| Routing  | Ingress      | Ingress Controller                       |

---

# ⚙️ 2. Step-by-Step Plan (High-Level)

## ✅ Step 1: Dockerize All Components

You need 3 images:

### 🔹 React

```dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm install && npm run build
CMD ["npx","serve","-s","build"]
```

---

### 🔹 Node (Backend)

```dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
CMD ["node","server.js"]
```

---

### 🔹 MongoDB

👉 Use official image:
👉 MongoDB

---

## ✅ Step 2: Use Minikube Docker

VERY IMPORTANT 👇

```bash
eval $(minikube docker-env)
```

👉 This ensures:

* Images build directly inside Minikube
* No need to push to Docker Hub

---

## ✅ Step 3: Build Images

```bash
docker build -t mern-frontend .
docker build -t mern-backend .
```

---

# 🧩 3. Kubernetes YAML Design

---

## 🔹 MongoDB (with storage)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongo
  template:
    metadata:
      labels:
        app: mongo
    spec:
      containers:
      - name: mongo
        image: mongo
        ports:
        - containerPort: 27017
```

---

### Service

```yaml
kind: Service
apiVersion: v1
metadata:
  name: mongo
spec:
  selector:
    app: mongo
  ports:
    - port: 27017
```

---

## 🔹 Backend

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: mern-backend
        ports:
        - containerPort: 5000
        env:
        - name: MONGO_URI
          value: mongodb://mongo:27017/mydb
```

---

### Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: backend
spec:
  selector:
    app: backend
  ports:
    - port: 5000
```

---

## 🔹 Frontend

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: mern-frontend
        ports:
        - containerPort: 3000
```

---

### Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend
spec:
  type: NodePort
  selector:
    app: frontend
  ports:
    - port: 3000
      nodePort: 30007
```

---

# 🌐 4. Apply Everything

```bash
kubectl apply -f mongo.yaml
kubectl apply -f backend.yaml
kubectl apply -f frontend.yaml
```

---

# 🔍 5. Access App

```bash
minikube service frontend
```

---

# 🧠 6. Key Concepts You’re Practicing

| Concept             | Where                |
| ------------------- | -------------------- |
| Service discovery   | `mongo` hostname     |
| Scaling             | replicas             |
| Networking          | internal cluster DNS |
| Isolation           | pods                 |
| Deployment strategy | rolling updates      |

---

# ⚡ 7. Next-Level Improvements (IMPORTANT)

Once basic works, upgrade to:

### 🔥 Add Persistent Storage

* PersistentVolume (PV)
* PersistentVolumeClaim (PVC)

---

### 🔥 Add Ingress

* Single URL for frontend + backend

---

### 🔥 Use ConfigMap + Secrets

* Store DB URL securely

---

### 🔥 Switch Mongo → StatefulSet

* Real production setup

---

# 🚀 Suggested Learning Flow (for you)

1. ✅ Run basic MERN (above)
2. ✅ Break something → debug (important skill)
3. ✅ Add volume (data persistence)
4. ✅ Add Ingress (real-world routing)
5. ✅ Scale backend pods

---

# 💡 Real Advice (Important)

Don’t try to make it “production perfect” immediately.

👉 First goal:

> “Frontend → Backend → Mongo working inside cluster”

Then evolve step-by-step.
