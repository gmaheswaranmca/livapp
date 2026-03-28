## 🧠 What is **`runc`**?

👉 **`runc` is a low-level container runtime**
👉 It is the **actual tool that creates and runs containers at OS level**

* Implements the **OCI Runtime Specification**
* Used by both Docker and Kubernetes (via containerd)

---

## 🧩 Where `runc` fits in Docker Engine

```bash
docker (CLI) → dockerd → containerd → runc → container (process)
```

* `dockerd` → high-level manager
* `containerd` → lifecycle manager
* **`runc` → actual execution (VERY LOW LEVEL)**

---

## ⚙️ Core Functionalities of `runc`

### 1. 🚀 Container Creation (Main Job)

* Creates containers from OCI bundle
* Sets up environment to run process

👉 This is its **primary responsibility**

---

### 2. 🔐 Isolation (Namespaces)

`runc` sets Linux namespaces:

* PID → separate process tree
* NET → separate network
* MNT → filesystem isolation
* IPC → inter-process communication
* UTS → hostname isolation

---

### 3. 📊 Resource Control (cgroups)

* Limits CPU, memory, I/O
* Example:

  * 512MB RAM limit
  * CPU shares

---

### 4. 📂 Filesystem Setup

* Mounts root filesystem
* Applies read/write layers
* Uses snapshot prepared by `containerd`

---

### 5. ▶️ Process Execution

* Starts the container’s main process
* Example:

  ```bash
  nginx
  node app.js
  ```

---

### 6. 🔄 Lifecycle Hooks

* Start container
* Pause / Resume
* Delete container

---

## 🔄 How `runc` Works (Step-by-Step)

Let’s take:

```bash
docker run nginx
```

### Flow:

### 1. CLI → `dockerd`

* Command initiated

---

### 2. `dockerd` → `containerd`

* Delegates work

---

### 3. `containerd` prepares:

* Root filesystem
* OCI config (`config.json`)

---

### 4. `containerd` calls `runc`

👉 Now **`runc` takes control**

---

### 5. `runc` does:

* Applies namespaces
* Applies cgroups
* Mounts filesystem
* Sets container environment

---

### 6. Starts Process

👉 Example:

```bash
nginx
```

---

### 7. Container is Running

* `runc` exits after starting
* `containerd` continues monitoring

---

## 🧠 Important Concept

👉 **`runc` is NOT a long-running service**

* It runs → creates container → exits
* Unlike:

  * `dockerd` (daemon)
  * `containerd` (daemon)

---

## 🔍 Responsibilities Split

| Component    | Role                |
| ------------ | ------------------- |
| `dockerd`    | API + management    |
| `containerd` | lifecycle manager   |
| **`runc`**   | container execution |
| container    | actual process      |

---

## 🧩 Simple Analogy

| Component    | Role                     |
| ------------ | ------------------------ |
| `dockerd`    | Manager                  |
| `containerd` | Supervisor               |
| **`runc`**   | Worker who builds & runs |
| container    | final running app        |

---

## 🚨 Key Points

* `runc` directly interacts with:

  * Linux kernel
* Uses:

  * namespaces + cgroups
* Follows:

  * OCI standard

---

## 🎯 One-Line Summary

👉 **`runc` is the low-level runtime that creates and starts containers by applying isolation (namespaces) and resource limits (cgroups) based on OCI specifications.**

---

## 🔥 Pro Insight 

👉 Without `runc`, containers cannot run
👉 Without `containerd`, lifecycle cannot be managed
👉 Without `dockerd`, user cannot control system easily
