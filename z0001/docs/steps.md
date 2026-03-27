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
npm install react-router-dom
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
# *** Run Docker Daemon in a terminal***
dockerd &

# ***In another terminal, either up the containers if not up or start the containers if stopped***

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

# 🔷 2 - Server Coding

## 📄 Replace `server/index.ts` COMPLETELY

👉 This is your **final Phase 2 backend**

```ts
/*
Settigup Reading Env Vars from .env file
  READ configurations from Env Vars PORT, MONGO_URI, JWT_SECRET
Create App  
  Add middlewares 
    CORS
    JSON

Create mongoose models 
  admin_user model = from admin_user schema 
  trainer model = from trainer schema
  audit model = from audit schema
  last_update model = from last_update schema

Define middlewares and utility 
  middlewares:
    authMiddleware  : token verification, sets token user in req.user  
    roleMiddleware hof : for param role numbers to hof, 
      getting middleware : to check: given param role matches user role

  utility
    logAudit entry and update to lastUpdate

API End Points
  Auth
    login API : POST /api/login {email, password} -> { token }
      
      for matched user, for token
  Trainer
    list: GET /api/trainers -> [{ ie trainer json }]
      authMiddleware
      find Trainers filter "name contains search"
    create: POST /api/trainers 
      ... { body+, updated_user_id from req.user}
        -> { createdTrainer json }
      authMiddleware, roleMiddleware([1, 2, 3, 4])
      create Trainer
      op+: logAudit
    view: GET /api/trainers/:id -> { ie trainer json }
      authMiddleware, roleMiddleware([1, 2, 3, 4])
      query filter "name contains search"
    update: PUT /api/trainers/:id 
      ... { body+, updated_user_id from req.user}
        -> { createdTrainer json }
      authMiddleware, roleMiddleware([2, 3, 4])
      findByIdAndUpdate Trainer
      op+: logAudit   
    delete: DELETE /api/trainers/:id 
      ... { body+, updated_user_id from req.user}
        -> { createdTrainer json }
      authMiddleware, roleMiddleware([3, 4])
      findByIdAndDelete Trainer
      op+: logAudit
Init super user
  createSuperUser
Start Server
  mongoose.connect
    -> createSuperUser
    -> app.liste PORT
*/
import express from "express";
import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";

dotenv.config();

const PORT = process.env.APP_PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";
const JWT_SECRET = process.env.JWT_SECRET || "secret";

const app = express();
app.use(cors());
app.use(express.json());

// =======================
// Mongo Schemas
// =======================

// Admin User
const AdminUserSchema = new Schema({
  email: String,
  password: String,
  role: Number,
  updated_time: { type: Date, default: Date.now }
});
const AdminUser = mongoose.model("admin_users", AdminUserSchema);

// Trainer
const TrainerSchema = new Schema({
  name: String,
  skills: [String],
  photo: String,
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  updated_user_id: String,
  updated_time: { type: Date, default: Date.now }
});
const Trainer = mongoose.model("trainer", TrainerSchema);

// Audit
const AuditSchema = new Schema({
  table: String,
  op: String,
  payload: Object,
  updated_time: { type: Date, default: Date.now }
});
const Audit = mongoose.model("audit", AuditSchema);

// Last Update
const LastUpdateSchema = new Schema({
  updated_time: { type: Date, default: Date.now }
});
const LastUpdate = mongoose.model("last_update", LastUpdateSchema);

// =======================
// Middleware
// =======================

const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("No token");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
};

const roleMiddleware = (roles: number[]) => {
  return (req: any, res: any, next: any) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send("Forbidden");
    }
    next();
  };
};

// =======================
// Utility
// =======================

const logAudit = async (table: string, op: string, payload: any) => {
  await Audit.create({ table, op, payload });
  await LastUpdate.findOneAndUpdate(
    {},
    { updated_time: new Date() },
    { upsert: true }
  );
};

// =======================
// Auth API
// =======================

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await AdminUser.findOne({ email, password });
  if (!user) return res.status(401).send("Invalid credentials");

  const token = jwt.sign(
    { user_id: user._id, email: user.email, role: user.role },
    JWT_SECRET
  );

  res.json({ token });
});

// =======================
// Trainer APIs
// =======================

// LIST / SEARCH
app.get("/api/trainers", authMiddleware, async (req, res) => {
  const { search = "" } = req.query;

  const trainers = await Trainer.find({
    name: { $regex: search, $options: "i" }
  });

  res.json(trainers);
});

// CREATE (agent+)
app.post(
  "/api/trainers",
  authMiddleware,
  roleMiddleware([1, 2, 3, 4]),
  async (req: any, res) => {
    const trainer = await Trainer.create({
      ...req.body,
      updated_user_id: req.user.user_id
    });

    await logAudit("trainer", "create", trainer);

    res.json(trainer);
  }
);

// VIEW
app.get("/api/trainers/:id", authMiddleware, async (req, res) => {
  const trainer = await Trainer.findById(req.params.id);
  res.json(trainer);
});

// UPDATE (officer+)
app.put(
  "/api/trainers/:id",
  authMiddleware,
  roleMiddleware([2, 3, 4]),
  async (req: any, res) => {
    const trainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updated_user_id: req.user.user_id,
        updated_time: new Date()
      },
      { new: true }
    );

    await logAudit("trainer", "update", trainer);

    res.json(trainer);
  }
);

// DELETE (manager+)
app.delete(
  "/api/trainers/:id",
  authMiddleware,
  roleMiddleware([3, 4]),
  async (req, res) => {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);

    await logAudit("trainer", "delete", trainer);

    res.json({ message: "Deleted" });
  }
);

// =======================
// INIT SUPER USER
// =======================

const createSuperUser = async () => {
  const exists = await AdminUser.findOne({ role: 4 });

  if (!exists) {
    await AdminUser.create({
      email: "su@gmail.com",
      password: "1234",
      role: 4
    });
    console.log("Super user created");
  }
};

// =======================
// START SERVER
// =======================

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("Mongo connected");

    await createSuperUser();

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
```

