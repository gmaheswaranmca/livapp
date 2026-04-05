# 🧠 MongoDB Indexing + Performance Tuning

---

# 📌 1. What is Indexing in MongoDB?

👉 Index = **data structure (B-Tree)** that improves query speed

Without index:

* MongoDB scans **every document** (COLLSCAN ❌)

With index:

* MongoDB uses **IXSCAN (fast lookup) ✅**

---

## 🔍 Example

```js
db.users.find({ email: "test@gmail.com" })
```

👉 Without index → slow
👉 With index → fast lookup

---

# 🧱 2. Create Index

## 🔹 Single Field Index

```js
db.users.createIndex({ email: 1 })
```

* `1` → ascending
* `-1` → descending

---

### ✅ Use Case:

👉 Login system (search by email)

---

## 🔹 Compound Index

```js
db.users.createIndex({ city: 1, age: -1 })
```

---

### ✅ Use Case:

👉 Filter by city + sort by age

---

## 🔥 Rule (VERY IMPORTANT)

👉 Order matters:

```js
{ city: 1, age: -1 }
```

Works for:

* city ✅
* city + age ✅
* ❌ age alone (not efficient)

---

# ⚡ 3. Unique Index

```js
db.users.createIndex({ email: 1 }, { unique: true })
```

---

### ✅ Use Case:

👉 Prevent duplicate emails

---

# 🔍 4. Sparse Index

```js
db.users.createIndex({ phone: 1 }, { sparse: true })
```

👉 Index only documents with `phone`

---

### ✅ Use Case:

👉 Optional fields

---

# 🧵 5. Multikey Index (Arrays)

```js
db.users.createIndex({ skills: 1 })
```

---

### ✅ Use Case:

👉 Query array fields

```js
db.users.find({ skills: "MongoDB" })
```

---

# 🔎 6. Text Index (Search)

```js
db.users.createIndex({ name: "text" })
```

```js
db.users.find({ $text: { $search: "john" } })
```

---

### ✅ Use Case:

👉 Search bar

---

# 🌍 7. Geospatial Index

```js
db.places.createIndex({ location: "2dsphere" })
```

---

### ✅ Use Case:

👉 Nearby locations (maps apps)

---

# 🧩 8. TTL Index (Auto Delete)

```js
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }
)
```

---

### ✅ Use Case:

👉 Auto-delete sessions/logs

---

# 🔍 9. Analyze Query Performance

## 🔹 explain() (VERY IMPORTANT)

```js
db.users.find({ email: "test@gmail.com" }).explain("executionStats")
```

---

## 🔹 Output Key Fields

* `COLLSCAN` ❌ → slow
* `IXSCAN` ✅ → indexed
* `nReturned` → result count
* `executionTimeMillis` → time

---

# ⚡ 10. Covered Queries

👉 Query uses only index (no document fetch)

```js
db.users.createIndex({ name: 1, age: 1 })

db.users.find(
  { name: "John" },
  { name: 1, age: 1, _id: 0 }
)
```

---

### ✅ Benefit:

👉 Super fast (no disk read)

---

# 🔄 11. Indexing Strategy (REAL-WORLD)

---

## ✅ Index frequently used fields

```js
db.orders.find({ userId: 1 })
```

👉 Index:

```js
{ userId: 1 }
```

---

## ✅ Index filter + sort fields

```js
db.orders.find({ status: "completed" }).sort({ date: -1 })
```

👉 Index:

```js
{ status: 1, date: -1 }
```

---

## ❌ Avoid over-indexing

👉 Too many indexes:

* Slows insert/update
* Uses memory

---

# ⚙️ 12. Performance Tuning Techniques

---

## 🔹 1. Use Projection

```js
db.users.find({}, { name: 1 })
```

👉 Reduce data transfer

---

## 🔹 2. Limit Results

```js
db.users.find().limit(10)
```

---

## 🔹 3. Avoid skip() for large data

❌

```js
.skip(10000)
```

✅ Use:

```js
{ _id: { $gt: lastId } }
```

---

## 🔹 4. Use Aggregation Efficiently

```js
[
  { $match: ... },   // first
  { $group: ... }
]
```

---

## 🔹 5. Use Proper Schema Design

👉 Embed vs reference wisely

---

## 🔹 6. Use Connection Pooling

👉 In Node.js (MERN apps)

---

# 🛒 13. Real-World Use Cases

---

## 👨‍🏫 Trainer Platform

### Query:

```js
db.trainers.find({
  skills: "MongoDB",
  experience: { $gt: 3 }
})
```

👉 Index:

```js
{ skills: 1, experience: 1 }
```

---

---

## 🛍 E-Commerce

### Query:

```js
db.orders.find({
  userId: 101,
  status: "completed"
}).sort({ date: -1 })
```

👉 Index:

```js
{ userId: 1, status: 1, date: -1 }
```

---

---

## 🔐 Authentication

```js
db.users.find({ email: "test@gmail.com" })
```

👉 Index:

```js
{ email: 1 }
```

---

# ⚠️ 14. Common Mistakes

---

### ❌ No index on filter

👉 Slow queries

---

### ❌ Wrong index order

👉 Not used properly

---

### ❌ Indexing every field

👉 Memory waste

---

### ❌ Ignoring explain()

👉 Blind optimization

---

# ⚖️ 15. SQL vs MongoDB Indexing

| SQL             | MongoDB        |
| --------------- | -------------- |
| B-Tree index    | B-Tree index   |
| Composite index | Compound index |
| Full-text       | Text index     |
| Partitioning    | Sharding       |

---

# 🚀 16. Advanced Concepts

---

## 🔹 Index Intersection

👉 MongoDB can combine indexes

---

## 🔹 Partial Index

```js
db.users.createIndex(
  { age: 1 },
  { partialFilterExpression: { age: { $gt: 18 } } }
)
```

---

## 🔹 Hashed Index

```js
db.users.createIndex({ userId: "hashed" })
```

👉 Used in sharding

---

# 🧩 17. Interview Insight

👉 If asked:

**“How do you optimize MongoDB queries?”**

Answer:

* Create proper indexes
* Use projection
* Analyze with `explain()`
* Optimize aggregation pipeline
* Avoid large skips

---

# 🏁 Final Understanding

👉 Performance =
**Indexing + Query Design + Schema Design**

👉 Golden Rule:

> “Index what you query, not what you store”

---

# 🔥 Pro Tips (Production Level)

* Always monitor slow queries
* Use MongoDB Atlas performance tools
* Combine indexes + aggregation wisely
* Benchmark before/after optimization
