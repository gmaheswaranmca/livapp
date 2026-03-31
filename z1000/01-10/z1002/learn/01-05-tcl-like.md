# 🧠 MQL (MongoDB Query Language) – TCL-like Operations

---

# 📌 What is TCL in MongoDB?

In SQL:

* TCL = **Transaction Control Language**
* Commands:

  * `BEGIN`
  * `COMMIT`
  * `ROLLBACK`

In MongoDB:

* TCL = **Transaction Management using sessions**
* Ensures:

  * **Atomicity**
  * **Consistency**

👉 Supported in:

* **Replica Sets (required)**
* MongoDB 4.0+ (multi-document transactions)

---

# 🔐 1. Why Transactions in MongoDB?

MongoDB is:

* Document-based
* Usually atomic at **single document level**

👉 Transactions are needed when:

* Multiple documents must update **together**

---

### ✅ Example Scenario:

👉 Bank transfer

* Debit from A
* Credit to B

If one fails → rollback both ❗

---

# 🔄 2. Core Concepts

## 🔹 Session

* Required for transactions

## 🔹 Transaction

* Group of operations executed together

---

# ⚙️ 3. Basic Transaction Flow

```js id="1pdyva"
const session = db.getMongo().startSession()

session.startTransaction()

try {
  const users = session.getDatabase("test").users

  users.updateOne(
    { name: "A" },
    { $inc: { balance: -100 } }
  )

  users.updateOne(
    { name: "B" },
    { $inc: { balance: 100 } }
  )

  session.commitTransaction()
} catch (e) {
  session.abortTransaction()
} finally {
  session.endSession()
}
```

---

# 🧱 4. Transaction Methods

## 🔹 startTransaction()

```js id="uxo2pf"
session.startTransaction()
```

---

## 🔹 commitTransaction()

```js id="r8w4of"
session.commitTransaction()
```

👉 Saves all changes

---

## 🔹 abortTransaction()

```js id="haqgch"
session.abortTransaction()
```

👉 Rolls back all changes

---

## 🔹 endSession()

```js id="km3k19"
session.endSession()
```

👉 Cleanup

---

# ⚡ 5. Transaction Properties (ACID)

## 🔹 Atomicity

👉 All or nothing

## 🔹 Consistency

👉 Data remains valid

## 🔹 Isolation

👉 Transactions don’t interfere

## 🔹 Durability

👉 Changes persist after commit

---

# 🧩 6. Read & Write Concerns

## 🔹 Read Concern

```js id="fp9g0c"
{ readConcern: { level: "snapshot" } }
```

---

## 🔹 Write Concern

```js id="ntjs8o"
{ writeConcern: { w: "majority" } }
```

---

## 🔹 Example with Options

```js id="ns1hwh"
session.startTransaction({
  readConcern: { level: "snapshot" },
  writeConcern: { w: "majority" }
})
```

---

# 🛒 7. Real-World Use Cases

---

## 🏦 Banking System

```js id="qlg3aj"
session.startTransaction()

accounts.updateOne(
  { name: "A" },
  { $inc: { balance: -500 } }
)

accounts.updateOne(
  { name: "B" },
  { $inc: { balance: 500 } }
)

session.commitTransaction()
```

---

---

## 🛍 E-Commerce Order Placement

👉 Steps:

1. Create order
2. Reduce stock
3. Update payment status

```js id="z4gk20"
session.startTransaction()

orders.insertOne({ userId: 1, total: 2000 })

products.updateOne(
  { _id: 101 },
  { $inc: { stock: -1 } }
)

payments.insertOne({ status: "success" })

session.commitTransaction()
```

---

---

## 👨‍🏫 Trainer Platform

👉 Assign trainer + update availability

```js id="ujt1nb"
session.startTransaction()

trainers.updateOne(
  { name: "Mahesh" },
  { $set: { available: false } }
)

sessions.insertOne({
  trainer: "Mahesh",
  topic: "MongoDB"
})

session.commitTransaction()
```

---

# ⚠️ 8. Important Rules

---

## ❗ Must use Replica Set

👉 Transactions NOT supported in standalone mode

---

## ❗ Keep Transactions Short

👉 Long transactions:

* Lock resources
* Reduce performance

---

## ❗ Avoid Large Data Changes

👉 Use transactions only when necessary

---

# ⚠️ 9. Common Mistakes

---

### ❌ Forgetting session in operations

```js id="m6pdba"
users.updateOne(...)
```

👉 Not part of transaction ❌

---

### ✅ Correct

```js id="8txfc4"
users.updateOne(..., { session })
```

---

---

### ❌ Long-running transactions

👉 Causes performance issues

---

### ❌ Overusing transactions

👉 MongoDB is optimized for single-document atomicity

---

# ⚖️ SQL vs MongoDB TCL

| SQL               | MongoDB              |
| ----------------- | -------------------- |
| BEGIN             | startTransaction     |
| COMMIT            | commitTransaction    |
| ROLLBACK          | abortTransaction     |
| Auto transactions | Manual session-based |

---

# 🚀 10. Best Practices

---

## ✅ Use Transactions When:

* Multi-document updates
* Financial operations
* Critical consistency required

---

## ❌ Avoid When:

* Single document update (already atomic)
* High-performance bulk writes

---

## ✅ Combine with:

* Proper indexing
* Retry logic

---

# 🧩 11. Interview Insight

👉 If asked:

**“When should you use transactions in MongoDB?”**

Answer:

* Only when **multiple documents must be consistent**
* MongoDB already ensures **single-document atomicity**

---

# 🏁 Final Understanding

👉 MongoDB TCL is:

* **Session-based**
* **Explicit (manual control)**
* **Used for critical operations only**

👉 Key flow:

1. Start session
2. Start transaction
3. Perform operations
4. Commit / Abort
