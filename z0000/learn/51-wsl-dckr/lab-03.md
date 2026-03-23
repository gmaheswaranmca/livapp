# Lab 3
```
Install "mern_dockr" from "ubuntu_dockr.tar"
ie wsl --import mern_dockr D:\WSL\mern_dockr D:\WSL\Downloads\ubuntu_dockr.tar
Install MERN setup using docker-compose and docker files
Work with "mern_dockr"
```


```bash
# Shutdown ie stop all distributions
wsl --shutdown

# Import base ubuntu_dockr as `node_dockr`
# Make sure D:\WSL\mern_dockr is existing
wsl --import mern_dockr D:\WSL\mern_dockr D:\WSL\Downloads\ubuntu_dockr.tar

# Verify:
wsl -l -v

# Open node_dockr:
wsl -d mern_dockr

# Test:
docker --version
docker compose version

# Exit:
    $ exit
```

### 📁 Project Structure
### Make Sure dir "D:\2C\mywork2603\source\ex01\mern_home" exist
mern_home/
 ├── docker-compose.yml
 ├── server/
 └── client/

# Structure
mern_home/
 ├── docker-compose.yml
 ├── server/
 │    ├── Dockerfile
 │    ├── package.json
 │    ├── tsconfig.json
 │    └── app.ts   👈 (single file as you requested)
 └── client/
      ├── Dockerfile
      ├── index.html
      ├── package.json
      ├── tsconfig.json
      ├── vite.config.ts
      └── src/
           ├── main.tsx
           ├── App.tsx
           ├── pages/
           │    ├── List.tsx
           │    ├── Create.tsx
           │    └── Edit.tsx

### Make server client dirs
mkdir server
mkdir client

---

### docker-compose.yml

```yaml
version: '3.8'

services:
  mongo:
    image: mongo
    container_name: mongo
    ports:
      - "27017:27017"

  server:
    build: ./server
    container_name: server
    ports:
      - "5000:5000"
    depends_on:
      - mongo

  client:
    build: ./client
    container_name: client
    ports:
      - "3000:3000"
    depends_on:
      - server
```

## server 

### Dockerfile (Node + Express)

```dockerfile
FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 5000

CMD ["npm", "start"]
```

### 📦 server/package.json

```json
{
  "name": "server",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "ts-node app.ts"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "ts-node": "^10.9.1",
    "typescript": "^5.0.0",
    "@types/express": "^4.17.17",
    "@types/node": "^20.0.0"
  }
}
```
### ⚙️ server/tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true
  }
}
```

### 🧠 server/app.ts (Single File ODM App)

```ts
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

/* =========================
   Mongo Connection
========================= */
mongoose.connect("mongodb://mongo:27017/trainerdb")
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log(err));

/* =========================
   Schema + ODM
========================= */
interface ITrainer {
  name: string;
  skills: string[];
}

const TrainerSchema = new mongoose.Schema<ITrainer>({
  name: { type: String, required: true },
  skills: [String]
});

const Trainer = mongoose.model<ITrainer>("Trainer", TrainerSchema);

/* =========================
   CRUD APIs
========================= */

// CREATE
app.post("/trainers", async (req, res) => {
  const trainer = new Trainer(req.body);
  await trainer.save();
  res.json(trainer);
});

// READ ALL
app.get("/trainers", async (req, res) => {
  const trainers = await Trainer.find();
  res.json(trainers);
});

// READ ONE
app.get("/trainers/:id", async (req, res) => {
  const trainer = await Trainer.findById(req.params.id);
  res.json(trainer);
});

// UPDATE
app.put("/trainers/:id", async (req, res) => {
  const trainer = await Trainer.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(trainer);
});

// DELETE
app.delete("/trainers/:id", async (req, res) => {
  await Trainer.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

/* ========================= */
app.listen(5000, () => console.log("Server running on 5000"));
```

---

### client Dockerfile (React)

```dockerfile
FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3000

CMD ["npm", "start"]
```

### 🔹 Run MERN

```bash
# Run in one terminal
update-alternatives --config iptables
    You’ll see options like:
        1. /usr/sbin/iptables-nft
        2. /usr/sbin/iptables-legacy
    Select:
        iptables-legacy
# Do same for others
update-alternatives --config ip6tables
update-alternatives --config arptables
update-alternatives --config ebtables

# Exit
# 
wsl --shutdown

# Open mern_dockr:
wsl -d mern_dockr

# Run docker in this terminal
dockerd &

# Run in another terminal
# Make sure minimal working code we have
docker compose up --build
```

👉 Access:

* Frontend → [http://localhost:3000](http://localhost:3000)
* Backend → [http://localhost:5000](http://localhost:5000)
* Mongo → port 27017

---

## Export MERN-ready image

Exit WSL:

```bash
exit
```

Export:

```powershell
wsl --export mern_dockr D:\WSL\Downloads\mern_dockr.tar
```

---

## Remove mern_dockr

```powershell
wsl --unregister mern_dockr
```

---

## Import final working image

```powershell
wsl --import mern_dockr D:\WSL\mern_dockr D:\WSL\Downloads\mern_dockr.tar
```

Run:

```powershell
wsl -d mern_dockr
```