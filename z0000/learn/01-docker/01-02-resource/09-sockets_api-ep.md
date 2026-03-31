Now you’re asking about the **control plane of Docker Engine** — this is how *everything is operated*. Let’s break down **Sockets & API Endpoints** clearly 👇

---

# 🔌 Sockets & API Endpoints in Docker Engine

## 🔹 What are Sockets & API Endpoints?

They are the **communication interface to Docker Engine**.

👉 Instead of directly interacting with containers, you talk to Docker via:

* **Sockets (connection channel)**
* **REST API endpoints (commands over HTTP)**

---

## 🔹 Where it exists in Engine?

Inside Docker:

* **Docker CLI (`docker`)** → what you type
* **Docker Daemon (`dockerd`)** → backend service
* **Docker API (REST API)** → command interface
* **Socket (Unix / TCP)** → communication path

---

## 🔹 How Communication Works

### Flow:

```
docker run nginx
   ↓
Docker CLI
   ↓
Socket (/var/run/docker.sock)
   ↓
Docker Daemon (dockerd)
   ↓
Container Runtime (runc)
   ↓
Container Created
```

👉 CLI never directly creates containers
👉 It sends API requests to daemon

---

## 🔹 Types of Sockets

### 1️⃣ Unix Socket (Default – Linux)

```bash id="1b8x7n"
/var/run/docker.sock
```

✔ Fast
✔ Secure (file permissions)
✔ Local communication only

---

### 2️⃣ TCP Socket (Remote Access)

```bash id="2k9zpl"
tcp://0.0.0.0:2375
```

✔ Used for:

* Remote Docker control
* CI/CD tools
* Cloud systems

⚠️ Needs TLS for security

---

## 🔹 API Endpoints (Core Functionalities)

Docker exposes a **REST API**.

---

### 1️⃣ Container Management

```bash id="v3k9ls"
POST /containers/create
POST /containers/start
POST /containers/stop
GET  /containers/json
```

👉 Used for:

* Create container
* Start/stop
* List containers

---

### 2️⃣ Image Management

```bash id="x2l8dq"
GET  /images/json
POST /images/create
DELETE /images/{id}
```

👉 Pull, list, delete images

---

### 3️⃣ Volume Management

```bash id="p9w2ne"
GET /volumes
POST /volumes/create
```

---

### 4️⃣ Network Management

```bash id="r8m1qa"
GET /networks
POST /networks/create
```

---

### 5️⃣ System Info

```bash id="z7y3kd"
GET /info
GET /version
```

---

## 🔹 Real Example (Behind the Scenes)

When you run:

```bash id="j4k8pl"
docker ps
```

👉 Internally:

```
GET /containers/json
```

👉 Sent via socket → daemon → response returned

---

## 🔹 What Docker Engine is Doing Internally

1. CLI sends HTTP request
2. Request goes through socket
3. Docker daemon:

   * Validates request
   * Calls container runtime
   * Manages state
4. Returns response

👉 Docker Engine acts like a **server**

---

## 🔹 Why It’s Important

### ✅ Automation

* Tools like Jenkins, Kubernetes use API

### ✅ Remote Management

* Control Docker from another machine

### ✅ Integration

* Build your own tools using API

---

## 🔹 Real-Time Analogy

Think of Docker like a **restaurant system**:

* CLI = customer
* Socket = waiter
* API = menu
* Docker daemon = kitchen

👉 Customer never cooks directly
👉 Orders go through waiter

---

## 🔹 Security Aspect ⚠️

### Important:

* Access to socket = **FULL CONTROL over Docker**
* Equivalent to **root access**

👉 That’s why:

* `/var/run/docker.sock` is protected
* TCP requires TLS

---

## 🔹 Monitoring / Testing API

You can even test manually:

```bash id="y6x8pm"
curl --unix-socket /var/run/docker.sock http://localhost/containers/json
```

---

## 🔹 Summary

| Component     | Role                  |
| ------------- | --------------------- |
| Socket        | Communication channel |
| REST API      | Commands interface    |
| Docker CLI    | User input            |
| Docker Daemon | Execution             |
| Runtime       | Container creation    |

---

## 🔹 Final Understanding

👉 Docker Engine = **API Server + Resource Manager**
👉 All operations happen via **Sockets + REST API**
