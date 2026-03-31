# Dir
```
z1001
    - server
        Dockerfile
```

# z1001/server/Dockerfile

```Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev", "--", "--host"]
```

# Docker based mongo and server containers
```bash
# Create a Network
docker network create z1001_network

# Run Mongo Container
docker run -d \
  --name z1001_mongo_box \
  --network z1001_network \
  --restart always \
  -p 27017:27017 \
  -v mongo_z1001_data:/data/db \
  mongo:7

# Build Server Image
docker build -t z1001_server_image ./server

# Run Server Container
docker run -d \
  --name z1001_server \
  --network z1001_network \
  --restart always \
  -p 5000:5000 \
  --env-file ./server/.env \
  -v $(pwd)/server:/app \
  -v /app/node_modules \
  z1001_server_image

# Check containers
docker ps

# Check logs
docker logs z1001_server

# Check network
docker network inspect z1001_network

# Test connectivity
docker exec -it z1001_server sh
# Inside:
getent hosts z1001_mongo_box

# Access App
http://localhost:5000

# OR
# Run /server_test/api.http -> Send Request 

# Cleanup
docker stop z1001_server z1001_mongo
docker rm z1001_server z1001_mongo
docker network rm z1001_network
```