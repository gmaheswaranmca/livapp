## 🌐 Network — as a **Docker Engine Resource**

A **Docker Network** is the resource that enables **communication between containers, the host, and external systems**.

👉 Without networks, containers would be **isolated processes with no connectivity**

---

## 🧠 What exactly is a Docker Network?

![Image](https://miro.medium.com/1%2AMxxCmxxE1bc1BOXaOAKm-w.jpeg)

![Image](https://devtodevops.com/_devtodevops/Docker-Network-Bridge-vs-Overlay-Difference.fz7_I9WM.png)

![Image](https://global.discourse-cdn.com/docker/original/3X/d/8/d88ce06c8cc3f6f3d1564432c8755815f9b57ed1.png)

![Image](https://global.discourse-cdn.com/docker/original/3X/3/3/3397026f72da553a00edac368a9ceb564e5f9135.png)

* A virtual network managed by Docker Engine
* Connects:

  * container ↔ container
  * container ↔ host
  * container ↔ internet

👉 Each container gets:

* IP address
* DNS name
* network interface

---

# ⚙️ Core Functionalities of Docker Network

## 1. 🔗 Container Communication

👉 Allows containers to talk to each other

Example:

```bash
docker network create mynet
docker run --network mynet nginx
docker run --network mynet redis
```

✔ Containers communicate using:

* IP address
* container name (DNS)

---

## 2. 🌍 External Connectivity (Internet Access)

* Containers can access internet
* Used for:

  * API calls
  * package installs (`npm install`, `apt-get`)

---

## 3. 🔌 Port Mapping (Host ↔ Container)

```bash
docker run -p 8080:80 nginx
```

👉 Engine:

* maps host port → container port

✔ Access:

```
localhost:8080 → container:80
```

---

## 4. 📛 Service Discovery (DNS)

👉 Built-in DNS system

* Container name → IP automatically resolved

Example:

```bash
http://redis:6379
```

✔ No need to hardcode IPs

---

## 5. 🔐 Network Isolation

👉 Containers in different networks:

* cannot communicate (by default)

✔ Improves:

* security
* microservice isolation

---

## 6. 🌐 Multi-Host Networking (Overlay)

👉 Used in clusters (Docker Swarm / Kubernetes)

* Connects containers across multiple machines

---

## 7. ⚙️ Network Drivers Support

Docker supports different network types:

| Driver  | Description          |
| ------- | -------------------- |
| bridge  | default, single host |
| host    | shares host network  |
| overlay | multi-host           |
| none    | no network           |

---

# 🔄 How Docker Engine Handles Networking

### Example:

```bash
docker run -d -p 3000:3000 node-app
```

### Inside Engine:

1. `dockerd`:

   * selects network (default bridge)

2. Creates:

   * virtual Ethernet pair (veth)
   * connects container to bridge

3. Assigns:

   * IP address

4. Configures:

   * iptables rules (for port mapping)

5. Enables:

   * DNS resolution

---

# 🧩 Internal Components Used

* Linux bridge (`docker0`)
* veth pairs
* iptables / NAT
* network namespaces

---

# 🧠 Types of Docker Networks

## 1. Bridge (Default)

* Used for single host
* Containers get private IP

---

## 2. Host

```bash
docker run --network host nginx
```

* No isolation
* Uses host IP directly

---

## 3. Overlay

* Multi-host networking
* Used in clusters

---

## 4. None

* No network access

---

# 🧩 What Network Resource Contains

| Component     | Description           |
| ------------- | --------------------- |
| IP Address    | Assigned to container |
| DNS           | Name resolution       |
| Interfaces    | Virtual NIC           |
| Routing Rules | Traffic flow          |
| NAT Rules     | Port mapping          |

---

# ⚠️ Important Behavior

* Containers in same network → can communicate
* Containers in different networks → isolated
* Port mapping required for external access

---

# 🧠 Real Example

```bash
docker network create app-net

docker run -d --name backend --network app-net node-app
docker run -d --name frontend --network app-net react-app
```

👉 Engine ensures:

* frontend → backend communication
* DNS resolution (`backend`)

---

# 🎯 Role of Network in Docker Engine

👉 Network is the **communication layer**

It connects:

* containers
* services
* external systems

---

# 🧠 One-Line Summary

👉 **Docker Network is a virtual networking resource that enables secure communication, isolation, and connectivity between containers, host, and external systems.**
