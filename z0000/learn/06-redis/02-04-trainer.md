You’ve got a clean CRUD service 👍 — now let’s layer **Redis caching properly (production-style)** on top of it.

We’ll use:
👉 **Cache-Aside Pattern** with Redis
👉 Cache for:

* `GET /api/trainers` (list/search)
* `GET /api/trainers/:id` (single)
  👉 Invalidate cache on:
* `POST`, `PUT`, `DELETE`

---

# 🚀 Step 1: Install Redis Client

```bash
npm install redis
```

---

# ⚙️ Step 2: Create Redis Client

```js
// redisClient.js
import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://localhost:6379"
});

redisClient.on("error", (err) => console.error("Redis Error", err));

await redisClient.connect();

export default redisClient;
```

---

# 🧠 Step 3: Key Design (VERY IMPORTANT)

```plaintext
trainer:{id}
trainer:list:{search}
```

Examples:

```plaintext
trainer:66123abc
trainer:list:john
trainer:list:
```

---

# 🔥 Step 4: Apply Caching to APIs

---

## ✅ 1. LIST / SEARCH (Cache)

```js
import redisClient from "./redisClient.js";

app.get("/api/trainers", async (req, res) => {
  const { search = "" } = req.query;

  const key = `trainer:list:${search}`;

  // 1. Check cache
  const cached = await redisClient.get(key);
  if (cached) {
    console.log("CACHE HIT - LIST");
    return res.json(JSON.parse(cached));
  }

  // 2. DB query
  const query = {
    name: { $regex: search, $options: "i" }
  };

  const trainers = await Trainer.find(query);

  // 3. Store in cache (TTL 60 sec)
  await redisClient.setEx(key, 60, JSON.stringify(trainers));

  console.log("CACHE MISS - LIST");

  res.json(trainers);
});
```

---

## ✅ 2. VIEW BY ID (Cache)

```js
app.get("/api/trainers/:id", async (req, res) => {
  const id = req.params.id;
  const key = `trainer:${id}`;

  // 1. Cache check
  const cached = await redisClient.get(key);
  if (cached) {
    console.log("CACHE HIT - ID");
    return res.json(JSON.parse(cached));
  }

  // 2. DB fetch
  const trainer = await Trainer.findById(id);

  if (!trainer) return res.status(404).json({ message: "Not found" });

  // 3. Cache store
  await redisClient.setEx(key, 300, JSON.stringify(trainer));

  console.log("CACHE MISS - ID");

  res.json(trainer);
});
```

---

# ✍️ Step 5: Invalidate Cache (CRITICAL)

---

## ✅ 3. CREATE

```js
app.post("/api/trainers", async (req, res) => {
  const trainer = await Trainer.create({
    ...req.body,
    updated_user_id: 20001
  });

  // Invalidate list cache
  await redisClient.del("trainer:list:");

  res.json(trainer);
});
```

---

## ✅ 4. UPDATE

```js
app.put("/api/trainers/:id", async (req, res) => {
  const id = req.params.id;

  const trainer = await Trainer.findByIdAndUpdate(
    id,
    {
      ...req.body,
      updated_user_id: 20001,
      updated_time: new Date()
    },
    { new: true }
  );

  // Invalidate cache
  await redisClient.del(`trainer:${id}`);
  await redisClient.del("trainer:list:");

  res.json(trainer);
});
```

---

## ✅ 5. DELETE

```js
app.delete("/api/trainers/:id", async (req, res) => {
  const id = req.params.id;

  await Trainer.findByIdAndDelete(id);

  // Invalidate cache
  await redisClient.del(`trainer:${id}`);
  await redisClient.del("trainer:list:");

  res.json({ message: "Deleted" });
});
```

---

# ⚠️ Problem in Your Current Design (Important)

Your list cache:

```plaintext
trainer:list:{search}
```

But you only delete:

```plaintext
trainer:list:
```

👉 This leaves stale caches like:

```plaintext
trainer:list:john
trainer:list:react
```

---

# 🔥 Production Fix (Better Invalidation)

### Option 1 (Simple)

Use **short TTL (30–60 sec)** → acceptable in most systems

---

### Option 2 (Better)

Track keys:

```plaintext
trainer:list:*
```

Then:

```js
const keys = await redisClient.keys("trainer:list:*");
if (keys.length > 0) {
  await redisClient.del(keys);
}
```

---

### Option 3 (Best - corporate)

Use **versioning**

```plaintext
trainer:list:v1:john
```

On update:

```plaintext
increment version → v2
```

---

# 🧱 Final Architecture

```plaintext
Client
   ↓
Express API
   ↓
Redis (Cache Layer)
   ↓
MongoDB (Source of Truth)
```

---

# 🎯 What You Achieved

✔ Fast reads (90% traffic handled by Redis)
✔ Reduced DB load
✔ Scalable for microservices
✔ Industry-standard pattern

---

# 🚀 Next Level (Highly Recommended)

If you want to make this **corporate-grade system**, I can show:

* 🔥 Cache stampede handling (very important for 600 users)
* 🔥 Distributed invalidation across services
* 🔥 Redis + API Gateway integration
* 🔥 Write-through vs cache-aside (interview critical)

Just tell me 👍
