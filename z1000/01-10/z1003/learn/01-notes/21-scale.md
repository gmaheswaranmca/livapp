## 21. Scaling & Architecture 🔥 (Replication, Sharding, High Availability)

---

## 🔹 What is Scaling?

Scaling is the ability of a database system to **handle increasing load (users, data, queries)**.

👉 In simple terms:

> Scaling = “Handle more users without slowing down”

---

## 🔹 Types of Scaling

| Type               | Description                      |
| ------------------ | -------------------------------- |
| Vertical Scaling   | Increase server power (CPU, RAM) |
| Horizontal Scaling | Add more servers                 |

---

### 🔸 Vertical Scaling

* Upgrade server (8GB → 32GB RAM)
* Simple but limited

---

### 🔸 Horizontal Scaling 🔥

* Add multiple DB servers
* Distribute load
* Used in production systems

---

# 🔸 1. Replication (Master–Replica) 🔥

---

## 🔹 What is Replication?

Copy data from one DB server (**Primary**) to another (**Replica**).

---

## 🔹 Architecture

```
Primary (Write)
   ↓
Replica (Read)
```

---

## 🔹 How It Works

* Writes → Primary
* Reads → Replicas

---

## 🔹 Benefits

✔ Load balancing
✔ Backup
✔ High availability

---

## 🔹 Example Use Case

👉 E-commerce app:

* Write → orders table (Primary)
* Read → product listing (Replica)

---

---

## 🔹 Read/Write Split

```text
WRITE → Primary DB
READ  → Replica DB
```

---

---

# 🔸 2. Read Replicas 🔥

---

## 🔹 What are Read Replicas?

* Copies of primary DB
* Used only for SELECT queries

---

## 🔹 Example

```sql id="r1"
-- Read query goes to replica
SELECT * FROM products;
```

---

👉 Improves performance for:

* Dashboards
* Reports
* Search

---

---

# 🔸 3. Sharding 🔥

---

## 🔹 What is Sharding?

Splitting data across multiple databases

---

## 🔹 Example

```text
Users Table Split:
DB1 → Users 1–1000
DB2 → Users 1001–2000
```

---

## 🔹 Types of Sharding

| Type        | Description       |
| ----------- | ----------------- |
| Range-based | Split by range    |
| Hash-based  | Split using hash  |
| Geo-based   | Split by location |

---

## 🔹 Example (Hash)

```text
user_id % 2 = 0 → DB1
user_id % 2 = 1 → DB2
```

---

## 🔹 Benefits

✔ Handles huge data
✔ Improves performance

---

## 🔹 Challenges

❌ Complex queries
❌ Data consistency
❌ Hard joins

---

---

# 🔸 4. High Availability (HA) 🔥

---

## 🔹 What is HA?

System remains available even if one server fails

---

## 🔹 Techniques

| Method        | Description             |
| ------------- | ----------------------- |
| Failover      | Switch to backup server |
| Load Balancer | Distribute traffic      |
| Replication   | Backup copies           |

---

---

## 🔹 Example

```text
Primary DB → Crash
↓
Replica becomes Primary
```

---

---

# 🔸 5. Load Balancing 🔥

---

## 🔹 What is Load Balancing?

Distribute traffic across multiple DB servers

---

## 🔹 Example

```text
User Requests
   ↓
Load Balancer
   ↓
Replica 1 / Replica 2 / Replica 3
```

---

---

# 🔸 6. Caching (Architecture Level)

---

## 🔹 Use Redis

👉 Store frequently accessed data

---

## 🔹 Example

* Product list → cache
* User session → cache

---

---

# 🔸 7. Real-World Architecture 🔥

---

## 🔹 Example: E-commerce System

```text
Client
  ↓
API Server (Node.js)
  ↓
Load Balancer
  ↓
Primary DB (Write)
  ↓
Read Replicas (Read)
  ↓
Cache (Redis)
```

---

---

## 🔹 Healthcare System (Your Interest 🔥)

```text
Patients DB (Primary)
  ↓
Replica (Reports, analytics)
```

---

---

# 🔹 When to Use What?

---

| Problem        | Solution           |
| -------------- | ------------------ |
| Too many reads | Read replicas      |
| Huge data      | Sharding           |
| Server crash   | HA + failover      |
| Slow queries   | Indexing + caching |

---

---

# 🔹 Common Mistakes 🚨

---

### ❌ Using only vertical scaling

👉 Not scalable long-term

---

### ❌ No read/write separation

👉 Overloads primary DB

---

### ❌ Poor sharding strategy

👉 Hard to maintain

---

---

# 🔹 Performance Tips ⚡

---

✔ Use replication for scaling reads
✔ Use caching to reduce DB load
✔ Use sharding for massive data
✔ Monitor DB performance
✔ Plan architecture early

---

---

# 🔹 Mini Practice Thought Exercise

---

Design system for:

* 1 million users
* Heavy read traffic

👉 Solution:

* Primary DB (writes)
* 3 read replicas
* Redis cache

---

---

## 🔚 Summary

* Scaling = handling growth
* Key techniques:

  * Replication
  * Read replicas
  * Sharding
  * High availability
* Used in:

  * Large applications
  * Production systems

---
