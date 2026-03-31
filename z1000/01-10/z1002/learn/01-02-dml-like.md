# 🧠 MQL (Mongo Query Language) – DML-like Operations

---

# 📌 What is DML in MongoDB?

In SQL:

* DML = **INSERT, UPDATE, DELETE**

In MongoDB:

* DML = **document-level operations**
* Works on **collections (like tables)**
* Uses **JSON-style syntax**

👉 Focus:

* Insert documents
* Update documents
* Delete documents

---

# 📦 1. INSERT Operations

## 🔹 insertOne()

```js
db.users.insertOne({
  name: "John",
  age: 25,
  city: "Chennai"
})
```

### ✅ Use Case:

👉 Register a new user

---

## 🔹 insertMany()

```js
db.users.insertMany([
  { name: "Alice", age: 30 },
  { name: "Bob", age: 28 }
])
```

### ✅ Use Case:

👉 Bulk import (CSV → MongoDB)

---

## 🔹 Ordered vs Unordered Insert

```js
db.users.insertMany(
  [
    { _id: 1, name: "A" },
    { _id: 1, name: "B" }
  ],
  { ordered: false }
)
```

* `true` (default) → stops on error
* `false` → continues even if some fail

### ✅ Use Case:

👉 Data migration where partial success is acceptable

---

# ✍️ 2. UPDATE Operations

## 🔹 updateOne()

```js
db.users.updateOne(
  { name: "John" },
  { $set: { age: 26 } }
)
```

### ✅ Use Case:

👉 Update profile info

---

## 🔹 updateMany()

```js
db.users.updateMany(
  { city: "Chennai" },
  { $set: { status: "active" } }
)
```

### ✅ Use Case:

👉 Activate all users in a region

---

## 🔹 replaceOne()

```js
db.users.replaceOne(
  { name: "John" },
  { name: "John", age: 30, city: "Delhi" }
)
```

👉 Replaces entire document (⚠️ dangerous if fields missing)

---

# 🔧 3. Update Operators (VERY IMPORTANT)

## 🔹 $set

```js
{ $set: { age: 27 } }
```

## 🔹 $unset

```js
{ $unset: { age: "" } }
```

## 🔹 $inc

```js
{ $inc: { balance: 100 } }
```

### ✅ Use Case:

👉 Wallet / banking systems

---

## 🔹 $push (array add)

```js
{ $push: { skills: "Node.js" } }
```

---

## 🔹 $pull (array remove)

```js
{ $pull: { skills: "Java" } }
```

---

## 🔹 $addToSet (no duplicates)

```js
{ $addToSet: { skills: "MongoDB" } }
```

---

# 🧠 4. Upsert (Insert if Not Exists)

```js
db.users.updateOne(
  { email: "john@gmail.com" },
  { $set: { name: "John" } },
  { upsert: true }
)
```

### ✅ Use Case:

👉 Login / signup combined logic

---

# 🔍 5. DELETE Operations

## 🔹 deleteOne()

```js
db.users.deleteOne({ name: "John" })
```

---

## 🔹 deleteMany()

```js
db.users.deleteMany({ status: "inactive" })
```

### ✅ Use Case:

👉 Cleanup inactive users

---

## 🔹 Remove All Documents

```js
db.users.deleteMany({})
```

⚠️ Keeps collection, deletes all data

---

# ⚡ 6. Bulk Operations (Advanced)

```js
db.users.bulkWrite([
  {
    insertOne: {
      document: { name: "A" }
    }
  },
  {
    updateOne: {
      filter: { name: "A" },
      update: { $set: { age: 20 } }
    }
  }
])
```

### ✅ Use Case:

👉 High-performance batch processing

---

# 🔄 7. Real-World Use Cases

---

## 🛒 E-Commerce

### Add Order

```js
db.orders.insertOne({
  userId: 101,
  items: ["Shoes", "Bag"],
  total: 3000
})
```

---

### Update Order Status

```js
db.orders.updateOne(
  { userId: 101 },
  { $set: { status: "shipped" } }
)
```

---

### Remove Cancelled Orders

```js
db.orders.deleteMany({ status: "cancelled" })
```

---

## 👨‍🏫 Trainer System (Your Context)

### Add Trainer

```js
db.trainers.insertOne({
  name: "Mahesh",
  skills: ["React", "MongoDB"]
})
```

---

### Add New Skill

```js
db.trainers.updateOne(
  { name: "Mahesh" },
  { $push: { skills: "Docker" } }
)
```

---

### Remove Skill

```js
db.trainers.updateOne(
  { name: "Mahesh" },
  { $pull: { skills: "React" } }
)
```

---

# ⚠️ 8. Common Mistakes

### ❌ Forgetting operators

```js
db.users.updateOne({ name: "John" }, { age: 30 })
```

👉 This replaces document ❌

---

### ✅ Correct

```js
{ $set: { age: 30 } }
```

---

### ❌ Using replaceOne accidentally

👉 Can delete fields unintentionally

---

# ⚖️ SQL vs MongoDB DML

| SQL          | MongoDB                      |
| ------------ | ---------------------------- |
| INSERT INTO  | insertOne                    |
| UPDATE       | updateOne                    |
| DELETE       | deleteOne                    |
| UPSERT       | update + upsert:true         |
| JOIN updates | Not directly (use app logic) |

---

# 🚀 Final Understanding

👉 MongoDB DML is:

* **Flexible**
* **Operator-based**
* **Document-oriented**

👉 Most important concepts:

* `$set`, `$inc`, `$push`
* Upsert
* Bulk operations

---

# 🧩 Interview Insight

👉 If interviewer asks:

**“How is MongoDB DML different from SQL?”**

Answer:

* MongoDB uses **operators ($set, $inc)** instead of direct assignment
* Works on **documents, not rows**
* Supports **partial updates (field-level)**
