# 🧠 MQL (Mongo Query Language) – DDL-like Operations

## 📌 What is DDL in MongoDB?

In traditional SQL:

* DDL = **Data Definition Language**
* Used for **schema + structure management**

In MongoDB:

* MongoDB is **schema-less**
* So DDL is:
  👉 **lightweight + optional + flexible**

👉 You define structure **only when needed**, not strictly upfront.

---

# 📦 1. Database-Level Operations

## 🔹 Create Database

MongoDB creates DB **implicitly**

```js
use mydb
```

👉 Database is created **only when you insert data**

---

## 🔹 Drop Database

```js
db.dropDatabase()
```

👉 Deletes:

* All collections
* All documents
* Indexes

---

# 📁 2. Collection-Level Operations

## 🔹 Create Collection (Explicit)

```js
db.createCollection("users")
```

---

## 🔹 Create Collection with Options

```js
db.createCollection("logs", {
  capped: true,
  size: 100000,
  max: 1000
})
```

### 📌 Options:

* `capped` → fixed size collection
* `size` → max storage (bytes)
* `max` → max number of documents

---

## 🔹 Implicit Collection Creation

```js
db.users.insertOne({ name: "John" })
```

👉 Collection auto-created if not exists

---

## 🔹 Drop Collection

```js
db.users.drop()
```

---

## 🔹 Rename Collection

```js
db.users.renameCollection("customers")
```

---

# 🧾 3. Schema Validation (Important DDL Feature)

MongoDB allows **optional schema enforcement**

## 🔹 Create Collection with Validation

```js
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "age"],
      properties: {
        name: { bsonType: "string" },
        age: { bsonType: "int", minimum: 0 }
      }
    }
  }
})
```

---

## 🔹 Modify Validation Rules

```js
db.runCommand({
  collMod: "users",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name"]
    }
  }
})
```

---

# 🧱 4. Index Management (DDL + Performance)

## 🔹 Create Index

```js
db.users.createIndex({ email: 1 })
```

👉 `1` → ascending
👉 `-1` → descending

---

## 🔹 Create Unique Index

```js
db.users.createIndex({ email: 1 }, { unique: true })
```

---

## 🔹 Drop Index

```js
db.users.dropIndex("email_1")
```

---

## 🔹 View Indexes

```js
db.users.getIndexes()
```

---

# 🔐 5. User & Role Management (DDL + DCL Mix)

## 🔹 Create User

```js
db.createUser({
  user: "admin",
  pwd: "1234",
  roles: ["readWrite"]
})
```

---

## 🔹 Drop User

```js
db.dropUser("admin")
```

---

# 🔄 6. Special Collection Types

## 🔹 Capped Collections

* Fixed size
* Auto-remove old documents
* Used for logs

```js
db.createCollection("logs", {
  capped: true,
  size: 50000
})
```

---

## 🔹 Time-Series Collections

```js
db.createCollection("weather", {
  timeseries: {
    timeField: "timestamp",
    metaField: "metadata",
    granularity: "minutes"
  }
})
```

---

# ⚙️ 7. Collection Modification Commands

## 🔹 Modify Collection

```js
db.runCommand({
  collMod: "users",
  validationLevel: "moderate"
})
```

---

# ⚡ 8. Key Characteristics of MongoDB DDL

### ✅ Flexible Schema

* No fixed structure
* Documents can vary

### ✅ Implicit Creation

* DB & collections auto-created

### ✅ JSON-based Rules

* Uses `$jsonSchema` for validation

### ✅ Runtime Changes

* Modify schema anytime

---

# ⚖️ SQL vs MongoDB DDL (Quick View)

| SQL              | MongoDB            |
| ---------------- | ------------------ |
| CREATE TABLE     | createCollection   |
| ALTER TABLE      | collMod            |
| DROP TABLE       | drop               |
| Schema mandatory | Schema optional    |
| Fixed columns    | Flexible documents |

---

# 🚀 Final Insight (Important for Interviews)

👉 MongoDB DDL is:

* **Not strict like SQL**
* **Mostly optional**
* **Focused on flexibility + performance**

👉 Real-world usage:

* Use **validation + indexes**
* Avoid over-structuring (anti-pattern)
