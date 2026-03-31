## ⚙️ CPU Resources (cgroups) — as a **Docker Engine Resource**

CPU is a **host-level resource**, but Docker Engine controls how each container uses it via **cgroups**.

👉 In simple terms:
**Docker doesn’t create CPU — it allocates and limits CPU usage for containers.**

---

# 🧠 What are cgroups (for CPU)?

* Linux kernel feature
* Used to **limit, prioritize, and account CPU usage** per container
* Applied by **`runc`** when a container starts

---

## 🧩 Where it fits

```bash
docker (CLI) → dockerd → containerd → runc → cgroups → CPU
```

👉 `runc` configures cgroups → kernel enforces limits

---

# ⚙️ Core Functionalities of CPU Resource Management

## 1. 🎯 CPU Limiting (Quota Control)

```bash
docker run --cpus="1.5" nginx
```

👉 Means:

* Container can use **max 1.5 CPU cores**

### Internally:

* cgroups sets:

  * `cpu.cfs_quota_us`
  * `cpu.cfs_period_us`

---

## 2. ⚖️ CPU Sharing (Priority)

```bash
docker run --cpu-shares=512 nginx
```

👉 Relative priority (not strict limit)

* Default = 1024
* Lower value = less priority

✔ Only matters when CPU is busy

---

## 3. 🧠 CPU Affinity (Core Pinning)

```bash
docker run --cpuset-cpus="0,1" nginx
```

👉 Container runs only on:

* CPU core 0 and 1

✔ Useful for performance tuning

---

## 4. 📊 CPU Accounting (Monitoring)

```bash
docker stats
```

👉 Engine tracks:

* CPU usage %
* per container usage

✔ Helps debugging & optimization

---

## 5. 🔄 Fair Scheduling

👉 Kernel scheduler ensures:

* No container monopolizes CPU
* Fair distribution based on cgroups

---

# 🔄 How Docker Engine Uses CPU Resources

### Example:

```bash
docker run --cpus="1" nginx
```

### Inside Engine:

1. CLI → `dockerd`
2. `dockerd` → passes config
3. `containerd` prepares container
4. `runc`:

   * configures cgroups
5. Linux kernel:

   * enforces CPU limits

---

# 🧩 Key CPU Parameters

| Option          | Purpose            |
| --------------- | ------------------ |
| `--cpus`        | Limit total CPU    |
| `--cpu-shares`  | Relative priority  |
| `--cpuset-cpus` | Specific cores     |
| `--cpu-quota`   | Fine-grained limit |

---

# ⚠️ Important Behavior

## 1. No limit → full usage

```bash
docker run nginx
```

👉 Container can use **100% CPU**

---

## 2. Shares ≠ strict limit

* Only works under contention

---

## 3. Quota = hard limit

* Cannot exceed defined CPU

---

# 🧪 Real App Example

```bash
docker run -d \
  --name api \
  --cpus="1" \
  my-node-app
```

👉 Ensures:

* API doesn’t consume more than 1 CPU
* Other services remain stable

---

# 🎯 Role of CPU Resource in Docker Engine

👉 CPU resource management ensures:

* Fair usage across containers
* Performance isolation
* System stability

---

# 🧠 Simple Analogy

| Concept   | Real-world              |
| --------- | ----------------------- |
| CPU       | Workers                 |
| cgroups   | Manager assigning tasks |
| Container | Department              |

---

# 🧠 One-Line Summary

👉 **Docker uses Linux cgroups to control, limit, and monitor CPU usage of containers, ensuring fair and efficient resource allocation across applications.**

