Nice — this is a solid DevOps-style lab 👍
I’ll convert your steps into a **clear, executable lab guide** (with exact commands + expected flow).

---

# ✅ Lab 2 – WSL + Docker + MERN (Step-by-Step)

---

## 🔹 Step 1: Import base ubuntu2404lts as `ubuntu_dockr`

```powershell
wsl --import ubuntu_dockr D:\WSL\ubuntu_dockr D:\WSL\Downloads\ubuntu2404lts.tar
```

👉 Verify:

```powershell
wsl -l -v
```

👉 Open it:

```powershell
wsl -d ubuntu_dockr
```

---

## 🔹 Step 2: Basic setup inside Ubuntu

```bash
apt update && apt upgrade -y
apt install -y ca-certificates curl gnupg lsb-release
```

---

## 🔹 Step 3: Install Docker

```bash
# Add Docker GPG key
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Add repo
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
  > /etc/apt/sources.list.d/docker.list

# Install Docker
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

👉 Test:

```bash
docker --version
docker compose version
```

👉 Optional (avoid sudo):

```bash
usermod -aG docker $USER
```

Then restart WSL:

```powershell
wsl --shutdown
```

---

## 🔹 Step 4: Export base Docker-enabled image

Exit WSL:

```bash
exit
```

Export:

```powershell
wsl --export ubuntu_dockr D:\WSL\ubuntu_dockr.tar
```

---

## 🔹 Step 5: Setup MERN using Docker

Re-enter:

```powershell
wsl -d ubuntu_dockr
```

Create project:

```bash
mkdir mern-docker && cd mern-docker
```

---

### 📁 Project Structure

```
mern-docker/
 ├── docker-compose.yml
 ├── backend/
 └── frontend/
```

---

### 🔹 docker-compose.yml

```yaml
version: '3.8'

services:
  mongo:
    image: mongo
    container_name: mongo
    ports:
      - "27017:27017"

  backend:
    build: ./backend
    container_name: backend
    ports:
      - "5000:5000"
    depends_on:
      - mongo

  frontend:
    build: ./frontend
    container_name: frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

---

### 🔹 Backend Dockerfile (Node + Express)

```dockerfile
FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 5000

CMD ["npm", "start"]
```

---

### 🔹 Frontend Dockerfile (React)

```dockerfile
FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3000

CMD ["npm", "start"]
```

---

### 🔹 Run MERN

```bash
docker compose up --build
```

👉 Access:

* Frontend → [http://localhost:3000](http://localhost:3000)
* Backend → [http://localhost:5000](http://localhost:5000)
* Mongo → port 27017

---

## 🔹 Step 6: Export MERN-ready image

Exit WSL:

```bash
exit
```

Export:

```powershell
wsl --export ubuntu_dockr D:\WSL\ubuntu_dockr_mern.tar
```

---

## 🔹 Step 7: Remove original instance

```powershell
wsl --unregister ubuntu_dockr
```

---

## 🔹 Step 8: Import final working image

```powershell
wsl --import ubuntu_dockr_mern D:\WSL\ubuntu_dockr_mern D:\WSL\ubuntu_dockr_mern.tar
```

Run:

```powershell
wsl -d ubuntu_dockr_mern
```

---

# 🎯 Final Outcome

You now have:

| Instance                | Purpose                           |
| ----------------------- | --------------------------------- |
| `ubuntu_dockr.tar`      | Base Docker-enabled Ubuntu        |
| `ubuntu_dockr_mern.tar` | Ready-to-use MERN Dev Environment |
| `ubuntu_dockr_mern`     | Final working WSL instance        |

---

# 💡 Pro Tips (Important for your teaching use-case)

* ✔ You can **duplicate environments instantly**
* ✔ Students can import `.tar` → no setup needed
* ✔ Works great for:

  * MERN
  * Python + Flask
  * Microservices labs

---

If you want next level 🔥
I can help you extend this into:

👉 Multi-container architecture (Nginx + Load Balancer)
👉 Kubernetes version of this lab
👉 Production-ready MERN setup

Just tell 👍
