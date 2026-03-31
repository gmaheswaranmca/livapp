### ✅ `dockerd` — Daemon or Engine?

**Short answer:**
👉 **`dockerd` is the Docker *daemon***
👉 It is the **core process of the Docker Engine**

So:

* **Docker Engine** = Full system (CLI + API + daemon + runtime)
* **`dockerd`** = The **daemon inside the engine** (the brain doing all work)

---

## 🧠 Architecture (simple view)

```
docker (CLI)  --->  dockerd (daemon)  --->  containerd  --->  runc
   ↑                    ↑
 user              core engine
```

---

## ⚙️ Core Functionalities of `dockerd`

### 1. 📦 Container Management

* Create, start, stop, restart, delete containers
* Example:

  ```bash
  docker run nginx
  ```

  👉 `dockerd` actually creates and runs the container

---

### 2. 🖼️ Image Management

* Pull images from Docker Hub
* Build images from Dockerfile
* Store images locally

---

### 3. 🌐 Networking

* Creates Docker networks (bridge, host, overlay)
* Assigns IPs to containers
* Handles port mapping (`-p 8080:80`)

---

### 4. 💾 Storage & Volumes

* Manages volumes and bind mounts
* Uses storage drivers (like `overlay2`)
* Ensures container data persistence

---

### 5. 🔌 API Server

* Exposes REST API (Unix socket or TCP)
* Docker CLI communicates via this API

Example:

```
/var/run/docker.sock
```

---

### 6. 🔄 Container Lifecycle Management

* Tracks container state (running, stopped, paused)
* Handles restart policies

---

### 7. 🔐 Security & Isolation

* Uses namespaces & cgroups
* Controls CPU, memory limits

---

### 8. ⚙️ Orchestration Basics (Standalone)

* Handles multi-container setups via Docker Compose (indirectly)
* Works with Swarm mode (if enabled)

---

### 9. 🔧 Plugin & Extension Support

* Volume plugins
* Network plugins

---

## 🔍 What Happens Internally

When you run:

```bash
docker run ubuntu
```

👉 Flow:

1. CLI sends request to `dockerd`
2. `dockerd`:

   * Pulls image (if not present)
   * Calls **containerd**
   * containerd uses **runc**
3. Container starts

---

## 🎯 Final Understanding

| Term          | Meaning                    |
| ------------- | -------------------------- |
| Docker Engine | Full Docker system         |
| `dockerd`     | Core daemon (main service) |
| containerd    | Container manager          |
| runc          | Low-level runtime          |

---

## 🧩 One-Line Summary

👉 **`dockerd` is the central daemon of Docker Engine responsible for managing containers, images, networks, and storage.**
