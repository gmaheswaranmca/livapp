#!/bin/bash

echo "🧹 Starting Docker cleanup..."

echo "➡️ Stopping running containers..."
docker stop $(docker ps -q) 2>/dev/null

echo "➡️ Removing stopped containers..."
docker container prune -f

echo "➡️ Removing unused images..."
docker image prune -a -f

echo "➡️ Removing unused volumes..."
docker volume prune -f

echo "➡️ Removing unused networks..."
docker network prune -f

echo "➡️ Cleaning system..."
docker system prune -f

echo "✅ Docker cleanup completed!"

# chmod +x cleanup.sh
# ./cleanup.sh