---

## ▶️ Restart Containers

```bash
# In one terminal:
dockerd &

# In another terminal:
docker compose down
docker compose up --build
```

---

## 🧪 Test APIs via "REST Client" (Extension in VSC)

After created .http for each api module, set the data in variables and click "send request".

Make sure the server is running successfully.

### 🔐 Login ./server_test/login.http

```bash
### Login API Test
POST http://localhost:5000/api/login
Content-Type: application/json

{
  "email": "su@gmail.com",
  "password": "1234"
}
```

---

### 📋 Trainers ./server_test/trainer.http

```bash
@baseUrl = http://localhost:5000
@trainerId = 69c205ac622f3af9915b0a99
@token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjljMjAyMGE2MTBkZDMyODViMzY2MWI4IiwiZW1haWwiOiJzdUBnbWFpbC5jb20iLCJyb2xlIjo0LCJpYXQiOjE3NzQzMjMwNTB9.m6ANgx8ghI6vNM3Ck_BUK_xvedIig_wu2utQrjrfW_Y
### 🔹 Get All Trainers
GET {{baseUrl}}/api/trainers
Authorization: {{token}}

###

### 🔹 Create Trainer
POST {{baseUrl}}/api/trainers
Authorization: {{token}}
Content-Type: application/json

{
  "name": "Raj",
  "skills": ["React", "Node", "MongoDB"],
  "photo": "https://example.com/photo.jpg"
}

###

### 🔹 Get Trainer By ID
GET {{baseUrl}}/api/trainers/{{trainerId}}
Authorization: {{token}}

###

### 🔹 Update Trainer
PUT {{baseUrl}}/api/trainers/{{trainerId}}
Authorization: {{token}}
Content-Type: application/json

{
  "name": "Mahesh Updated",
  "skills": ["React", "Node", "Docker"],
  "photo": "https://example.com/new-photo.jpg"
}

###

### 🔹 Delete Trainer
DELETE {{baseUrl}}/api/trainers/{{trainerId}}
Authorization: {{token}}
```

---

## ⚠️ Important Notes

### 🔴 Password not encrypted (for now)

We will fix in later phase

---

### 🔴 Pagination not yet added

Will come in Phase 4

---

# 🔷 3 - Client Coding 

## 📄 2. client/src/services/types.ts

```ts id="3q7o8n"
export interface User {
  email: string;
  password: string;
}

export interface Trainer {
  _id?: string;
  name: string;
  skills: string[];
  photo: string;
  status: "Active" | "Inactive";
}
```

---

## 📄 3. client/src/services/api.ts

```ts id="a9n2zl"
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const loginApi = async (data: any) => {
  const res = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
};

export const getTrainers = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/trainers`, {
    headers: {
      Authorization: token || ""
    }
  });

  return res.json();
};
```

---

## 📄 4. client/src/routes/PrivateRoute.tsx

```tsx id="4u7mkg"
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;
```

---

## 📄 5. client/src/components/PublicNavbar.tsx

```tsx id="l6d6tp"
const PublicNavbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand">Trainer App</span>
      </div>
    </nav>
  );
};

export default PublicNavbar;
```

---

## 📄 6. client/src/components/PrivateNavbar.tsx

```tsx id="7g6v0c"
import { useNavigate } from "react-router-dom";

const PrivateNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">Trainer Dashboard</span>
        <button className="btn btn-light" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default PrivateNavbar;
