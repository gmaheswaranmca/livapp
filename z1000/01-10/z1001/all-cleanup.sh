#!/bin/bash

echo "🔥 FULL Docker cleanup (including volumes)"

docker compose down -v 2>/dev/null

docker stop $(docker ps -q) 2>/dev/null
docker rm $(docker ps -aq) 2>/dev/null

docker rmi $(docker images -q) 2>/dev/null

docker volume rm $(docker volume ls -q) 2>/dev/null

docker network rm $(docker network ls -q) 2>/dev/null

docker system prune -a --volumes -f

echo "💀 Everything cleaned!"
