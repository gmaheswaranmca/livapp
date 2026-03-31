# ✅ 1. Docker Mongo and Mongo Shell Command 

## Docker Mongo 
```bash
# Pull MongoDB Image
docker pull mongo

# Create & Run MongoDB Container
# docker run -d --name trainer_mongo -p 27017:27017 mongo
#   !trainer_mongo is mongo-name ie container name

# OR Create & Run MongoDB Container & To persist data:
docker run -d --name trainer_mongo -p 27017:27017  -v z1001_mongo_data:/data/db mongo

# Verify Container Running
docker ps
#   !trainer_mongo container is running 

# List All Volumes
docker volume ls

# Connect to Mongo Shell
docker exec -it trainer_mongo mongosh
```

## Work with mongo
```bash
show dbs

use testdb

db.users.insertOne({ name: "Mahesh", role: "trainer" })

db.users.find()

# Exit Mongo Shell
exit
```

## Cleanup
```bash
# Stop Container
docker stop trainer_mongo

# Remove Container
docker rm trainer_mongo

# One-Line Full Cleanup (Force)
# docker rm -f trainer_mongo

# (Optional) Remove Image
# docker rmi mongo # uncomment

# Remove a Specific Volume
#     - To remove: Make Sure volume is not in use
#     - Stop and Remove containers using the volume
docker volume rm z1001_mongo_data
```

# Server (Express Typescript)

## Container using Node image 
```
mkdir z1001
cd z1001
mkdir server
cd server
alias node-docker='docker run --rm -it -v ${PWD}:/app -w /app node:20'
node-docker npm init -y
node-docker npm install express mongoose cors dotenv
node-docker npm install -D ts-node-dev typescript
node-docker npm install -D @types/cors
node-docker npm install -D @types/express @types/node 

# ! Node project creation by temp container, and install packages by temp container
# ! After execution of the command, container is removed automatically
```

## z1001/server/Dockerfile
```Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
```

## 📄 Server – package.json

📁 `server/package.json`

```json
{
  ..
  "main": "index.js",
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only index.ts"
  },
  ..
}
```

## Server – tsconfig.json

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

## Server Code (To Test)
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

## Build image from Dockerfile

```bash
docker build -t z1001_server .
# Run Container
# docker run -p 5173:5173 --env-file .env -d --name z1001_server z1001_server
docker run -p 5173:5173 -d --name z1001_server z1001_server
```


## Cleanup
```bash
docker stop z1001_server
docker rm z1001_server
```

# 📄 Client (React TS)