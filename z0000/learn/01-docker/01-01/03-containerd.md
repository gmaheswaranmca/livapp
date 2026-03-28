# 🧠 What is `containerd`?

👉 **`containerd` is a container runtime manager**
👉 It sits **between `dockerd` and low-level runtime (`runc`)**

* It is a **core part of Docker Engine**
* Also used directly by Kubernetes (very important 🔥)

---

## 🧩 Where it fits

```bash
docker (CLI) → dockerd → containerd → runc → container
```

* `dockerd` → high-level control
* **`containerd` → actual container lifecycle manager**
* `runc` → runs the container process

---

# ⚙️ Core Functionalities of `containerd`

## 1. 📦 Container Lifecycle Management

* Create, start, stop, delete containers
* Maintains container state

👉 This is its **primary job**

---

## 2. 🖼️ Image Management

* Pull images from registries
* Store image layers
* Manage image unpacking

---

## 3. 📂 Snapshot & Filesystem Management

* Handles filesystem layers using snapshotters
* Example:

  * overlayfs

---

## 4. 🔄 Task Management

* Converts a container into a **running process (task)**
* Tracks execution

---

## 5. 🔌 gRPC API Server

* Exposes API (used by `dockerd` or Kubernetes)

👉 Unlike `dockerd` (REST),
👉 `containerd` uses **gRPC**

---

## 6. 🔧 Plugin Architecture

Supports plugins for:

* snapshotters
* runtimes
* logging

---

## 7. ⚡ Lightweight & Focused

* Does NOT handle:

  * CLI
  * networking rules
  * full orchestration

👉 Only **core container execution**

---

# 🔄 How `containerd` Works (Step-by-Step)

Let’s take:

```bash
docker run nginx
```

### Flow:

### 1. CLI → `dockerd`

* Request received

---

### 2. `dockerd` → `containerd`

* Delegates container creation

---

### 3. Image Handling

* `containerd`:

  * Pulls image (if needed)
  * Unpacks layers

---

### 4. Create Container

* Prepares filesystem snapshot
* Configures container spec (OCI format)

---

### 5. Calls `runc`

* `runc`:

  * Creates namespaces
  * Applies cgroups
  * Starts process

---

### 6. Task Running

* `containerd`:

  * Tracks process (task)
  * Reports status back to `dockerd`

---

# 🧠 Key Concept: Container vs Task

| Term      | Meaning           |
| --------- | ----------------- |
| Container | Config + metadata |
| Task      | Running process   |

👉 `containerd` manages both

---

# 🔍 Responsibilities Split

| Component        | Role                                           |
| ---------------- | ---------------------------------------------- |
| `dockerd`        | High-level features (API, networking, volumes) |
| **`containerd`** | Core container lifecycle                       |
| `runc`           | Low-level execution                            |

---

# 🚨 Important (Very Useful for You)

👉 Kubernetes **does NOT use `dockerd` anymore**

It uses:

* **`containerd` directly**

That’s why understanding this is 🔥 critical.

---

# 🧩 Simple Analogy

| Component    | Role       |
| ------------ | ---------- |
| `dockerd`    | Manager    |
| `containerd` | Supervisor |
| `runc`       | Worker     |

---

# 🎯 One-Line Summary

👉 **`containerd` is a lightweight container runtime responsible for managing container lifecycle, images, and execution by interacting with low-level runtimes like `runc`.**

