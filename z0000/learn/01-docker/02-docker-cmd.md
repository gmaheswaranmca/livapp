Here’s a **trainer-level, structured guide to Docker commands**—focused on **Image, Container, Volume, and Network**, with **usage + scenarios + best practices**.

---

# 🐳 Docker Commands – Detailed Notes

---

# 📦 1. Docker Image Commands

## 🔹 What is an Image?

* Read-only template used to create containers
* Contains: OS + runtime + app + dependencies

---

## 📊 Image Commands Cheatsheet

| Command         | Usage                        | Example                         |
| --------------- | ---------------------------- | ------------------------------- |
| `docker pull`   | Download image from registry | `docker pull node:18`           |
| `docker images` | List images                  | `docker images`                 |
| `docker rmi`    | Remove image                 | `docker rmi node`               |
| `docker build`  | Build image from Dockerfile  | `docker build -t app:v1 .`      |
| `docker tag`    | Tag image                    | `docker tag app:v1 app:latest`  |
| `docker push`   | Push to Docker Hub           | `docker push username/app`      |
| `docker save`   | Export image                 | `docker save -o app.tar app:v1` |
| `docker load`   | Import image                 | `docker load -i app.tar`        |

---

## 🧠 Usage Scenarios

### ✅ 1. Build your own app image

```bash
docker build -t myapp:v1 .
```

### ✅ 2. Share image offline (important for your setup)

```bash
docker save -o myapp.tar myapp:v1
docker load -i myapp.tar
```

### ✅ 3. Versioning images

```bash
docker tag myapp:v1 myapp:v2
```

---

## ⚠️ Notes

* Images are **layer-based → faster builds**
* Use `.dockerignore` to reduce size

---

# 📦 2. Docker Container Commands

## 🔹 What is a Container?

* Running instance of an image

---

## 📊 Container Commands Cheatsheet

| Command          | Usage                    | Example                       |
| ---------------- | ------------------------ | ----------------------------- |
| `docker run`     | Create + start container | `docker run nginx`            |
| `docker run -d`  | Run in background        | `docker run -d nginx`         |
| `docker run -p`  | Port mapping             | `docker run -p 3000:3000 app` |
| `docker ps`      | Running containers       | `docker ps`                   |
| `docker ps -a`   | All containers           | `docker ps -a`                |
| `docker stop`    | Stop container           | `docker stop c1`              |
| `docker start`   | Start container          | `docker start c1`             |
| `docker restart` | Restart container        | `docker restart c1`           |
| `docker rm`      | Remove container         | `docker rm c1`                |
| `docker exec`    | Run command inside       | `docker exec -it c1 bash`     |
| `docker logs`    | View logs                | `docker logs c1`              |
| `docker inspect` | Detailed info            | `docker inspect c1`           |
| `docker pause`   | Pause container          | `docker pause c1`             |
| `docker unpause` | Resume container         | `docker unpause c1`           |

---

## 🧠 Usage Scenarios

### ✅ 1. Run app container

```bash
docker run -d -p 3000:3000 myapp
```

---

### ✅ 2. Debug inside container

```bash
docker exec -it mycontainer bash
```

---

### ✅ 3. Restart without recreating (your earlier doubt)

```bash
docker stop c1
docker start c1
```

👉 No new container created ✔

---

### ✅ 4. Snapshot container → image

```bash
docker commit c1 myimage:v2
```

---

## ⚠️ Notes

* Containers are **ephemeral** (data lost unless volume used)
* Always use `-d` for background services

---

# 💾 3. Docker Volume Commands

## 🔹 What is a Volume?

* Persistent storage outside container lifecycle

---

## 📊 Volume Commands Cheatsheet

| Command                 | Usage                 | Example                    |
| ----------------------- | --------------------- | -------------------------- |
| `docker volume create`  | Create volume         | `docker volume create v1`  |
| `docker volume ls`      | List volumes          | `docker volume ls`         |
| `docker volume inspect` | Volume details        | `docker volume inspect v1` |
| `docker volume rm`      | Remove volume         | `docker volume rm v1`      |
| `docker volume prune`   | Remove unused volumes | `docker volume prune`      |

---

## 🧠 Usage Scenarios

### ✅ 1. Persist database data

```bash
docker run -d -v mydata:/data mongo
```

---

### ✅ 2. Mount local folder

```bash
docker run -v /host/path:/app node
```

---

### ✅ 3. Backup volume

```bash
docker run --rm -v mydata:/data -v $(pwd):/backup ubuntu tar cvf /backup/backup.tar /data
```

---

## ⚠️ Notes

* Volumes survive container deletion
* Use for:

  * DB
  * Logs
  * Uploads

---

# 🌐 4. Docker Network Commands

## 🔹 What is a Network?

* Enables communication between containers

---

## 📊 Network Commands Cheatsheet

| Command                     | Usage                | Example                             |
| --------------------------- | -------------------- | ----------------------------------- |
| `docker network ls`         | List networks        | `docker network ls`                 |
| `docker network create`     | Create network       | `docker network create net1`        |
| `docker network inspect`    | Inspect network      | `docker network inspect net1`       |
| `docker network connect`    | Connect container    | `docker network connect net1 c1`    |
| `docker network disconnect` | Disconnect container | `docker network disconnect net1 c1` |
| `docker network rm`         | Remove network       | `docker network rm net1`            |

---

## 🧠 Usage Scenarios

### ✅ 1. Connect backend + DB

```bash
docker network create appnet

docker run -d --name mongo --network appnet mongo
docker run -d --name server --network appnet myapp
```

👉 Containers communicate using:

```bash
mongodb://mongo:27017
```

---

### ✅ 2. Isolate environments

* dev network
* test network
* prod network

---

## ⚠️ Notes

* Default networks:

  * bridge
  * host
  * none
* Use custom network for microservices

---

# 🔄 5. Combined Example (VERY IMPORTANT)

```bash
# Create network
docker network create mern-net

# Create volume
docker volume create mongo-data

# Run Mongo
docker run -d \
  --name mongo \
  --network mern-net \
  -v mongo-data:/data/db \
  mongo

# Run backend
docker run -d \
  --name server \
  --network mern-net \
  -p 5000:5000 \
  myserver
```

---

# 🧠 6. Best Practices

| Area      | Best Practice             |
| --------- | ------------------------- |
| Image     | Use small base images     |
| Container | One process per container |
| Volume    | Always for DB             |
| Network   | Use custom networks       |
| Naming    | Use meaningful names      |

---

# ⚡ 7. Common Interview Questions

| Question                       | Key Idea                      |
| ------------------------------ | ----------------------------- |
| Difference: image vs container | Blueprint vs running instance |
| Volume vs bind mount           | Managed vs host path          |
| Why network needed?            | Container communication       |
| Why container exits?           | Main process finished         |

---

# 🏁 Final Summary

| Type      | Purpose             |
| --------- | ------------------- |
| Image     | Build & package app |
| Container | Run app             |
| Volume    | Store data          |
| Network   | Connect services    |

---

## 👍 Next Step (Recommended for you)

I can give:

* 🔥 **Hands-on lab: MERN app using ONLY docker CLI (no compose)**
* 🔥 **WSL + Docker architecture for your setup**
* 🔥 **Kubernetes mapping (Docker → K8s concepts)**
