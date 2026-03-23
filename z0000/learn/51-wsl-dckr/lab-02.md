# Lab 2
```
Install "ubuntu_dockr" from "ubuntu2404lts.tar"
ie wsl --import ubuntu_dockr D:\WSL\ubuntu2404 D:\WSL\Downloads\ubuntu2404lts.tar
Inside "ubuntu_dockr":
    Install docker, docker-compose 
Take Copy of "ubuntu_dockr" as ubuntu_dockr.tar
#
Install MERN setup using docker-compose and docker files
Take Copy of "ubuntu_dockr" as ubuntu_dockr_mern.tar
Uninstall "ubuntu_dockr"
Work with "ubuntu_dockr_mern"
```

```bash
# Shutdown ie stop all distributions
wsl --shutdown

# Import base ubuntu2404lts as `ubuntu_dockr`
# Make sure D:\WSL\ubuntu_dockr is existing
wsl --import ubuntu_dockr D:\WSL\ubuntu_dockr D:\WSL\Downloads\ubuntu2404lts.tar

# Verify:
wsl -l -v

# Open ubuntu_dockr:
wsl -d ubuntu_dockr

# Basic setup inside Ubuntu
apt update && apt upgrade -y
apt install -y ca-certificates curl gnupg lsb-release

# Install Docker
# Add Docker GPG key
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Add repo
# echo \
#   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
#   https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
#   > /etc/apt/sources.list.d/docker.list

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
| tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Test:
docker --version
docker compose version

# Optional (avoid sudo):
usermod -aG docker $USER

# Then restart WSL:
wsl --shutdown

# Export:
wsl --unregister 
```


```bash
# Shutdown ie stop all distributions
wsl --shutdown

# Import base ubuntu_dockr as `node_dockr`
# Make sure D:\WSL\node_dockr is existing
wsl --import node_dockr D:\WSL\node_dockr D:\WSL\Downloads\ubuntu_dockr.tar

# Verify:
wsl -l -v

# Open node_dockr:
wsl -d node_dockr

# Exit:
    $ exit

# Uninstall ubuntu_dockr
wsl --unregister ubuntu_dockr

# Open node_dockr:
wsl -d node_dockr
```


### 📁 Project Structure
### Make Sure dir "D:\2C\mywork2603\source\ex01\node_dockr_home" exist
node_dockr_home/
 ├── docker-compose.yml
 ├── backend/
 └── frontend/

### Make backend frontend dirs
mkdir backend
mkdir frontend

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

  backend:
    build: ./backend
    container_name: backend
    ports:
      - "5000:5000"
    depends_on:
      - mongo

  frontend:
    build: ./frontend
    container_name: frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

### Backend Dockerfile (Node + Express)

```dockerfile
FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 5000

CMD ["npm", "start"]
```

---

### Frontend Dockerfile (React)

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

# Open node_dockr:
wsl -d node_dockr

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
wsl --export mern_dockr D:\WSL\Downloads\ubuntu_dockr.tar
```

---

## Remove original instance

```powershell
wsl --unregister ubuntu_dockr
```

---

## Import final working image

```powershell
wsl --import ubuntu_dockr_mern D:\WSL\ubuntu_dockr_mern D:\WSL\ubuntu_dockr_mern.tar
```

Run:

```powershell
wsl -d ubuntu_dockr_mern
```