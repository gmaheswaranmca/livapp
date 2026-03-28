### 🧰 What is the **Docker CLI (`docker`)**?

The **Docker CLI** is the **client tool** you use in the terminal.

👉 It does **NOT run containers itself**
👉 It simply **sends commands to `dockerd` (the daemon)**

---

## 🧠 How it fits in Docker Engine

```
docker (CLI)  --->  dockerd (daemon)  --->  containerd  --->  runc
   ↑                   ↑
 user input        actual execution
```

👉 So:

* **CLI = command sender**
* **dockerd = command executor**

---

## ⚙️ Core Functionalities of Docker CLI

### 1. 📦 Container Operations

Commands you use:

```bash
docker run nginx
docker ps
docker stop <id>
docker rm <id>
```

👉 CLI sends request → `dockerd` executes

---

### 2. 🖼️ Image Operations

```bash
docker pull ubuntu
docker build -t myapp .
docker images
docker rmi <image>
```

👉 CLI tells daemon to manage images

---

### 3. 🌐 Network Commands

```bash
docker network create mynet
docker network ls
```

👉 CLI → daemon handles networking

---

### 4. 💾 Volume & Storage

```bash
docker volume create myvol
docker volume ls
```

👉 CLI triggers storage actions via daemon

---

### 5. 📊 Inspection & Debugging

```bash
docker logs <container>
docker inspect <container>
docker stats
```

👉 CLI fetches info from daemon

---

### 6. 🔐 Authentication & Registry

```bash
docker login
docker push myimage
```

👉 CLI communicates with registries (via daemon)

---

### 7. 🧩 Compose & Multi-container (via plugin)

```bash
docker compose up
```

👉 CLI coordinates multiple containers through daemon

---

## 🔄 How Docker CLI Works Internally

Let’s take:

```bash
docker run nginx
```

### Step-by-step flow:

1. 🧑 You type command in terminal
2. 🧰 CLI parses the command
3. 🔌 CLI sends HTTP request to daemon via:

   * Unix socket → `/var/run/docker.sock`
4. 🧠 `dockerd` receives request
5. ⚙️ `dockerd`:

   * pulls image (if needed)
   * calls containerd
   * containerd → runc → starts container
6. 📦 Response sent back to CLI
7. 🖥️ CLI prints output

---

## 🔌 Communication Mechanism

* CLI talks to daemon using **REST API**
* Default endpoint:

  ```bash
  unix:///var/run/docker.sock
  ```

You can even simulate CLI using curl:

```bash
curl --unix-socket /var/run/docker.sock http://localhost/containers/json
```

---

## 🎯 Key Difference

| Component  | Role               |
| ---------- | ------------------ |
| Docker CLI | Sends commands     |
| `dockerd`  | Executes commands  |
| containerd | Manages containers |
| runc       | Runs containers    |

---

## 🧩 Simple Analogy

| Real World     | Docker            |
| -------------- | ----------------- |
| Remote control | Docker CLI        |
| TV system      | dockerd           |
| Hardware       | container runtime |

---

## 🚨 Important Notes

* CLI **cannot work if `dockerd` is not running**
* That’s why you see:

  ```bash
  Cannot connect to the Docker daemon
  ```

---

## 🧠 One-Line Summary

👉 **Docker CLI is the command-line client that sends API requests to `dockerd`, which performs all container operations.**
