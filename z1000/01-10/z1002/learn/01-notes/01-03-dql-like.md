# 🧠 MQL (Mongo Query Language) – DQL-like Operations

---

# 📌 What is DQL in MongoDB?

In SQL:

* DQL = **SELECT**

In MongoDB:

* DQL = **read/query operations using `find()` and aggregation**

👉 Works on:

* **Documents (JSON)**
* **Collections (like tables)**

---

# 🔍 1. Basic Query – `find()`

## 🔹 Syntax

```js
db.collection.find(filter, projection)
```

---

## 🔹 Get All Documents

```js
db.users.find()
```

### ✅ Use Case:

👉 Display all users in admin dashboard

---

## 🔹 Filtered Query

```js
db.users.find({ city: "Chennai" })
```

### ✅ Use Case:

👉 Find users by location

---

# 🎯 2. Projection (Selecting Fields)

## 🔹 Include Fields

```js
db.users.find({}, { name: 1, age: 1 })
```

---

## 🔹 Exclude Fields

```js
db.users.find({}, { password: 0 })
```

---

## ⚠️ Rule:

* Cannot mix include & exclude (except `_id`)

---

### ✅ Use Case:

👉 Hide sensitive data (password, tokens)

---

# ⚖️ 3. Comparison Operators

## 🔹 Common Operators

| Operator | Meaning          |
| -------- | ---------------- |
| `$eq`    | equal            |
| `$ne`    | not equal        |
| `$gt`    | greater than     |
| `$gte`   | greater or equal |
| `$lt`    | less than        |
| `$lte`   | less or equal    |

---

## 🔹 Example

```js
db.users.find({ age: { $gt: 25 } })
```

---

### ✅ Use Case:

👉 Find users above certain age

---

# 🔗 4. Logical Operators

## 🔹 AND (default)

```js
db.users.find({ city: "Chennai", age: { $gt: 25 } })
```

---

## 🔹 OR

```js
db.users.find({
  $or: [
    { city: "Chennai" },
    { age: { $lt: 20 } }
  ]
})
```

---

## 🔹 NOT

```js
db.users.find({ age: { $not: { $gt: 30 } } })
```

---

### ✅ Use Case:

👉 Complex filters (search forms)

---

# 🔍 5. Element Operators

## 🔹 Check Field Exists

```js
db.users.find({ age: { $exists: true } })
```

---

## 🔹 Type Check

```js
db.users.find({ age: { $type: "int" } })
```

---

### ✅ Use Case:

👉 Data validation / debugging inconsistent data

---

# 🧵 6. Array Queries

## 🔹 Match Array Value

```js
db.users.find({ skills: "MongoDB" })
```

---

## 🔹 $all (multiple values)

```js
db.users.find({
  skills: { $all: ["MongoDB", "Node.js"] }
})
```

---

## 🔹 $size

```js
db.users.find({ skills: { $size: 2 } })
```

---

### ✅ Use Case:

👉 Skill-based filtering (like your trainer app)

---

# 🧩 7. Nested Document Queries

```js
db.users.find({
  "address.city": "Chennai"
})
```

---

### ✅ Use Case:

👉 Query deeply structured data

---

# 🔎 8. Cursor Methods (VERY IMPORTANT)

MongoDB returns a **cursor**, not immediate data

---

## 🔹 limit()

```js
db.users.find().limit(5)
```

---

## 🔹 skip()

```js
db.users.find().skip(10)
```

---

## 🔹 sort()

```js
db.users.find().sort({ age: -1 })
```

👉 `1` = ascending
👉 `-1` = descending

---

### ✅ Use Case:

👉 Pagination (frontend apps)

---

# 📄 9. findOne()

```js
db.users.findOne({ name: "John" })
```

---

### ✅ Use Case:

👉 Login / single record fetch

---

# 🔍 10. Text Search

## 🔹 Create Text Index

```js
db.users.createIndex({ name: "text" })
```

---

## 🔹 Search

```js
db.users.find({ $text: { $search: "John" } })
```

---

### ✅ Use Case:

👉 Search bar functionality

---

# 🔗 11. Regex Queries

```js
db.users.find({
  name: { $regex: "^J", $options: "i" }
})
```

---

### ✅ Use Case:

👉 Autocomplete / prefix search

---

# 🔄 12. Aggregation (Advanced DQL)

👉 Like SQL:

* GROUP BY
* JOIN
* HAVING

---

## 🔹 Example

```js
db.orders.aggregate([
  { $match: { status: "completed" } },
  {
    $group: {
      _id: "$userId",
      total: { $sum: "$amount" }
    }
  }
])
```

---

### ✅ Use Case:

👉 Reports, analytics, dashboards

---

# 🛒 13. Real-World Use Cases

---

## 👨‍🏫 Trainer System

### Find Trainers with MongoDB skill

```js
db.trainers.find({ skills: "MongoDB" })
```

---

### Find Trainers with multiple skills

```js
db.trainers.find({
  skills: { $all: ["React", "MongoDB"] }
})
```

---

---

## 🛍 E-Commerce

### Get expensive products

```js
db.products.find({ price: { $gt: 1000 } })
```

---

### Pagination

```js
db.products.find()
  .sort({ price: -1 })
  .skip(10)
  .limit(5)
```

---

---

## 🔐 Authentication

### Find user

```js
db.users.findOne({
  email: "test@gmail.com",
  password: "1234"
})
```

---

# ⚠️ 14. Common Mistakes

---

### ❌ No Index → Slow Query

👉 Always index frequently searched fields

---

### ❌ Large skip() → Performance issue

👉 Use range-based pagination instead

---

### ❌ Regex without index

👉 Can be very slow

---

# ⚖️ SQL vs MongoDB DQL

| SQL       | MongoDB       |
| --------- | ------------- |
| SELECT *  | find()        |
| WHERE     | filter object |
| LIMIT     | limit()       |
| OFFSET    | skip()        |
| ORDER BY  | sort()        |
| LIKE      | $regex        |
| FULL TEXT | $text         |

---

# 🚀 Final Understanding

👉 MongoDB DQL is:

* **Flexible**
* **JSON-based**
* **Powerful with operators**

👉 Core concepts:

* Filters
* Projection
* Operators
* Cursor methods
* Aggregation

---

# 🧩 Interview Insight

👉 If asked:

**“How does MongoDB query differ from SQL?”**

Answer:

* Uses **JSON objects instead of SQL syntax**
* Supports **rich operators ($gt, $in, $regex)**
* Returns **cursor (lazy loading)**
