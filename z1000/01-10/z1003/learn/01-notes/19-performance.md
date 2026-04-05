## 19. Performance Tuning 🔥 (Production-Level Optimization)

---

## 🔹 What is Performance Tuning?

Performance tuning is the process of **optimizing queries, indexes, and database configuration** to make your system:

* Faster ⚡
* Scalable 📈
* Efficient 💡

👉 In simple terms:

> Performance Tuning = “Make queries run fast and handle large data”

---

## 🔹 Why It Matters?

Without tuning:

* ❌ Slow APIs
* ❌ High server load
* ❌ Bad user experience

With tuning:

* ✅ Fast queries
* ✅ Scalable system
* ✅ Production-ready

---

# 🔸 1. Query Optimization 🔥

---

## 🔹 Goal

Write efficient SQL queries

---

### ❌ Bad Query

```sql id="4f8y1k"
SELECT * FROM employees;
```

👉 Loads unnecessary data

---

### ✅ Optimized Query

```sql id="e3d7q1"
SELECT id, name FROM employees WHERE department = 'IT';
```

---

---

## 🔹 Use WHERE Clause

```sql id="8d2m3k"
SELECT * FROM orders WHERE user_id = 10;
```

👉 Reduces scanned rows

---

---

## 🔹 Avoid Functions on Columns

```sql id="d2x8z1"
WHERE UPPER(name) = 'JOHN'; -- ❌
```

👉 Index not used

---

---

## 🔹 Use LIMIT

```sql id="k2p1w8"
SELECT * FROM orders LIMIT 10;
```

---

---

# 🔸 2. Index Tuning 🔥

---

## 🔹 Add Index

```sql id="u2x3k1"
CREATE INDEX idx_email ON users(email);
```

---

## 🔹 Composite Index

```sql id="g9d2w7"
CREATE INDEX idx_user_date ON orders(user_id, created_at);
```

---

## 🔹 Remove Unused Index

```sql id="z1q9p2"
DROP INDEX idx_old ON table_name;
```

---

---

## 🔹 Check Index Usage

```sql id="f4k7x2"
EXPLAIN SELECT * FROM users WHERE email = 'a@gmail.com';
```

---

👉 Look for:

* `type = ref` or `const` (good)
* `type = ALL` (bad → full scan)

---

---

# 🔸 3. Slow Query Log 🔥

---

## 🔹 Enable Slow Query Log

```sql id="z8x1y2"
SET GLOBAL slow_query_log = 'ON';
```

---

## 🔹 Set Threshold

```sql id="q3r7k9"
SET GLOBAL long_query_time = 2;
```

👉 Queries > 2 sec logged

---

---

## 🔹 View Slow Queries

```sql id="y2m4t7"
SHOW VARIABLES LIKE 'slow_query_log_file';
```

---

---

## 🔹 Why Important?

👉 Helps identify:

* Slow queries
* Performance bottlenecks

---

---

# 🔸 4. Connection Pooling 🔥

---

## 🔹 What is Connection Pooling?

Reusing database connections instead of creating new ones

---

## 🔹 Without Pooling

❌ Every request creates connection
👉 Slow + heavy

---

## 🔹 With Pooling

✅ Reuse connections
👉 Fast + efficient

---

---

## 🔹 Example (Node.js)

```javascript id="h8k2p3"
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'app_db',
  connectionLimit: 10
});
```

---

---

# 🔸 5. Caching Strategies 🔥

---

## 🔹 What is Caching?

Store frequently accessed data

---

## 🔹 Types

| Type        | Example                              |
| ----------- | ------------------------------------ |
| Query Cache | MySQL (deprecated in newer versions) |
| App Cache   | Redis                                |
| API Cache   | Response caching                     |

---

---

## 🔹 Example

👉 Instead of querying DB repeatedly:

* Store result in Redis
* Serve from cache

---

---

# 🔸 6. Query Execution Plan (EXPLAIN) 🔥

---

## 🔹 Example

```sql id="k7p9w1"
EXPLAIN SELECT * FROM orders WHERE user_id = 10;
```

---

## 🔹 Key Columns

| Column | Meaning       |
| ------ | ------------- |
| type   | Access method |
| key    | Index used    |
| rows   | Rows scanned  |

---

---

# 🔸 7. Table Optimization

---

## 🔹 Use Proper Data Types

```sql id="j2p4n7"
age INT        -- good
age VARCHAR    -- bad
```

---

---

## 🔹 Avoid NULLs

👉 Saves space + improves performance

---

---

## 🔹 Normalize Tables

👉 Reduce redundancy

---

---

# 🔸 8. Pagination Optimization 🔥

---

### ❌ Bad

```sql id="a2p9z7"
LIMIT 10000, 10;
```

👉 Slow for large offset

---

### ✅ Better

```sql id="k1x8d4"
WHERE id > last_id LIMIT 10;
```

---

---

# 🔸 9. Real-World Use Cases

---

### ✅ 1. Login System

```sql id="p3z7k1"
SELECT * FROM users WHERE email = 'test@gmail.com';
```

👉 Index on email

---

---

### ✅ 2. E-commerce 🔥

```sql id="q8x2k7"
SELECT * FROM products WHERE category = 'Mobile';
```

👉 Index on category

---

---

### ✅ 3. Healthcare System 🔥

```sql id="m2z8k4"
SELECT * FROM patients WHERE diagnosis = 'Diabetes';
```

👉 Index on diagnosis

---

---

### ✅ 4. Analytics Dashboard

```sql id="v9x2p1"
SELECT department, COUNT(*) FROM employees GROUP BY department;
```

---

---

# 🔹 Common Mistakes 🚨

---

### ❌ SELECT *

👉 Loads unnecessary data

---

### ❌ Too many joins

👉 Slows query

---

### ❌ Missing indexes

👉 Full table scan

---

---

# 🔹 Performance Checklist ✅

---

✔ Use indexes on WHERE columns
✔ Avoid full table scans
✔ Use EXPLAIN
✔ Optimize joins
✔ Cache frequently used data
✔ Use connection pooling
✔ Monitor slow queries

---

---

# 🔹 Mini Practice Task

```sql id="k2m4p9"
-- Check query plan
EXPLAIN SELECT * FROM employees WHERE department = 'IT';

-- Add index
CREATE INDEX idx_dept ON employees(department);

-- Recheck performance
EXPLAIN SELECT * FROM employees WHERE department = 'IT';
```

---

## 🔚 Summary

* Performance tuning = optimization
* Key areas:

  * Query optimization
  * Index tuning
  * Slow query log
  * Connection pooling
  * Caching
* Tools:

  * EXPLAIN
  * Indexes
  * Logs

---
