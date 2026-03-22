# 🔷 0 – Environment & Project Folder Setup

* WSL Ubuntu structure (you already have)
* Project base folders
* Docker strategy (no Docker Desktop ✔)
* `.env` planning

👉 Output: Base structure ready

## 📁 Final Structure - Init
[Git] Create Branch z0001

[File Explorer] Create the below folder structure
```
z0001/
│
├── client/
├── server/
```

```
# Create Server App (Node Typescript Express - ES6)
cd server/
npm init 
npm install express mongoose jsonwebtoken cors dotenv
npm install -D ts-node-dev typescript
npm install -D @types/cors
npm install -D @types/express @types/node @types/jsonwebtoken

# Create Client App (Vite React Typscript - ES6) 
cd ../client
npm create vite@latest . -- --template react-ts
npm install
```
## 📁 Final Structure (Target)

```
z0001/
│
├── docker-compose.yml
├── .env
│
├── client/
│   ├── Dockerfile
│   ├── vite.config.ts
│   ├── index.html
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── routes/
│
├── server/
│   ├── Dockerfile
│   ├── tsconfig.json
│   ├── index.ts   👈 (single file server)
│   └── package.json
```

---
## Server

### 📄 Server – package.json

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

### 📄 Server – tsconfig.json

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

### 📄 Server – Minimal index.ts (Test Only)

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

### 📄 Create `.env`

```env
APP_PORT=5000
MONGO_URI=mongodb://mongo:27017/trainerdb
JWT_SECRET=secret123

CLIENT_PORT=5173
```

---

## Client 

### 📄 Update vite.config.ts

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

### 📄 index.html (Bootstrap CDN)

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

# 🔷 1 - Docker and "Docker Compose" Setup
## 📄 docker-compose.yml

Create:

```yaml
#version: "3.8"

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

## 📄 Server – Dockerfile

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

## 📄 Client – Dockerfile

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

## ▶️ RUN EVERYTHING

From root folder:

```bash
# Run Docker Daemon in a termina
dockerd &

# In another terminal, either up the containers if not up or start the containers if stopped

#docker compose up --build

# detached mode
docker compose up --build -d

# Check containers:
docker compose ps

# To check logs later:
docker compose logs -f

# Suppress Output Completely
docker compose up --build > /dev/null 2>&1

# Minimal Output (Quiet Build)
docker compose up --build --quiet-pull

OR 

docker compose build --quiet
docker compose up -d

# Only Show Errors (Advanced
docker compose up --build 2>/dev/null
#   #Hides normal logs #Shows only errors

# Stop / Start
# Stop (Recommended)
docker compose stop
#   #Stops running containers #Keeps containers intact #No rebuild / no recreation

# Start again:
docker compose start
# #Fast restart, no rebuild, no data loss

# Pause / Resume
# Pause (Not usually recommended)
docker compose pause
# #Freezes containers (CPU paused) #Keeps memory state

# Resume:
docker compose unpause
# #Containers still occupy memory #Not ideal for long time #Can cause issues with network / DB connections
# #Use only for very short pause (debugging)

# Down / Up
# Down (Avoid for your case)
docker compose down
# #Stops AND removes containers #Network removed #Need to recreate again
# #This is what you DON’T want

# Best Practice: docker compose stop | docker compose start

# Stop / Start Specific Service
# Stop a specific service:
docker compose stop <service_name>

# Start a specific service:
docker compose start <service_name>
```


## ✅ Expected Output

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
