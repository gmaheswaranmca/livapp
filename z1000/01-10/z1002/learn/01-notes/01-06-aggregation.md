# 🧠 MQL (MongoDB Query Language) – Aggregation Framework

---

# 📌 1. What is Aggregation Framework?

MongoDB Aggregation Framework is used to:

* **Process data**
* **Transform documents**
* **Perform analytics**

👉 Equivalent to SQL:

* `GROUP BY`
* `JOIN`
* `HAVING`
* `SUM`, `AVG`, etc.

---

## 🔹 Syntax

```js
db.collection.aggregate([
  { stage1 },
  { stage2 },
  ...
])
```

👉 Data flows through **pipeline stages**

---

# 🧱 2. Aggregation Pipeline Concept

Think like:
👉 Input → Stage → Stage → Stage → Output

---

## 🔄 Example Flow

```
Users → Filter → Group → Sort → Result
```

---

# 🔥 3. Important Stages (CORE)

---

## 🔹 $match (Filter)

👉 Like SQL `WHERE`

```js
db.users.aggregate([
  { $match: { age: { $gt: 25 } } }
])
```

### ✅ Use Case:

👉 Filter active users

---

## 🔹 $project (Select Fields / Transform)

```js
db.users.aggregate([
  {
    $project: {
      name: 1,
      age: 1,
      isAdult: { $gte: ["$age", 18] }
    }
  }
])
```

### ✅ Use Case:

👉 Shape API response

---

## 🔹 $group (MOST IMPORTANT)

👉 Like SQL `GROUP BY`

```js
db.orders.aggregate([
  {
    $group: {
      _id: "$customerId",
      totalAmount: { $sum: "$amount" }
    }
  }
])
```

### ✅ Use Case:

👉 Total purchase per customer

---

## 🔹 $sort

```js
db.users.aggregate([
  { $sort: { age: -1 } }
])
```

---

## 🔹 $limit

```js
{ $limit: 5 }
```

---

## 🔹 $skip

```js
{ $skip: 10 }
```

---

# 🔗 4. Advanced Stages

---

## 🔹 $lookup (JOIN)

👉 Join collections

```js
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails"
    }
  }
])
```

### ✅ Use Case:

👉 Get order + user info

---

## 🔹 $unwind (Array → Documents)

```js
{ $unwind: "$items" }
```

### ✅ Use Case:

👉 Break array into individual rows

---

## 🔹 $addFields

```js
{
  $addFields: {
    discountPrice: { $multiply: ["$price", 0.9] }
  }
}
```

---

## 🔹 $count

```js
{ $count: "totalUsers" }
```

---

## 🔹 $facet (Multiple Pipelines)

```js
db.products.aggregate([
  {
    $facet: {
      expensive: [{ $match: { price: { $gt: 1000 } } }],
      cheap: [{ $match: { price: { $lte: 1000 } } }]
    }
  }
])
```

---

# 🧮 5. Aggregation Operators

---

## 🔹 Arithmetic

```js
{ $sum: "$amount" }
{ $avg: "$amount" }
{ $max: "$amount" }
{ $min: "$amount" }
```

---

## 🔹 Conditional

```js
{
  $cond: {
    if: { $gt: ["$age", 18] },
    then: "Adult",
    else: "Minor"
  }
}
```

---

## 🔹 String

```js
{ $concat: ["$firstName", " ", "$lastName"] }
```

---

# 🛒 6. Real-World Use Cases

---

## 🛍 E-Commerce Dashboard

### Total Sales per Product

```js
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.productId",
      totalSales: { $sum: "$items.price" }
    }
  }
])
```

---

---

## 👨‍🏫 Trainer Platform (Your Context)

### Trainers with Skill Count

```js
db.trainers.aggregate([
  {
    $project: {
      name: 1,
      skillCount: { $size: "$skills" }
    }
  }
])
```

---

### Trainers Grouped by Skill

```js
db.trainers.aggregate([
  { $unwind: "$skills" },
  {
    $group: {
      _id: "$skills",
      count: { $sum: 1 }
    }
  }
])
```

---

---

## 📊 Analytics System

### Monthly Revenue

```js
db.orders.aggregate([
  {
    $group: {
      _id: { $month: "$date" },
      revenue: { $sum: "$amount" }
    }
  }
])
```

---

# ⚡ 7. Optimization Tips

---

## ✅ Use $match early

```js
[
  { $match: { status: "active" } },
  { $group: ... }
]
```

👉 Reduces data early → faster

---

## ✅ Use indexes

👉 Especially on `$match` fields

---

## ❌ Avoid unnecessary stages

👉 Keep pipeline minimal

---

# ⚠️ 8. Common Mistakes

---

### ❌ Using $group without $match

👉 Processes entire collection

---

### ❌ Forgetting $unwind

👉 Arrays not processed correctly

---

### ❌ Large pipeline

👉 Performance issues

---

# ⚖️ SQL vs MongoDB Aggregation

| SQL      | MongoDB               |
| -------- | --------------------- |
| SELECT   | $project              |
| WHERE    | $match                |
| GROUP BY | $group                |
| JOIN     | $lookup               |
| HAVING   | $match (after $group) |
| ORDER BY | $sort                 |

---

# 🚀 9. Interview Insight

👉 If asked:

**“Why is aggregation powerful in MongoDB?”**

Answer:

* Pipeline-based processing
* Supports transformation + analytics
* Replaces multiple SQL operations

---

# 🏁 Final Understanding

👉 Aggregation = **Data Processing Engine**

👉 Key stages:

* `$match`
* `$project`
* `$group`
* `$lookup`

👉 Think like:

> Filter → Transform → Group → Join → Output

---

# 🔥 Pro Tip (Very Important)

👉 In real projects:

* 70% of complex queries = Aggregation
* Used in:

  * Dashboards
  * Reports
  * Analytics APIs
