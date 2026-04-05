## 14. Transactions 🔥 (Data Consistency & Reliability)

---

## 🔹 What is a Transaction?

A **Transaction** is a **group of SQL operations executed as a single unit**.

👉 In simple terms:

> Transaction = “All succeed OR all fail”

---

## 🔹 Real-Life Example

### 💰 Banking Transfer

* Deduct ₹1000 from Account A
* Add ₹1000 to Account B

👉 If one fails → both should fail ❌
👉 If both succeed → commit ✅

---

## 🔹 Basic Syntax

---

### 📌 Start Transaction

```sql id="9w79aj"
START TRANSACTION;
```

---

### 📌 Commit Changes

```sql id="ygpx2z"
COMMIT;
```

---

### 📌 Rollback Changes

```sql id="9k3r1c"
ROLLBACK;
```

---

---

## 🔹 Example

```sql id="t13j1r"
START TRANSACTION;

UPDATE accounts SET balance = balance - 1000 WHERE id = 1;
UPDATE accounts SET balance = balance + 1000 WHERE id = 2;

COMMIT;
```

---

👉 If something goes wrong:

```sql id="36p7m9"
ROLLBACK;
```

---

---

# 🔹 ACID Properties 🔥 (Core Concept)

---

## 🔸 1. Atomicity

👉 All or nothing

* Success → commit
* Failure → rollback

---

## 🔸 2. Consistency

👉 Data remains valid

* Constraints maintained
* No invalid state

---

## 🔸 3. Isolation

👉 Transactions don’t interfere

* Multiple users → no conflict

---

## 🔸 4. Durability

👉 Once committed → permanent

* Survives crash

---

---

# 🔹 Transaction Control Commands

| Command           | Purpose          |
| ----------------- | ---------------- |
| START TRANSACTION | Begin            |
| COMMIT            | Save changes     |
| ROLLBACK          | Undo changes     |
| SAVEPOINT         | Partial rollback |

---

---

# 🔸 SAVEPOINT 🔥

---

## 🔹 Definition

Creates checkpoints inside transaction

---

### 📌 Example

```sql id="1l7jht"
START TRANSACTION;

UPDATE accounts SET balance = balance - 1000 WHERE id = 1;

SAVEPOINT sp1;

UPDATE accounts SET balance = balance + 1000 WHERE id = 2;

ROLLBACK TO sp1;

COMMIT;
```

---

👉 Only second update is undone

---

---

# 🔹 Isolation Levels 🔥

---

## 🔹 Types

| Level            | Description              |
| ---------------- | ------------------------ |
| READ UNCOMMITTED | Dirty reads allowed      |
| READ COMMITTED   | Only committed data      |
| REPEATABLE READ  | Same data in transaction |
| SERIALIZABLE     | Strictest                |

---

---

## 🔹 Set Isolation Level

```sql id="q4d9ws"
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

---

---

# 🔹 Common Problems (Important)

---

## ❌ Dirty Read

👉 Read uncommitted data

---

## ❌ Non-Repeatable Read

👉 Same query → different results

---

## ❌ Phantom Read

👉 New rows appear during transaction

---

---

# 🔹 Real-World Use Cases

---

### ✅ 1. Banking System 🔥

```sql id="nt3s0t"
START TRANSACTION;

UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;

COMMIT;
```

---

---

### ✅ 2. E-commerce Order

```sql id="ij9rq4"
START TRANSACTION;

INSERT INTO orders VALUES (...);
UPDATE products SET stock = stock - 1 WHERE id = 10;

COMMIT;
```

---

---

### ✅ 3. Healthcare System

```sql id="cgf2tb"
START TRANSACTION;

INSERT INTO patients VALUES (...);
INSERT INTO medical_records VALUES (...);

COMMIT;
```

---

---

### ✅ 4. Rollback Scenario

```sql id="ewr6xe"
START TRANSACTION;

UPDATE accounts SET balance = balance - 1000 WHERE id = 1;

-- Error happens

ROLLBACK;
```

---

---

# 🔹 Autocommit Mode

---

## 🔹 Default Behavior

MySQL runs:

```sql id="a0bqhb"
SET autocommit = 1;
```

👉 Each query auto-committed

---

## 🔹 Disable

```sql id="1a8pfy"
SET autocommit = 0;
```

---

👉 Now manual commit required

---

---

# 🔹 Common Mistakes 🚨

---

### ❌ Forgetting COMMIT

👉 Changes not saved

---

### ❌ Not using transactions

👉 Data inconsistency

---

### ❌ Long-running transactions

👉 Locks tables → slow system

---

---

# 🔹 Performance Tips ⚡

---

✔ Keep transactions short
✔ Use proper isolation level
✔ Avoid unnecessary locks
✔ Handle errors properly

---

---

# 🔹 Mini Practice Task

```sql id="s8y26u"
CREATE TABLE accounts (
    id INT,
    balance INT
);

INSERT INTO accounts VALUES
(1, 5000),
(2, 3000);

-- Try transaction

START TRANSACTION;

UPDATE accounts SET balance = balance - 1000 WHERE id = 1;
UPDATE accounts SET balance = balance + 1000 WHERE id = 2;

COMMIT;
```

---

## 🔚 Summary

* Transaction = group of operations
* Key commands:

  * START
  * COMMIT
  * ROLLBACK
* ACID ensures:

  * Reliability
  * Consistency
* Used in:

  * Banking
  * Orders
  * Critical systems
