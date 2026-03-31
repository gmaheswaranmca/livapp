Here’s a **complete Docker cleanup cheat sheet**—organized so you can quickly remove unused containers, images, volumes, networks, or everything safely.

---

# 🧹 Docker Cleanup Commands (Full Guide)

## 🧱 1. Containers Cleanup

### Stop all running containers

```bash
docker stop $(docker ps -q)
```

### Remove all containers (stopped only)

```bash
docker rm $(docker ps -aq)
```

### Remove only stopped containers

```bash
docker container prune
```

---

## 🖼️ 2. Images Cleanup

### Remove specific image

```bash
docker rmi <image_id>
```

### Remove dangling images (unused layers)

```bash
docker image prune
```

### Remove all unused images (not used by containers)

```bash
docker image prune -a
```

---

## 💾 3. Volumes Cleanup

### Remove unused volumes

```bash
docker volume prune
```

### Remove all volumes (⚠️ deletes data!)

```bash
docker volume rm $(docker volume ls -q)
```

---

## 🌐 4. Networks Cleanup

### Remove unused networks

```bash
docker network prune
```

### Remove all custom networks

```bash
docker network rm $(docker network ls -q)
```

---

## 🚀 5. System-wide Cleanup (Best Shortcut)

### Remove everything unused (containers, images, networks)

```bash
docker system prune
```

### Aggressive cleanup (includes unused images)

```bash
docker system prune -a
```

### Full cleanup (INCLUDING volumes ⚠️)

```bash
docker system prune -a --volumes
```

---

## 🔍 6. Check What’s Using Space

```bash
docker system df
```

---

## 🧠 Recommended Safe Workflow

Instead of blindly deleting everything, use this order:

```bash
docker ps -a              # check containers
docker images            # check images
docker volume ls         # check volumes
docker system df         # check usage

docker system prune      # safe cleanup
```

---

## ⚠️ Important Notes

* `-a` → removes **ALL unused images**, not just dangling ones
* `--volumes` → deletes **persistent data (dangerous!)**
* Volumes often store DB data (Mongo, MySQL, etc.)

---

## 💡 Pro Tip (Development Setup)

For your MERN/Docker workflow:

* Use:

```bash
docker compose down -v
```

This will:

* stop containers
* remove networks
* remove volumes (clean DB)
