## ▶️ Run Production
```bash id="1e1k9k"
docker compose -f docker-compose.prod.yml up --build
```

# In one terminal:
Run docker engine (daemon) in one terminal.
```bash
dockerd & 

# To Stop 
Ctrl + X
```
# In another terminal:
```bash
docker compose down
docker compose up --build -d
```

# Docker service stop
```bash
sudo systemctl stop docker

# To stop associated docker socket
sudo systemctl stop docker.socket

# Older system (For me)
sudo service docker stop

# To check service status Older system
sudo service docker status
```

# To stop the docker compose:
```bash
docker compose stop 

# to start again
docker compose start
```

# docker-compose.yml
```yml
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

# client/Dockerfile
```Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
```

# server/Dockerfile
```Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
```