## 🖼️ Image — as a **Docker Engine Resource**

A **Docker Image** is a **read-only template** used by the Docker Engine to create containers.

👉 Think of it as:

* **Blueprint / class** → container is the object
* **Snapshot of filesystem + app + dependencies**

---

## 🧠 What exactly is an Image?

![Image](https://miro.medium.com/0%2AHhURteVLNxudDuEt)

![Image](https://miro.medium.com/v2/resize%3Afit%3A1400/0%2AVldlDb6mpf6Ma3Kf.png)

![Image](https://jvns.ca/images/overlay.jpeg)

![Image](https://labs.iximiuz.com/content/files/challenges/union-mount-container-image-layers-using-overlayfs/__static__/union-mount-overlayfs-rev2.png)

* Built in **layers**
* Each layer = change (install package, copy file, etc.)
* Immutable (cannot be modified after creation)

👉 Example:

* Base OS (Ubuntu)
* * Node.js
* * App code

---

# ⚙️ What Docker Engine Does with Images

## 1. 📥 Image Pulling (Download)

```bash
docker pull nginx
```

👉 Engine (`dockerd` + `containerd`):

* Connects to registry (Docker Hub)
* Downloads layers
* Stores locally

---

## 2. 🏗️ Image Building

```bash
docker build -t myapp .
```

👉 Engine:

* Reads `Dockerfile`
* Executes step-by-step
* Creates layers for each instruction

Example:

```dockerfile
FROM node
COPY . .
RUN npm install
```

👉 Each step = one layer

---

## 3. 📦 Image Storage & Layer Management

* Images stored in:

  ```
  /var/lib/docker/
  ```
* Uses storage drivers (like `overlay2`)
* Layers are:

  * **shared across images**
  * **cached for performance**

👉 Example:

* 2 images using same Ubuntu base → stored once

---

## 4. 🔄 Image to Container Conversion

```bash
docker run nginx
```

👉 Engine:

* Takes image
* Adds writable layer
* Creates container

👉 Key:

* Image = read-only
* Container = read + write

---

## 5. 📂 Filesystem Preparation

* Image provides:

  * root filesystem
  * binaries
  * libraries

👉 `containerd`:

* Unpacks layers
* Prepares filesystem snapshot

---

## 6. 🔁 Image Caching & Optimization

* During build:

  * unchanged layers reused
* Speeds up builds

👉 Example:

* `npm install` layer reused if package.json unchanged

---

## 7. 📤 Image Push (Distribution)

```bash
docker push myapp
```

👉 Engine:

* Uploads layers to registry
* Only new layers pushed

---

## 8. 🔍 Image Inspection

```bash
docker inspect nginx
docker history nginx
```

👉 Engine provides:

* metadata
* layer info
* configuration

---

# 🔄 Internal Flow (Important)

```bash
docker run nginx
```

### Inside Engine:

1. CLI → `dockerd`
2. `dockerd`:

   * checks local image
3. If not found:

   * pulls from registry
4. `containerd`:

   * unpacks layers
   * prepares filesystem
5. `runc`:

   * starts container

---

# 🧩 What an Image Contains

| Component    | Description                  |
| ------------ | ---------------------------- |
| Layers       | Read-only filesystem changes |
| Base OS      | Ubuntu, Alpine, etc.         |
| Application  | Your code                    |
| Dependencies | Libraries, runtimes          |
| Metadata     | Env vars, CMD, ENTRYPOINT    |

---

# ⚠️ Important Characteristics

## Immutable

* Cannot change after creation
* Any change → new image

---

## Layered

* Efficient storage
* Reuse across images

---

## Read-Only

* No runtime changes
* Containers handle modifications

---

# 🧠 Example

```bash
docker run node:18
```

👉 Engine:

* pulls Node image
* prepares filesystem
* creates container
* runs Node process

---

# 🧩 Role of Image in Docker Engine

👉 Image is the **source resource** for containers

Everything depends on it:

* Container → created from image
* Build → produces image
* Registry → stores image

---

# 🎯 Big Picture

| Resource  | Role             |
| --------- | ---------------- |
| Image     | Blueprint        |
| Container | Running instance |
| Volume    | Persistent data  |
| Network   | Communication    |

---

# 🧠 One-Line Summary

👉 **A Docker image is a read-only, layered filesystem template managed by the engine, used to create and run containers efficiently.**
