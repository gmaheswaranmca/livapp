Here’s a **complete, trainer-level guide to Docker Compose commands**—organized by **categories, usage, real scenarios, and best practices**.

---

# 🐳 Docker Compose – Overview

Docker Compose is used to **define and run multi-container applications** using a `docker-compose.yml` file.

👉 Instead of running multiple `docker run` commands, you use:

```bash
docker compose up
```

---

# 🧭 Categories of Docker Compose Commands

---

# 🚀 1. Project Lifecycle Commands

## 📊 Commands

| Command                  | Usage                              | Example                  |
| ------------------------ | ---------------------------------- | ------------------------ |
| `docker compose up`      | Create + start services            | `docker compose up`      |
| `docker compose up -d`   | Run in background                  | `docker compose up -d`   |
| `docker compose down`    | Stop + remove containers, networks | `docker compose down`    |
| `docker compose down -v` | Remove volumes also                | `docker compose down -v` |
| `docker compose start`   | Start existing containers          | `docker compose start`   |
| `docker compose stop`    | Stop without removing              | `docker compose stop`    |
| `docker compose restart` | Restart services                   | `docker compose restart` |

---

## 🧠 Usage

### ✅ First time run

```bash
docker compose up --build
```

---

### ✅ Run silently (your earlier need)

```bash
docker compose up -d
```

---

### ✅ Stop without deleting

```bash
docker compose stop
```

---

### ✅ Clean everything

```bash
docker compose down -v
```

---

# 🏗️ 2. Build & Image Commands

## 📊 Commands

| Command                           | Usage        | Example                           |
| --------------------------------- | ------------ | --------------------------------- |
| `docker compose build`            | Build images | `docker compose build`            |
| `docker compose build --no-cache` | Fresh build  | `docker compose build --no-cache` |
| `docker compose pull`             | Pull images  | `docker compose pull`             |
| `docker compose push`             | Push images  | `docker compose push`             |

---

## 🧠 Usage

### ✅ Rebuild after code change

```bash
docker compose build
docker compose up -d
```

---

### ✅ Force rebuild

```bash
docker compose up --build
```

---

# 📦 3. Container Interaction Commands

## 📊 Commands

| Command                  | Usage                    | Example                              |
| ------------------------ | ------------------------ | ------------------------------------ |
| `docker compose ps`      | List services            | `docker compose ps`                  |
| `docker compose exec`    | Execute inside container | `docker compose exec server bash`    |
| `docker compose run`     | Run one-off container    | `docker compose run server npm test` |
| `docker compose logs`    | View logs                | `docker compose logs`                |
| `docker compose logs -f` | Follow logs              | `docker compose logs -f`             |
| `docker compose top`     | Show processes           | `docker compose top`                 |

---

## 🧠 Usage

### ✅ Enter backend container

```bash
docker compose exec server bash
```

---

### ✅ Run test command

```bash
docker compose run server npm test
```

---

### ✅ Debug logs

```bash
docker compose logs -f
```

---

# 🔄 4. Scaling & Performance Commands

## 📊 Commands

| Command                     | Usage          | Example                              |
| --------------------------- | -------------- | ------------------------------------ |
| `docker compose up --scale` | Scale services | `docker compose up --scale server=3` |

---

## 🧠 Usage

### ✅ Scale backend

```bash
docker compose up -d --scale server=3
```

👉 Useful for:

* Load testing
* Microservices scaling

---

# 🌐 5. Networking & Dependency Handling

(Handled automatically but useful flags)

| Feature          | Usage         |
| ---------------- | ------------- |
| `depends_on`     | Start order   |
| Default network  | Auto-created  |
| Service name DNS | `mongo:27017` |

---

## 🧠 Example

```yaml
services:
  server:
    depends_on:
      - mongo
```

---

# 📁 6. File & Configuration Commands

## 📊 Commands

| Command                  | Usage             | Example                        |
| ------------------------ | ----------------- | ------------------------------ |
| `docker compose -f`      | Use custom file   | `docker compose -f dev.yml up` |
| `docker compose config`  | Validate config   | `docker compose config`        |
| `docker compose convert` | Show final config | `docker compose convert`       |

---

## 🧠 Usage

### ✅ Multiple environments

```bash
docker compose -f docker-compose.dev.yml up
docker compose -f docker-compose.prod.yml up
```

---

# 🔐 7. Environment & Profiles

## 📊 Commands

| Command                     | Usage        | Example                             |
| --------------------------- | ------------ | ----------------------------------- |
| `docker compose --env-file` | Use env file | `docker compose --env-file .env up` |
| `docker compose --profile`  | Run profile  | `docker compose --profile dev up`   |

---

## 🧠 Usage

### ✅ Use env variables

```bash
docker compose --env-file .env up
```

---

### ✅ Profiles (advanced)

```bash
docker compose --profile debug up
```

---

# 🧹 8. Cleanup & Maintenance

## 📊 Commands

| Command                         | Usage                     | Example                         |
| ------------------------------- | ------------------------- | ------------------------------- |
| `docker compose rm`             | Remove stopped containers | `docker compose rm`             |
| `docker compose down`           | Full cleanup              | `docker compose down`           |
| `docker compose down --rmi all` | Remove images also        | `docker compose down --rmi all` |

---

## 🧠 Usage

### ✅ Remove everything

```bash
docker compose down --rmi all -v
```

---

# ⚡ 9. Combined Real Example (MERN)

```bash
# Start all services
docker compose up -d

# Check status
docker compose ps

# View logs
docker compose logs -f

# Enter backend
docker compose exec server bash

# Stop services
docker compose stop

# Restart
docker compose restart

# Clean everything
docker compose down -v
```

---

# ⚠️ 10. Important Differences (RUN vs EXEC)

| Command | Purpose            |
| ------- | ------------------ |
| `run`   | New container      |
| `exec`  | Existing container |

---

# 🧠 11. Best Practices

| Area     | Best Practice               |
| -------- | --------------------------- |
| Naming   | Use service names clearly   |
| Env      | Use `.env` file             |
| Volumes  | Persist DB                  |
| Networks | Use default compose network |
| Restart  | Use `restart: always`       |

---

# 🏁 Final Summary

| Category  | Key Commands          |
| --------- | --------------------- |
| Lifecycle | up, down, start, stop |
| Build     | build, pull, push     |
| Debug     | logs, exec            |
| Scale     | up --scale            |
| Config    | -f, config            |
| Cleanup   | down -v               |

---

## 👍 Next (Highly Recommended for You)

Since you’re teaching + using WSL + Docker:

I can give:

* 🔥 **MERN full docker-compose project (production-ready)**
* 🔥 **Multi-WSL architecture (Gateway + Node + DB)**
* 🔥 **Nginx + Load balancing using compose**
* 🔥 **Compose vs Kubernetes mapping (very useful for students)**
