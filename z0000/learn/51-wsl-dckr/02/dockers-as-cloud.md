Perfect — let’s build this **end-to-end, working setup** step by step so you can actually run it on your machine 👇

---

# 🧠 Final Goal

```text
WSL (Ubuntu)
   ↓
Docker
   ↓
Containers (Node, Python, DB)
   ↓
Nginx (Load Balancer)
   ↓
Browser (localhost)
```

---

# 🚀 STEP 1: Open Ubuntu (WSL)

```powershell
wsl -d Ubuntu-22.04
```

---

# 🐳 STEP 2: Install Docker (inside Ubuntu)

```bash
sudo apt update
sudo apt install -y docker.io docker-compose
```

Enable & start:

```bash
sudo service docker start
sudo usermod -aG docker $USER
```

👉 Restart WSL after this:

```powershell
wsl --shutdown
```

---

# 📁 STEP 3: Create Project Structure

Inside Ubuntu:

```bash
mkdir cloud-sim && cd cloud-sim
```

```bash
mkdir node-app python-app nginx
```

---

# 🟢 STEP 4: Node.js Service

## 📄 `node-app/app.js`

```js
const http = require("http");

http.createServer((req, res) => {
  res.end("Hello from Node Service");
}).listen(3000, "0.0.0.0");
```

---

## 📄 `node-app/Dockerfile`

```dockerfile
FROM node:18
WORKDIR /app
COPY app.js .
CMD ["node", "app.js"]
```

---

# 🟣 STEP 5: Python Service

## 📄 `python-app/app.py`

```python
from flask import Flask
app = Flask(__name__)

@app.route("/")
def home():
    return "Hello from Python Service"

app.run(host="0.0.0.0", port=5000)
```

---

## 📄 `python-app/Dockerfile`

```dockerfile
FROM python:3.10
WORKDIR /app
COPY app.py .
RUN pip install flask
CMD ["python", "app.py"]
```

---

# ⚖️ STEP 6: Nginx Load Balancer

## 📄 `nginx/nginx.conf`

```nginx
events {}

http {
    upstream backend {
        server node:3000;
        server python:5000;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://backend;
        }
    }
}
```

---

# 📄 STEP 7: docker-compose.yml (CORE FILE)

```yaml
version: "3"

services:
  node:
    build: ./node-app
    container_name: node-app

  python:
    build: ./python-app
    container_name: python-app

  nginx:
    image: nginx
    container_name: nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - node
      - python
```

---

# ▶️ STEP 8: Run Everything

```bash
docker-compose up --build
```

---

# 🌐 STEP 9: Open Browser

Go to:

```text
http://localhost
```

---

# 🎉 What You’ll See

Refresh multiple times:

```text
Hello from Node Service
Hello from Python Service
```

👉 Nginx is load balancing ✔️

---

# 🧠 What Just Happened

| Layer       | What you did      |
| ----------- | ----------------- |
| WSL         | Linux environment |
| Docker      | Container runtime |
| Node/Python | Microservices     |
| Nginx       | Load balancer     |
| Browser     | Client            |

---

# 🔥 STEP 10: Add Database (Optional)

Add to `docker-compose.yml`:

```yaml
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: example
    ports:
      - "5432:5432"
```

---

# ⚡ STEP 11: Useful Commands

### Stop:

```bash
docker-compose down
```

### Logs:

```bash
docker-compose logs
```

### Enter container:

```bash
docker exec -it node-app bash
```

---

# 🧠 Final Architecture (Now REAL)

```text
Browser (localhost)
        ↓
Nginx (port 80)
        ↓
------------------------
| Node Container       |
| Python Container     |
| PostgreSQL Container |
------------------------
        ↓
Docker Network
        ↓
WSL Ubuntu
```

---

# 🎯 Why This is Powerful (For YOU)

✔ Exactly how microservices work
✔ Same concept as AWS / Kubernetes
✔ Easy to reset
✔ Lightweight
✔ Perfect for teaching

---

# 🚀 Next Level (if you want)

I can help you with:

✅ Add React frontend
✅ API Gateway routing (/node, /python)
✅ JWT Auth across services
✅ Kubernetes version (minikube in WSL)
✅ CI/CD pipeline (GitHub Actions)

Just tell 👍
