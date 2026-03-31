Good question — volumes are **separate from containers**, so removing a container does **NOT** delete the volume automatically.

Here’s how to properly remove them 👇

---

# 🧹 1. List All Volumes

```bash
docker volume ls
```

Example output:

```
DRIVER    VOLUME NAME
local     mongo-data
```

---

# 🧹 2. Remove a Specific Volume

```bash
docker volume rm mongo-data
```

---

# ⚠️ Important Rule

👉 You **cannot remove a volume if it's in use**

So first:

```bash
docker stop my-mongo
docker rm my-mongo
```

Then:

```bash
docker volume rm mongo-data
```

---

# 🚀 3. Remove Volume + Container Together (Manual Flow)

```bash
docker rm -f my-mongo
docker volume rm mongo-data
```

---

# 💣 4. Remove ALL Unused Volumes (Danger ⚠️)

```bash
docker volume prune
```

It will ask:

```
Are you sure you want to continue? [y/N]
```

👉 This deletes **ALL unused volumes**

---

# ⚡ 5. Force Remove Without Prompt

```bash
docker volume prune -f
```

---

# 🧠 How to Check Which Volume is Used by Container

```bash
docker inspect my-mongo
```

Look for:

```json
"Mounts": [
  {
    "Name": "mongo-data",
    "Destination": "/data/db"
  }
]
```

---

# 🧠 Best Practice

For development:

* Use named volumes → `mongo-data`
* Clean when needed

For production:

* NEVER randomly prune volumes (data loss risk)

---

# 🔥 Quick Cheat Sheet

```bash
docker volume ls
docker volume rm <volume-name>
docker volume prune
```

