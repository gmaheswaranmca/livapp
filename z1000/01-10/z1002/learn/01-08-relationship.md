# 🧠 MQL (MongoDB Query Language) – Relationships

## 📌 Embedding vs Referencing

---

# 🔍 1. Why Relationships in MongoDB?

MongoDB is **NoSQL (document-based)**, so:

* No traditional SQL JOINs by default
* Relationships handled using:
  👉 **Embedding (nested documents)**
  👉 **Referencing (link via IDs)**

---

# 🧩 2. Two Main Approaches

| Approach    | Idea                                            |
| ----------- | ----------------------------------------------- |
| Embedding   | Store related data **inside one document**      |
| Referencing | Store data in **separate collections** and link |

---

# 📦 3. Embedding (Denormalization)

👉 Store related data **inside parent document**

---

## 🔹 Example

```json
{
  "_id": 1,
  "name": "John",
  "orders": [
    { "item": "Laptop", "price": 50000 },
    { "item": "Mouse", "price": 500 }
  ]
}
```

---

## 🔹 Query Example

```js
db.users.find({ "orders.item": "Laptop" })
```

---

## ✅ Use Cases

* User profile + address
* Blog post + comments
* Trainer + skills

---

## 🔥 Advantages

### ✅ Fast Reads

👉 No join required

### ✅ Atomic Updates

👉 Entire document updated together

### ✅ Simple Queries

👉 Single collection

---

## ⚠️ Limitations

### ❌ Document Size Limit

👉 Max **16MB**

---

### ❌ Data Duplication

👉 Same data repeated

---

### ❌ Hard to Update Frequently Changing Data

---

---

# 🧠 4. Referencing (Normalization)

👉 Store related data in **separate collections**

---

## 🔹 Example

### Users Collection

```json
{
  "_id": 1,
  "name": "John",
  "orderIds": [101, 102]
}
```

---

### Orders Collection

```json
{
  "_id": 101,
  "item": "Laptop",
  "price": 50000
}
```

---

## 🔹 Query with $lookup (JOIN)

```js
db.users.aggregate([
  {
    $lookup: {
      from: "orders",
      localField: "orderIds",
      foreignField: "_id",
      as: "orders"
    }
  }
])
```

---

## ✅ Use Cases

* Large datasets
* Many-to-many relationships
* Frequently updated data

---

## 🔥 Advantages

### ✅ No Duplication

👉 Normalized data

### ✅ Flexible Updates

👉 Update independently

### ✅ Scalable

---

## ⚠️ Limitations

### ❌ Requires JOIN ($lookup)

👉 Slower than embedding

---

### ❌ More Complex Queries

---

# ⚖️ 5. Embedding vs Referencing (Comparison)

| Feature          | Embedding         | Referencing         |
| ---------------- | ----------------- | ------------------- |
| Performance      | Fast reads        | Slower (needs join) |
| Data duplication | High              | Low                 |
| Complexity       | Simple            | Complex             |
| Updates          | Hard if nested    | Easy                |
| Size limit       | 16MB limit        | No limit            |
| Use case         | Small, fixed data | Large, dynamic data |

---

# 🛒 6. Real-World Use Cases

---

## 👨‍🏫 Trainer Platform (Your Context)

---

### ✅ Embedding (Best for skills)

```json
{
  "name": "Mahesh",
  "skills": ["React", "MongoDB", "Docker"]
}
```

👉 Fast queries like:

```js
db.trainers.find({ skills: "MongoDB" })
```

---

---

### ✅ Referencing (Best for sessions)

```json
{
  "name": "Mahesh",
  "sessionIds": [201, 202]
}
```

---

### Sessions Collection

```json
{
  "_id": 201,
  "topic": "MongoDB",
  "duration": 2
}
```

---

---

## 🛍 E-Commerce

---

### Embedding (Order items)

```json
{
  "orderId": 1,
  "items": [
    { "product": "Shoes", "price": 2000 }
  ]
}
```

---

### Referencing (Products)

```json
{
  "productId": 101,
  "name": "Shoes",
  "stock": 50
}
```

---

---

## 📱 Social Media

---

### Embedding (comments)

```json
{
  "post": "Hello",
  "comments": [
    { "user": "A", "text": "Nice!" }
  ]
}
```

---

### Referencing (users)

```json
{
  "userId": 1,
  "name": "John"
}
```

---

# ⚡ 7. Hybrid Approach (BEST PRACTICE)

👉 Combine both

---

## 🔹 Example

```json
{
  "name": "Mahesh",
  "skills": ["MongoDB"],   // embedded
  "sessionIds": [101]      // referenced
}
```

---

👉 Use:

* Embedding → small, static data
* Referencing → large, dynamic data

---

# 🧠 8. Decision Rules (VERY IMPORTANT)

---

## ✅ Use Embedding When:

* One-to-few relationship
* Data read together
* Rare updates

---

## ✅ Use Referencing When:

* One-to-many / many-to-many
* Data changes frequently
* Large datasets

---

# ⚠️ 9. Common Mistakes

---

### ❌ Over-embedding

👉 Leads to huge documents

---

### ❌ Over-referencing

👉 Too many joins → slow

---

### ❌ Ignoring access pattern

👉 Design should depend on queries

---

# 🚀 10. Interview Insight

👉 If asked:

**“Embedding vs Referencing?”**

Answer:

* Embedding → fast, simple, but limited
* Referencing → scalable, flexible, but requires joins

👉 Best approach:

> “Design based on query patterns”

---

# 🏁 Final Understanding

👉 MongoDB relationships are:

* **Flexible**
* **Design-driven (not schema-driven)**

👉 Golden Rule:

> “Store data the way you query it”

---

# 🔥 Pro Tip (Production Level)

👉 Always ask:

* What queries are frequent?
* What data changes often?
* What size will data grow to?
