## 🧠 Container — as a **Docker Engine Resource**

A **container** is the **core runtime resource** managed by the Docker Engine.

👉 It is a **running (or runnable) instance of an image**
👉 It packages **application + dependencies + runtime config**
👉 It runs as a **process on the host**, but with strong isolation

---

## 📦 What exactly is a Container?

![Image](https://media2.dev.to/dynamic/image/width%3D800%2Cheight%3D%2Cfit%3Dscale-down%2Cgravity%3Dauto%2Cformat%3Dauto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F7298dbklbkky66pmpu4d.png)

![Image](https://www.netapp.com/media/container-vs-vm-inline1_tcm19-82163.png?v=85344)

![Image](https://cdn.bunny.pictures/images/what-is-a-linux-namespace-and-container-isolation.png)

![Image](https://blog.quarkslab.com/resources/2021-11-18-namespaces/r5PvRzu.png)

* Lightweight (no full OS like VM)
* Uses **host kernel**
* Each container has:

  * its own filesystem (from image layers)
  * its own network stack
  * isolated processes

👉 Think: **“process with boundaries”**

---

# ⚙️ What Docker Engine Does with Containers

## 1. 📦 Container Creation

```bash
docker create nginx
```

👉 Engine does:

* Takes image (`nginx`)
* Creates writable layer on top
* Generates container metadata (ID, config)

---

## 2. ▶️ Container Execution

```bash
docker start <id>
```

👉 Flow inside engine:

1. `dockerd` receives request
2. `containerd` prepares runtime
3. `runc`:

   * sets namespaces
   * applies cgroups
   * starts process

👉 Example process:

```
nginx (PID inside container)
```

---

## 3. 🔄 Lifecycle Management

Containers have full lifecycle:

* create
* start
* stop
* restart
* pause
* delete

```bash
docker stop <id>
docker rm <id>
```

👉 Engine tracks state internally

---

## 4. 📂 Filesystem Management

* Built from **image layers (read-only)**
* Adds **writable layer (container layer)**

👉 Changes:

* exist only in container layer
* lost when container is deleted (unless volume used)

---

## 5. 🌐 Networking Setup

* Assigns IP address
* Connects to Docker network
* Handles port mapping

```bash
docker run -p 8080:80 nginx
```

👉 Engine:

* maps host port → container port

---

## 6. 💾 Storage Integration

* Mounts:

  * volumes
  * bind mounts

```bash
docker run -v myvol:/data nginx
```

👉 Ensures persistence

---

## 7. ⚙️ Resource Allocation

* Applies CPU, memory limits

```bash
docker run -m 512m --cpus="1" nginx
```

👉 Internally:

* `runc` → cgroups enforce limits

---

## 8. 🔐 Isolation & Security

Using Linux features:

* Namespaces:

  * PID → separate process list
  * NET → separate network
  * MNT → filesystem isolation

* Security:

  * capabilities
  * seccomp

---

## 9. 📊 Monitoring & Logging

```bash
docker logs <id>
docker stats
```

👉 Engine tracks:

* CPU usage
* memory
* logs
* events

---

## 10. 🔄 Restart & Policy Handling

```bash
docker run --restart=always nginx
```

👉 Engine ensures:

* container restarts automatically

---

# 🔄 Internal Flow (Important)

```bash
docker run nginx
```

### Inside Engine:

1. CLI → `dockerd`
2. `dockerd`:

   * checks image
   * prepares config
3. `containerd`:

   * creates container
4. `runc`:

   * applies isolation
   * starts process
5. Container runs
6. Engine monitors it

---

# 🧩 What a Container Consists Of

| Component      | Description             |
| -------------- | ----------------------- |
| Image          | Base (read-only layers) |
| Writable layer | Runtime changes         |
| Process        | Main app                |
| Network        | IP + ports              |
| Storage        | Volumes/mounts          |
| Metadata       | ID, config, state       |

---

# ⚠️ Important Behavior

* Container = **ephemeral**
* Delete container → data lost (unless volume used)
* Multiple containers can run from same image

---

# 🧠 Real Example

```bash
docker run -d -p 3000:3000 -m 512m node-app
```

👉 Engine:

* creates container
* assigns network
* limits memory
* starts Node.js process
* exposes port

---

# 🎯 Role of Container in Docker Engine

👉 Container is the **unit of execution**

Everything revolves around it:

* Images → build containers
* Networks → connect containers
* Volumes → persist container data
* CPU/RAM → allocated to containers

---

# 🧠 One-Line Summary

👉 **A container is an isolated, resource-controlled process created and managed by Docker Engine, representing a runnable instance of an image.**
