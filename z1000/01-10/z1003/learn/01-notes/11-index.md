## 11. Indexing (Performance Core) 🔥

---

## 🔹 What is Indexing?

An **Index** is a data structure that improves the **speed of data retrieval**.

👉 In simple terms:

> Index = “Shortcut to find data faster”

---

## 🔹 Real-Life Analogy

* Without index → Read entire book 📖
* With index → Go directly to page 📄

👉 Same in DB:

* Without index → Full table scan
* With index → Direct lookup

---

## 🔹 Why Indexing is Important?

* Speeds up **SELECT queries**
* Essential for:

  * Large datasets
  * Production systems
  * APIs

---

## 🔹 Basic Syntax

---

### 📌 Create Index

```sql id="hqq5pp"
CREATE INDEX idx_name
ON employees(name);
```

---

### 📌 Create Unique Index

```sql id="cgz48f"
CREATE UNIQUE INDEX idx_email
ON users(email);
```

---

### 📌 Show Indexes

```sql id="4s4yeh"
SHOW INDEX FROM employees;
```

---

### 📌 Drop Index

```sql id="79fxk7"
DROP INDEX idx_name ON employees;
```

---

## 🔹 Types of Indexes

---

# 🔸 1. Single Column Index

```sql id="r67z4t"
CREATE INDEX idx_salary ON employees(salary);
```

👉 Speeds up:

```sql id="9ljp0x"
SELECT * FROM employees WHERE salary = 50000;
```

---

# 🔸 2. Composite Index 🔥

---

```sql id="k2bb1k"
CREATE INDEX idx_dept_salary
ON employees(department, salary);
```

---

👉 Works for:

```sql id="7zti7n"
WHERE department = 'IT' AND salary = 50000;
```

---

👉 NOT efficient for:

```sql id="snkknr"
WHERE salary = 50000;
```

---

👉 Rule:

> Index works left → right

---

# 🔸 3. Unique Index

```sql id="svq2t8"
CREATE UNIQUE INDEX idx_email ON users(email);
```

👉 Prevents duplicates

---

# 🔸 4. Primary Key Index

```sql id="cg6av8"
id INT PRIMARY KEY
```

👉 Automatically indexed

---

# 🔸 5. Full-Text Index 🔥

---

```sql id="z01p4m"
CREATE FULLTEXT INDEX idx_desc
ON products(description);
```

---

👉 Used for search:

```sql id="4w18t6"
SELECT * FROM products
WHERE MATCH(description) AGAINST('laptop');
```

---

# 🔸 6. Clustered vs Non-Clustered (Concept)

| Type          | Meaning                              |
| ------------- | ------------------------------------ |
| Clustered     | Data stored with index (Primary Key) |
| Non-clustered | Separate structure                   |

---

(MySQL InnoDB → clustered on PK)

---

## 🔹 How Index Works (Concept)

---

Without index:

```sql id="4gnis8"
SELECT * FROM employees WHERE name = 'John';
```

👉 MySQL scans every row ❌

---

With index:

👉 Uses **B-Tree structure**
👉 Direct lookup → faster ✅

---

## 🔹 Real-World Use Cases

---

### ✅ 1. Login System 🔥

```sql id="ks3c2f"
SELECT * FROM users WHERE email = 'test@gmail.com';
```

👉 Index on `email`

---

### ✅ 2. E-commerce Search

```sql id="7l76nv"
SELECT * FROM products WHERE name LIKE 'iphone%';
```

👉 Index on `name`

---

### ✅ 3. Healthcare

```sql id="hnhs84"
SELECT * FROM patients WHERE diagnosis = 'Diabetes';
```

👉 Index on `diagnosis`

---

### ✅ 4. Pagination APIs

```sql id="q2nf1z"
SELECT * FROM orders ORDER BY created_at DESC LIMIT 10;
```

👉 Index on `created_at`

---

---

## 🔹 When to Use Index

---

✔ Frequently used in WHERE
✔ Used in JOIN conditions
✔ Used in ORDER BY
✔ Used in GROUP BY

---

## 🔹 When NOT to Use Index 🚨

---

❌ Small tables
❌ Columns with frequent updates
❌ Columns with low uniqueness (e.g., gender)
❌ Too many indexes (slows INSERT/UPDATE)

---

---

## 🔹 Performance Example

---

### ❌ Without Index

```sql id="av4zb6"
SELECT * FROM users WHERE email = 'abc@gmail.com';
```

👉 Full scan → slow

---

### ✅ With Index

```sql id="g07n7v"
CREATE INDEX idx_email ON users(email);
```

👉 Direct lookup → fast

---

---

## 🔹 EXPLAIN (Very Important 🔥)

---

```sql id="3r1iw1"
EXPLAIN SELECT * FROM users WHERE email = 'abc@gmail.com';
```

---

👉 Shows:

* Query plan
* Index usage
* Scan type

---

---

## 🔹 Common Mistakes 🚨

---

### ❌ Too many indexes

👉 Slows:

* INSERT
* UPDATE
* DELETE

---

### ❌ Wrong column order in composite index

```sql id="p0d7x7"
(department, salary)
```

👉 Must match query order

---

### ❌ Using functions on indexed columns

```sql id="4pgnfx"
WHERE UPPER(name) = 'JOHN';
```

👉 Index not used

---

---

## 🔹 Pro Tips (Production Level) ⚡

---

✔ Always index:

* Primary keys
* Foreign keys

✔ Use composite index for multi-column filters

✔ Use `EXPLAIN` before optimization

✔ Monitor slow queries

✔ Use covering indexes (advanced)

---

---

## 🔹 Mini Practice Task

```sql id="9sr74z"
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    salary INT
);

-- Create index
CREATE INDEX idx_name ON employees(name);

-- Test
EXPLAIN SELECT * FROM employees WHERE name = 'A';
```

---

## 🔚 Summary

* Index = performance booster
* Speeds up SELECT
* Types:

  * Single
  * Composite
  * Unique
  * Full-text
* Key:

  * Use wisely
  * Avoid over-indexing
