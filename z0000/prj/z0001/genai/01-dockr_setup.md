Perfect — this is where your project **comes alive** 🔥
We’ll now make Docker run **Mongo + Server + Client together**

---

# 🚀 Phase 1 – Docker Setup (Working System Skeleton)

Goal:
👉 `docker compose up --build` should run **3 containers successfully**

---

# 📄 1. docker-compose.yml

Create:

```yaml
version: "3.8"

services:
  mongo:
    image: mongo:7
    container_name: z0001_mongo
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongo_z0001_data:/data/db

  server:
    build: ./server
    container_name: z0001_server
    restart: always
    ports:
      - "5000:5000"
    env_file:
      - .env
    depends_on:
      - mongo
    volumes:
      - ./server:/app
      - /app/node_modules

  client:
    build: ./client
    container_name: z0001_client
    restart: always
    ports:
      - "5173:5173"
    env_file:
      - .env
    depends_on:
      - server
    volumes:
      - ./client:/app
      - /app/node_modules

volumes:
  mongo_z0001_data:
```

---

# 📄 2. Server – Dockerfile

📁 `server/Dockerfile`

```dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
```

---

# 📄 3. Server – package.json

📁 `server/package.json`

```json
{
  "name": "trainer-server",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only index.ts"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "jsonwebtoken": "^9.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.0.0"
  }
}
```

---

# 📄 4. Server – tsconfig.json

📁 `server/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "esModuleInterop": true,
    "strict": true
  }
}
```

---

# 📄 5. Server – Minimal index.ts (Test Only)

📁 `server/index.ts`

```ts
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.APP_PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Mongo connected");
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
```

---

# 📄 6. Client – Dockerfile

📁 `client/Dockerfile`

```dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
```

---

# 📄 7. Client – Create Vite App

Inside `client/` run:

```bash
npm create vite@latest . -- --template react-ts
npm install
```

---

# 📄 8. Update vite.config.ts

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  }
});
```

---

# 📄 9. index.html (Bootstrap CDN)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Trainer App</title>

    <!-- Bootstrap CDN -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

# ▶️ 10. RUN EVERYTHING

From root folder:

```bash
docker compose up --build
```

---

# ✅ Expected Output

### ✔ Containers running

* mongo
* server
* client

### ✔ Test URLs

👉 Server

```
http://localhost:5000
```

👉 should show:

```
Server is running 🚀
```

👉 Client

```
http://localhost:5173
```

---

# ⚠️ Common Issues (Important)

### ❌ Mongo not connecting

✔ Check:

```bash
docker logs z0001_server
```

---

### ❌ Port already used

```bash
lsof -i :5000
```

---

### ❌ Docker daemon issue

```bash
ps aux | grep dockerd
```

---

# 🧠 What You Achieved

✔ Full containerized architecture
✔ WSL + Docker Engine (no Desktop)
✔ Live reload for both client & server
✔ Volume persistence (Mongo)

---

# 🚀 Next Step (Phase 2 – Backend Real Work)

We will implement:

* JWT login
* Role-based middleware
* Mongo models
* Super user auto-create
* Trainer CRUD APIs

---

👉 When ready, say:

**"Phase 2"**

We’ll build the real backend 🔥
