# Mongo

## Prerequisite
```
# Run docker daemon
dockerd &
```

## Using Mongo compose
```
# Up mongo docker
docker compose up --build -d

# Connect to mongo shell
docker compose exec z1002_mongo_box mongosh

# Clean up mongo docker
docker compose down
```

## Using Docker Command 
```
# Run Mongo Container
docker run -d \
  --name z1002_mongo_box \
  --restart always \
  -p 27017:27017 \
  -v mongo_z1002_data:/data/db \
  mongo:7

# Test connectivity
docker exec -it z1001_server sh

# Connect to mongo shell

# Cleanup
docker stop z1001_mongo
docker rm z1001_mongo
```