```

---

## 📄 7. client/src/pages/login.tsx

```tsx id="6u6yys"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import { loginApi } from "../services/api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await loginApi(form);

    if (res.token) {
      localStorage.setItem("token", res.token);
      navigate("/");
    } else {
      alert("Login failed");
    }
  };

  return (
    <>
      <PublicNavbar />
      <div className="container mt-5">
        <h3>Login</h3>
        <input
          className="form-control mb-2"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
```

---

## 📄 8. client/src/pages/index.tsx (Home)

```tsx id="i5p18v"
import { useEffect, useState } from "react";
import PrivateNavbar from "../components/PrivateNavbar";
import { getTrainers } from "../services/api";

const Home = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getTrainers();
    setTrainers(data);
  };

  return (
    <>
      <PrivateNavbar />
      <div className="container mt-3">
        <h3>Trainer List</h3>
        <ul className="list-group">
          {trainers.map((t: any) => (
            <li key={t._id} className="list-group-item">
              {t.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
```

---

## 📄 9. client/src/App.tsx (Routing Core)

```tsx id="c06wzq"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## 📄 10. client/src/main.tsx

```tsx id="g7rqqk"
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 📄 11. Add ENV for Client

👉 `client/.env`

```env id="28c37c"
VITE_API_URL=http://localhost:5000
```

---

## ▶️ Restart Docker

```bash
# In one terminal:
dockerd & 

# In another terminal:
docker compose down
docker compose up --build -d
```

---

## 🧪 Test Flow

### 1. Open:

```id="y0u2cf"
http://localhost:5173
```

👉 You should be redirected to `/login`

---

### 2. Login

```
email: su@gmail.com
password: 1234
```

---

### 3. After login

✔ Redirect to `/`
✔ Navbar visible
✔ Trainer list (empty or data)

---

## 🧠 What You Built

✅ Full Auth Flow (JWT stored in localStorage)
✅ Route protection (PrivateRoute)
✅ API integration
✅ Clean React structure
✅ Dockerized frontend

---

# 🔷 4 - CRUD ops

## 📄 2. Update API (client/src/services/api.ts)

Add these:

```ts
export const createTrainer = async (data: any) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/trainers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token || ""
    },
    body: JSON.stringify(data)
  });

  return res.json();
};

export const getTrainerById = async (id: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/trainers/${id}`, {
    headers: { Authorization: token || "" }
  });

  return res.json();
};

export const updateTrainer = async (id: string, data: any) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/trainers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token || ""
    },
    body: JSON.stringify(data)
  });

  return res.json();
};

export const deleteTrainer = async (id: string) => {
  const token = localStorage.getItem("token");

  await fetch(`${API_URL}/api/trainers/${id}`, {
    method: "DELETE",
    headers: { Authorization: token || "" }
  });
};
```

---

## 📄 3. TrainerForm (client/src/components/TrainerForm.tsx) (Reusable Core)

```tsx
import { useEffect, useState } from "react";
import { createTrainer, updateTrainer, getTrainerById } from "../services/api";
import { useNavigate } from "react-router-dom";

const TrainerForm = ({ mode, id }: any) => {
  const [form, setForm] = useState({
    name: "",
    skills: "",
    photo: "",
    status: "Active"
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "edit" && id) load();
  }, [id]);

  const load = async () => {
    const data = await getTrainerById(id);
    setForm({
      ...data,
      skills: data.skills.join(",")
    });
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      skills: form.skills.split(",")
    };

    if (mode === "new") {
      await createTrainer(payload);
    } else {
      await updateTrainer(id, payload);
    }

    navigate("/");
  };

  return (
    <div className="container mt-3">
      <h3>{mode === "new" ? "Create" : "Edit"} Trainer</h3>

      <input
        className="form-control mb-2"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="form-control mb-2"
        placeholder="Skills (comma separated)"
        value={form.skills}
        onChange={(e) => setForm({ ...form, skills: e.target.value })}
      />

      <input
        className="form-control mb-2"
        placeholder="Photo URL"
        value={form.photo}
        onChange={(e) => setForm({ ...form, photo: e.target.value })}
      />

      <select
        className="form-control mb-2"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option>Active</option>
        <option>Inactive</option>
      </select>

       <button className="btn btn-light" onClick={() => navigate('/')}>
        Back
      </button>
      <button className="btn btn-success" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
};

export default TrainerForm;
```

---

## 📄 4. New Page (client/src/pages/new.tsx)

```tsx
import PrivateNavbar from "../components/PrivateNavbar";
import TrainerForm from "../components/TrainerForm";

const NewTrainer = () => {
  return (
    <>
      <PrivateNavbar />
      <TrainerForm mode="new" />
    </>
  );
};

export default NewTrainer;
```

---

## 📄 5. Edit Page (client/src/pages/edit.tsx)

```tsx
import { useParams } from "react-router-dom";
import PrivateNavbar from "../components/PrivateNavbar";
import TrainerForm from "../components/TrainerForm";

const EditTrainer = () => {
  const { id } = useParams();

  return (
    <>
      <PrivateNavbar />
      <TrainerForm mode="edit" id={id} />
    </>
  );
};

export default EditTrainer;
```

---

## 📄 6. Update Home Page (IMPORTANT)

Replace your `(client/src/pages/index.tsx)`:

```tsx
import { useEffect, useState } from "react";
import PrivateNavbar from "../components/PrivateNavbar";
import { getTrainers, deleteTrainer } from "../services/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [trainers, setTrainers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, [search]);

  const load = async () => {
    const data = await getTrainers();
    setTrainers(
      data.filter((t: any) =>
        t.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const remove = async (id: string) => {
    await deleteTrainer(id);
    load();
  };

  return (
    <>
      <PrivateNavbar />

      <div className="container mt-3">
        <div className="d-flex justify-content-between">
          <h3>Trainer List</h3>
          <button className="btn btn-primary" onClick={() => navigate("/new")}>
            + Add
          </button>
        </div>

        <input
          className="form-control my-2"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Skills</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {trainers.map((t: any) => (
              <tr key={t._id}>
                <td>{t.name}</td>
                <td>{t.skills.join(", ")}</td>
                <td>{t.status}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => navigate(`/edit/${t._id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => remove(t._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
```

---

## 📄 7. Update Routes (client/src/App.tsx) 

```tsx
import NewTrainer from "./pages/new";
import EditTrainer from "./pages/edit";

// ADD:

<Route
  path="/new"
  element={
    <PrivateRoute>
      <NewTrainer />
    </PrivateRoute>
  }
/>

<Route
  path="/edit/:id"
  element={
    <PrivateRoute>
      <EditTrainer />
    </PrivateRoute>
  }
/>
```

---

## ▶️ Restart

```bash
docker compose down
docker compose up --build
```

---

## 🧪 Test Full Flow

### ✅ Add Trainer

### ✅ Edit Trainer

### ✅ Delete Trainer

### ✅ Search

---

# 🔷 5 - Advanced + Production Features

## 🧠 STEP 1 – Password Encryption (CRITICAL)

### 📦 Install bcrypt

Inside `server/`:

```bash
npm install bcrypt

npm install --save-dev @types/bcrypt
```

---

### ✏️ Update Login + Super User

#### 🔁 Replace in `index.ts`

```ts
import bcrypt from "bcrypt";
```

---

#### 🔐 Update Super User Creation

```ts
const createSuperUser = async () => {
  const exists = await AdminUser.findOne({ role: 4 });

  if (!exists) {
    const hashed = await bcrypt.hash("1234", 10);

    await AdminUser.create({
      email: "su@gmail.com",
      password: hashed,
      role: 4
    });

    console.log("Super user created");
  }
};
```

---

#### 🔐 Update Login API

```ts
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await AdminUser.findOne({ email });
  if (!user) return res.status(401).send("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).send("Invalid credentials");

  const token = jwt.sign(
    { user_id: user._id, email: user.email, role: user.role },
    JWT_SECRET
  );

  res.json({ token, role: user.role });
});
```

---

## 🧠 STEP 2 – Backend Pagination (REAL)

### ✏️ Update Trainers API

```ts
app.get("/api/trainers", authMiddleware, async (req, res) => {
  const { page = 1, limit = 5, search = "" }: any = req.query;

  const query = {
    name: { $regex: search, $options: "i" }
  };

  const data = await Trainer.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await Trainer.countDocuments(query);

  res.json({
    data,
    total
  });
});
```

---

## 🧠 STEP 3 – Role-Based UI

### 📄 Update login.tsx

```ts
if (res.token) {
  localStorage.setItem("token", res.token);
  localStorage.setItem("role", res.role);
  navigate("/");
}
```

---

### 📄 Update Home UI (IMPORTANT)

#### Add role check:

```ts
const role = Number(localStorage.getItem("role"));
```

---

#### Update Buttons:

```tsx
{role >= 1 && (
  <button className="btn btn-primary" onClick={() => navigate("/new")}>
    + Add
  </button>
)}
```

```tsx
{role >= 2 && (
  <button
    className="btn btn-warning btn-sm me-2"
    onClick={() => navigate(`/edit/${t._id}`)}
  >
    Edit
  </button>
)}
```

```tsx
{role >= 3 && (
  <button
    className="btn btn-danger btn-sm"
    onClick={() => remove(t._id)}
  >
    Delete
  </button>
)}
```

---

## 🧠 STEP 4 – Frontend Pagination

### ✏️ Update API

```ts
export const getTrainers = async (page = 1, search = "") => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${API_URL}/api/trainers?page=${page}&limit=5&search=${search}`,
    {
      headers: { Authorization: token || "" }
    }
  );

  return res.json();
};
```

---

### ✏️ Update Home

Add state:

```ts
const [page, setPage] = useState(1);
const [total, setTotal] = useState(0);
```

---

Update load:

```ts
const res = await getTrainers(page, search);
setTrainers(res.data);
setTotal(res.total);
```

---

Pagination UI:

```tsx
<div className="mt-3">
  <button
    className="btn btn-secondary me-2"
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    Prev
  </button>

  <button
    className="btn btn-secondary"
    disabled={page * 5 >= total}
    onClick={() => setPage(page + 1)}
  >
    Next
  </button>
</div>
```

---

## 🧠 STEP 5 – Audit Viewer (Manager/SU)

### 📄 Backend API

```ts
app.get(
  "/api/audit",
  authMiddleware,
  roleMiddleware([3, 4]),
  async (req, res) => {
    const logs = await Audit.find().sort({ updated_time: -1 }).limit(20);
    res.json(logs);
  }
);
```

---

### 📄 Frontend Page

```tsx
// pages/audit.tsx
import { useEffect, useState } from "react";
import PrivateNavbar from "../components/PrivateNavbar";

const Audit = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchAudit();
  }, []);

  const fetchAudit = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/audit", {
      headers: { Authorization: token || "" }
    });

    const data = await res.json();
    setLogs(data);
  };

  return (
    <>
      <PrivateNavbar />
      <div className="container mt-3">
        <h3>Audit Logs</h3>

        <ul className="list-group">
          {logs.map((l: any) => (
            <li key={l._id} className="list-group-item">
              {l.table} - {l.op}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Audit;

// App.tsx
import Audit from "./pages/audit";

...
        <Route
          path="/audit"
          element={
            <PrivateRoute>
              <Audit />
            </PrivateRoute>
          }
        />
...

// components/PrivateNavbar.tsx


...
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">Trainer Dashboard</span>

        <div className="d-flex gap-2">
          <Link to="/" className="btn btn-warning">
            Trainers
          </Link>

          <Link to="/audit" className="btn btn-warning">
            Audit
          </Link>

          <button className="btn btn-light" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
...
```

---

## 🧠 STEP 6 – Last Update API

### Backend

```ts
app.get("/api/last-update", async (req, res) => {
  const data = await LastUpdate.findOne();
  res.json(data);
});
```

---

### Use in UI (Optional Header)

```ts
const res = await fetch("/api/last-update");
```

---

## ▶️ Restart

```bash
docker compose down
docker compose up --build
```

---

## 🧠 What You Achieved (BIG)

✅ Secure password handling
✅ Real pagination (backend + frontend)
✅ Role-based UI + API enforcement
✅ Audit logging system (enterprise feature)
✅ System-wide update tracking
✅ Production-level architecture

---

# 🔷 6 - Production & Scaling

## 🎯 What We Will Do

✅ Production build (React → static)
✅ Nginx for client serving
✅ Multi-stage Docker builds
✅ Env separation (dev vs prod)
✅ Mongo indexing
✅ API validation
✅ Logging system
✅ Performance improvements

---

## 🧠 1. Production Architecture (What changes?)

### BEFORE (Dev)

```
Vite Dev Server → Node → Mongo
```

### AFTER (Production)

```
Browser → Nginx → Node API → Mongo
```

👉 No Vite dev server
👉 Faster + secure + scalable

---

## 📄 2. Client – Production Dockerfile (IMPORTANT)

Replace `client/Dockerfile`

```dockerfile id="2r3lq4"
# Stage 1: Build
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

---

## 📄 3. Nginx Config (Optional but better)

📁 `client/nginx.conf`

```nginx id="u8j1qk"
server {
  listen 80;

  location / {
    root /usr/share/nginx/html;
    index index.html;
    try_files $uri /index.html;
  }
}
```

Update Dockerfile:

```dockerfile id="p8l1d2"
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

---

## 📄 4. Server – Production Dockerfile

Replace `server/Dockerfile`

```dockerfile id="b2q6gh"
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g typescript
RUN tsc index.ts

EXPOSE 5000

CMD ["node", "index.js"]
```

---

## 📄 5. Separate ENV Files

### Root

```env id="yikp0f"
NODE_ENV=production
```

---

### client/.env.production

```env id="vl7qut"
VITE_API_URL=http://localhost:5000
```

---

### server/.env.production

```env id="4o0vaf"
APP_PORT=5000
MONGO_URI=mongodb://mongo:27017/trainerdb
JWT_SECRET=super_secure_secret
```

---

## 📄 6. docker-compose.prod.yml

```yaml id="2g3o9h"
version: "3.8"

services:
  mongo:
    image: mongo:7
    volumes:
      - mongo_data:/data/db

  server:
    build: ./server
    env_file:
      - server/.env.production
    ports:
      - "5000:5000"
    depends_on:
      - mongo

  client:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - server

volumes:
  mongo_data:
```

---

## ▶️ Run Production

```bash id="1e1k9k"
docker compose -f docker-compose.prod.yml up --build
```

---

## 🧠 7. Mongo Optimization (IMPORTANT)

Add index in `index.ts` after schema:

```ts id="m6mbm1"
TrainerSchema.index({ name: 1 });
```

👉 Improves search performance 🔥

---

## 🧠 8. API Validation (Professional)

Install:

```bash id="7r3xok"
npm install joi
```

---

### Example (Create Trainer)

```ts id="kdr6eq"
import Joi from "joi";

const trainerSchema = Joi.object({
  name: Joi.string().required(),
  skills: Joi.array().items(Joi.string()).required(),
  status: Joi.string().valid("Active", "Inactive")
});
```

Use:

```ts id="4r03t6"
const { error } = trainerSchema.validate(req.body);
if (error) return res.status(400).send(error.message);
```

---

## 🧠 9. Logging (Enterprise)

Install:

```bash id="p8d3b9"
npm install winston
```

---

### Logger Setup

```ts id="eq4b7k"
import winston from "winston";

const logger = winston.createLogger({
  transports: [new winston.transports.Console()]
});
```

Use:

```ts id="kn9l2s"
logger.info("Trainer created");
logger.error("Error occurred");
```

---

## 🧠 10. Security Improvements

### 🔐 Add Helmet

```bash id="k1nt0n"
npm install helmet
```

```ts id="drk6gk"
import helmet from "helmet";
app.use(helmet());
```

---

### 🔐 CORS Restrict

```ts id="6rm9n7"
app.use(cors({ origin: "http://localhost" }));
```

---

## 🧠 11. Performance Improvements

### ✔ Enable Gzip

```bash id="y5j1fw"
npm install compression
```

```ts id="m6b7g1"
import compression from "compression";
app.use(compression());
```

---

## 🧠 12. Future Scaling (Your Next Level)

When system grows:

| Component | Upgrade            |
| --------- | ------------------ |
| Node      | Cluster mode / PM2 |
| Mongo     | Replica Set        |
| API       | Gateway            |
| UI        | CDN                |
| Infra     | Kubernetes         |

---

## 🧠 Final Architecture (Your Level Now)

```
Nginx (Client)
     ↓
Node API (JWT + RBAC)
     ↓
Mongo (Indexed + Persistent Volume)
```

---

## 🏆 What You Achieved (SERIOUS LEVEL)

You now built:

✅ Full MERN system (TypeScript)
✅ Dockerized (WSL Engine)
✅ Auth + RBAC
✅ Audit system
✅ Production build (Nginx)
✅ Validation + Logging
✅ Performance tuning
✅ Dev → Prod separation

---

# 🔷 7 - Photo Upload and Change Password

## 🚀 Phase 7 – Step 1

### 🖼️ Backend File Upload (Multer Setup)

Goal:

✅ Upload image via API
✅ Store in `/uploads/trainer_photos`
✅ Return file path
✅ Test via Postman

---

## 📦 1. Install Dependencies

Inside `server/`:

```bash
npm install multer
npm install -D @types/multer
```

---

## 📁 2. Create Upload Folder

```bash
mkdir -p uploads/trainer_photos
```

---

## 🧠 3. Update `index.ts` (IMPORTANT)

#### 👉 Add imports at top

```ts
import multer from "multer";
import path from "path";
import fs from "fs";
```

---

## 🧠 4. Configure Multer Storage

Add this **before routes**:

```ts
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/trainer_photos";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname;
    cb(null, unique);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});
```

---

## 🧠 5. File Type Validation (VERY IMPORTANT)

Add:

```ts
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed"), false);
  }
};
```

Update multer:

```ts
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }
});
```

---

## 🧠 6. Serve Static Files

Add this:

```ts
app.use("/uploads", express.static("uploads"));
```

👉 Now browser can access:

```
http://localhost:5000/uploads/filename.jpg
```

---

## 🚀 7. Create Upload API (Test Endpoint)

```ts
app.post(
  "/api/upload",
  authMiddleware,
  upload.single("photo"),
  (req: any, res) => {
    if (!req.file) return res.status(400).send("No file");

    res.json({
      path: `/uploads/trainer_photos/${req.file.filename}`
    });
  }
);
```

---

## 🔁 Restart Docker

```bash
docker compose down
docker compose up --build
```

---

## 🧪 8. Test Using Postman

### Request:

```http
POST http://localhost:5000/api/upload
```

Headers:

```
Authorization: <token>
```

Body:

* form-data

  * key: `photo`
  * type: File
  * select image

---

### ✅ Expected Response

```json
{
  "path": "/uploads/trainer_photos/1712345678-image.jpg"
}
```

---

## 🌐 Test in Browser

Open:

```
http://localhost:5000/uploads/trainer_photos/<filename>
```

👉 Image should load ✅

---

## ⚠️ IMPORTANT (Docker Volume)

To persist files, update `docker-compose.yml`:

```yaml
server:
  volumes:
    - ./server:/app
    - ./server/uploads:/app/uploads   ## ADD THIS
    - /app/node_modules
```

---

## 🧠 What You Achieved

✅ File upload system
✅ Secure validation (image only)
✅ Size restriction
✅ Static file serving
✅ Docker persistence

## 🚀 Phase 7 – Step 2

### 🧩 Integrate Photo Upload with Trainer Create API

Goal:

✅ Single API → create trainer + upload photo
✅ Store photo path in Mongo
✅ No separate upload call needed
✅ Works from Postman + Frontend

---

## 🧠 Design Change

#### ❌ Before

```id="u5y7fd"
POST /api/trainers (JSON only)
```

#### ✅ Now

```id="7x8q0y"
POST /api/trainers (multipart/form-data)
```

👉 Supports:

* text fields
* file upload together

---

## 🛠️ 1. Update Backend API

### 🔁 Replace your existing CREATE API

Find this:

```ts
app.post("/api/trainers", ...)
```

---

### ✅ Replace with:

```ts id="3c7h4f"
app.post(
  "/api/trainers",
  authMiddleware,
  roleMiddleware([1, 2, 3, 4]),
  upload.single("photo"),
  async (req: any, res) => {
    try {
      const { name, skills, status } = req.body;

      const trainer = await Trainer.create({
        name,
        skills: skills ? skills.split(",") : [],
        status,
        photo: req.file
          ? `/uploads/trainer_photos/${req.file.filename}`
          : "",
        updated_user_id: req.user.user_id
      });

      await logAudit("trainer", "create", trainer);

      res.json(trainer);
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  }
);
```

---

## 🧠 2. Important Notes

#### ✔ `skills` comes as string

👉 `"React,Node"` → converted to array

---

#### ✔ `req.file`

* Available only if file uploaded
* Optional (safe handling)

---

#### ✔ Photo path stored like:

```id="mbrl9n"
/uploads/trainer_photos/abc.jpg
```

---

## 🔁 Restart

```bash id="y9y14f"
docker compose down
docker compose up --build
```

---

## 🧪 3. Test in Postman

### Request

```http id="0k98p2"
POST http://localhost:5000/api/trainers
```

Headers:

```id="gcrq47"
Authorization: <token>
```

---

### Body → form-data

| Key    | Type | Value          |
| ------ | ---- | -------------- |
| name   | Text | John           |
| skills | Text | React,Node     |
| status | Text | Active         |
| photo  | File | (select image) |

---

### ✅ Response

```json id="lxyf6a"
{
  "_id": "...",
  "name": "John",
  "skills": ["React", "Node"],
  "photo": "/uploads/trainer_photos/xyz.jpg"
}
```

---

## 🌐 4. Verify Image

```id="r3csxg"
http://localhost:5000/uploads/trainer_photos/xyz.jpg
```

👉 Should display image ✅

---

## 🧠 What You Achieved

✅ Combined API (file + data)
✅ Real-world multipart handling
✅ Mongo + file system sync
✅ Cleaner frontend (single call)

---

## ⚠️ Next Problem (Very Important)

👉 Update Trainer (edit) **does NOT handle photo yet**

👉 Also:

* Old photo not deleted ❌
* Photo update API missing ❌

---

## 🚀 Phase 7 – Step 3

### 🔁 Update Trainer Photo API (with old file cleanup)

---

## 🎯 Goal

✅ Update only trainer photo
✅ Delete old image from disk
✅ Avoid storage leaks
✅ Keep DB + filesystem in sync

---

## 🧠 API Design

```http
PUT /api/trainers/:id/photo
```

* Input: `multipart/form-data`
* Field: `photo` (file)

---

## 🛠️ 1. Add API in `index.ts`

👉 Add this below existing routes

```ts id="v4m2pt"
app.put(
  "/api/trainers/:id/photo",
  authMiddleware,
  roleMiddleware([2, 3, 4]),
  upload.single("photo"),
  async (req: any, res) => {
    try {
      const { id } = req.params;

      if (!req.file) return res.status(400).send("No file uploaded");

      // 1️⃣ Get existing trainer
      const trainer = await Trainer.findById(id);
      if (!trainer) return res.status(404).send("Trainer not found");

      // 2️⃣ Delete old photo (if exists)
      if (trainer.photo) {
        const oldPath = trainer.photo.replace("/uploads/", "uploads/");
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      // 3️⃣ Save new photo path
      const newPath = `/uploads/trainer_photos/${req.file.filename}`;

      trainer.photo = newPath;
      trainer.updated_time = new Date();

      await trainer.save();

      // 4️⃣ Audit
      await logAudit("trainer", "update_photo", {
        id,
        photo: newPath
      });

      res.json({ message: "Photo updated", photo: newPath });
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  }
);
```

---

## 🧠 2. Key Logic Explained

#### 🔴 Old File Deletion

```ts id="tqglkh"
fs.unlinkSync(oldPath);
```

👉 Prevents:

* disk filling
* orphan files

---

#### 🔴 Path Fix

```ts id="9ew40b"
.replace("/uploads/", "uploads/")
```

👉 Converts:

```id="m6n9j0"
/uploads/trainer_photos/a.jpg
```

➡️ to actual file path:

```id="2y7h03"
uploads/trainer_photos/a.jpg
```

---

## 🔁 Restart

```bash id="90svy1"
docker compose down
docker compose up --build
```

---

## 🧪 3. Test in Postman

### Request

```http id="v1p7gl"
PUT http://localhost:5000/api/trainers/<id>/photo
```

Headers:

```id="i1ccj9"
Authorization: <token>
```

Body → form-data:

| Key   | Type | Value              |
| ----- | ---- | ------------------ |
| photo | File | (select new image) |

---

### ✅ Expected Response

```json id="d92qhz"
{
  "message": "Photo updated",
  "photo": "/uploads/trainer_photos/new.jpg"
}
```

---

## 🧪 4. Verify

#### ✔ Old image deleted

#### ✔ New image accessible

```id="p0k3fz"
http://localhost:5000/uploads/trainer_photos/new.jpg
```

---

## ⚠️ Edge Cases (Handled)

✔ No file uploaded
✔ Trainer not found
✔ Old file missing (safe check)

---

## 🧠 What You Achieved

✅ File replacement logic
✅ Disk cleanup (VERY IMPORTANT in real apps)
✅ Partial update API
✅ Clean audit logging

---

## 🚀 Phase 7 – Step 4

### 🖥️ Frontend Integration (File Upload + Preview)

---

## 🎯 Goal

✅ Upload image from UI
✅ Send via `FormData`
✅ Show preview before upload
✅ Display uploaded image
✅ Work for **Create + Edit**

---

## 🧠 Key Change

#### ❌ Before

```ts
JSON API
```

#### ✅ Now

```ts
FormData (multipart)
```

---

## 📄 1. Update API (services/api.ts)

### 🔁 Replace `createTrainer`

```ts id="q2r7o1"
export const createTrainer = async (form: any) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("skills", form.skills);
  formData.append("status", form.status);

  if (form.photoFile) {
    formData.append("photo", form.photoFile);
  }

  const res = await fetch(`${API_URL}/api/trainers`, {
    method: "POST",
    headers: {
      Authorization: token || ""
    },
    body: formData
  });

  return res.json();
};
```

---

## 📄 2. Update TrainerForm (IMPORTANT)

### 🔁 Replace your `TrainerForm.tsx`

```tsx id="6m4j9z"
import { useEffect, useState } from "react";
import {
  createTrainer,
  updateTrainer,
  getTrainerById
} from "../services/api";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const TrainerForm = ({ mode, id }: any) => {
  const [form, setForm] = useState<any>({
    name: "",
    skills: "",
    status: "Active",
    photoFile: null,
    photoPreview: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "edit" && id) load();
  }, [id]);

  const load = async () => {
    const data = await getTrainerById(id);

    setForm({
      ...data,
      skills: data.skills.join(","),
      photoPreview: data.photo
        ? API_URL + data.photo
        : ""
    });
  };

  // 📸 Handle file selection
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];

    setForm({
      ...form,
      photoFile: file,
      photoPreview: URL.createObjectURL(file)
    });
  };

  const handleSubmit = async () => {
    if (mode === "new") {
      await createTrainer(form);
    } else {
      // Update basic fields first
      await updateTrainer(id, {
        name: form.name,
        skills: form.skills.split(","),
        status: form.status
      });

      // Update photo separately if selected
      if (form.photoFile) {
        const fd = new FormData();
        fd.append("photo", form.photoFile);

        const token = localStorage.getItem("token");

        await fetch(`${API_URL}/api/trainers/${id}/photo`, {
          method: "PUT",
          headers: { Authorization: token || "" },
          body: fd
        });
      }
    }

    navigate("/");
  };

  return (
    <div className="container mt-3">
      <h3>{mode === "new" ? "Create" : "Edit"} Trainer</h3>

      <input
        className="form-control mb-2"
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        className="form-control mb-2"
        placeholder="Skills (comma separated)"
        value={form.skills}
        onChange={(e) =>
          setForm({ ...form, skills: e.target.value })
        }
      />

      <select
        className="form-control mb-2"
        value={form.status}
        onChange={(e) =>
          setForm({ ...form, status: e.target.value })
        }
      >
        <option>Active</option>
        <option>Inactive</option>
      </select>

      {/* 📸 File Upload */}
      <input
        type="file"
        className="form-control mb-2"
        onChange={handleFileChange}
      />

      {/* 👁 Preview */}
      {form.photoPreview && (
        <img
          src={form.photoPreview}
          alt="preview"
          width="120"
          className="mb-2"
        />
      )}

      <button className="btn btn-success" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
};

export default TrainerForm;
```

---

## 📄 3. Show Image in List Page

Update `pages/index.tsx`

#### Add column:

```tsx id="7bgz9e"
<th>Photo</th>
```

---

#### Show image:

```tsx id="6y9g2j"
<td>
  {t.photo && (
    <img
      src={API_URL + t.photo}
      width="50"
      height="50"
    />
  )}
</td>
```

---

## 🔁 Restart

```bash id="f09k2q"
docker compose down
docker compose up --build
```

---

## 🧪 Test Flow

### ✅ Create Trainer

* Select image
* Save
* Image should appear in list

---

### ✅ Edit Trainer

* Change image
* Old image deleted ✔
* New image shown ✔

---

## ⚠️ Common Issues

#### ❌ Image not loading

✔ Check URL:

```id="kq2u9l"
http://localhost:5000/uploads/...
```

---

#### ❌ CORS issue

✔ Ensure backend:

```ts id="2l5qv8"
app.use(cors());
```

---

## 🧠 What You Achieved

✅ File upload UI
✅ Image preview UX
✅ Multipart API integration
✅ Clean edit flow (data + file separation)
✅ Real-world frontend pattern

---

## 🚀 Phase 7 – Step 5

### 🔐 Change Password (Backend + Frontend)

---

## 🎯 Goal

✅ User can change password
✅ Verify old password
✅ Hash new password (bcrypt)
✅ Secure API
✅ Simple UI

---

## 🧠 1. Backend API

### 📄 Add in `index.ts`

```ts id="r8z2k1"
app.put("/api/change-password", authMiddleware, async (req: any, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).send("Missing fields");
    }

    // 1️⃣ Get user
    const user = await AdminUser.findById(req.user.user_id);
    if (!user) return res.status(404).send("User not found");

    // 2️⃣ Verify old password
    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) return res.status(401).send("Old password incorrect");

    // 3️⃣ Hash new password
    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;
    user.updated_time = new Date();

    await user.save();

    // 4️⃣ Audit
    await logAudit("admin_users", "change_password", {
      user_id: user._id
    });

    res.json({ message: "Password updated successfully" });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
```

---

## 🧠 2. Frontend API

### 📄 services/api.ts

```ts id="k6j9x2"
export const changePassword = async (data: any) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token || ""
    },
    body: JSON.stringify(data)
  });

  return res.json();
};
```

---

## 📄 3. Create Page

```bash id="4m2f9l"
touch src/pages/change-password.tsx
```

---

### 📄 change-password.tsx

```tsx id="d5v8q1"
import { useState } from "react";
import PrivateNavbar from "../components/PrivateNavbar";
import { changePassword } from "../services/api";

const ChangePassword = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const handleSubmit = async () => {
    const res = await changePassword(form);

    if (res.message) {
      alert("Password changed successfully");
      setForm({ oldPassword: "", newPassword: "" });
    } else {
      alert("Error: " + res);
    }
  };

  return (
    <>
      <PrivateNavbar />
      <div className="container mt-3">
        <h3>Change Password</h3>

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Old Password"
          value={form.oldPassword}
          onChange={(e) =>
            setForm({ ...form, oldPassword: e.target.value })
          }
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="New Password"
          value={form.newPassword}
          onChange={(e) =>
            setForm({ ...form, newPassword: e.target.value })
          }
        />

        <button className="btn btn-primary" onClick={handleSubmit}>
          Update Password
        </button>
      </div>
    </>
  );
};

export default ChangePassword;
```

---

## 📄 4. Add Route

### Update `App.tsx`

```tsx id="9k2x8f"
import ChangePassword from "./pages/change-password";
```

Add route:

```tsx id="z1n8p4"
<Route
  path="/change-password"
  element={
    <PrivateRoute>
      <ChangePassword />
    </PrivateRoute>
  }
/>
```

---

## 📄 5. Add Menu in Navbar

### Update `PrivateNavbar.tsx`

```tsx id="p6w3m9"
<button
  className="btn btn-light me-2"
  onClick={() => navigate("/change-password")}
>
  Change Password
</button>
```

---

## 🔁 Restart

```bash id="x8p3k2"
docker compose down
docker compose up --build
```

---

## 🧪 Test Flow

### ✅ Step 1

Login → go to **Change Password**

---

### ✅ Step 2

Enter:

```id="2f7k1m"
old: 1234
new: 5678
```

---

### ✅ Step 3

Logout → Login again

✔ Old password ❌
✔ New password ✅

---

## ⚠️ Important Improvements (Optional but Strong)

#### 🔒 Add validation

```ts id="q2x7v9"
if (newPassword.length < 6)
```

---

#### 🔒 Force logout after change

```ts id="k7v2x1"
localStorage.removeItem("token");
```

---

## 🧠 What You Achieved

✅ Secure password update
✅ bcrypt integration (real security)
✅ Authenticated user action
✅ Audit logging
✅ Clean UI flow

---

## 🏆 FINAL SYSTEM STATUS

You now have:

✅ Auth (JWT + RBAC)
✅ Trainer CRUD
✅ File upload + image handling
✅ Audit system
✅ Pagination + search
✅ Change password
✅ Dockerized full stack
✅ Production-ready setup

---

## 🚀 You Are Now At

👉 **Full MERN + DevOps + Security level (job-ready)** 💯

---