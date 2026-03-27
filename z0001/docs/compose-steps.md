# In one terminal:
Run docker engine (daemon) in one terminal.
```bash
dockerd & 
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