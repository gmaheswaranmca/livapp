## 6. Functions in MySQL 🔥

---

## 🔹 What are Functions?

Functions are **built-in operations** used to:

* Transform data
* Perform calculations
* Aggregate results

👉 In simple terms:

> Functions = “Do work on data”

---

## 🔹 Types of Functions

| Type                    | Purpose               |
| ----------------------- | --------------------- |
| **String Functions**    | Work with text        |
| **Numeric Functions**   | Work with numbers     |
| **Date Functions**      | Work with dates       |
| **Aggregate Functions** | Work on multiple rows |

---

# 🔸 1. String Functions

---

### 📌 UPPER / LOWER

```sql
SELECT UPPER(name) FROM employees;
SELECT LOWER(name) FROM employees;
```

---

### 📌 LENGTH

```sql
SELECT LENGTH(name) FROM employees;
```

---

### 📌 CONCAT

```sql
SELECT CONCAT(first_name, ' ', last_name) AS full_name
FROM employees;
```

---

### 📌 SUBSTRING

```sql
SELECT SUBSTRING(name, 1, 3) FROM employees;
```

👉 First 3 characters

---

### 📌 TRIM

```sql
SELECT TRIM(name) FROM employees;
```

👉 Removes spaces

---

### 📌 REPLACE

```sql
SELECT REPLACE(name, 'a', 'x') FROM employees;
```

---

### ✅ Real Use Case

```sql
SELECT UPPER(name) AS name_upper
FROM users;
```

👉 Display formatting in UI

---

# 🔸 2. Numeric Functions

---

### 📌 ROUND

```sql
SELECT ROUND(123.456, 2);
```

---

### 📌 CEIL / FLOOR

```sql
SELECT CEIL(10.2);   -- 11
SELECT FLOOR(10.9);  -- 10
```

---

### 📌 ABS

```sql
SELECT ABS(-100);
```

---

### 📌 MOD

```sql
SELECT MOD(10, 3); -- 1
```

---

### ✅ Use Case

```sql
SELECT salary, ROUND(salary * 1.1, 2)
FROM employees;
```

👉 Salary increment calculation

---

# 🔸 3. Date Functions (Very Important 🔥)

---

### 📌 NOW()

```sql
SELECT NOW();
```

---

### 📌 CURDATE()

```sql
SELECT CURDATE();
```

---

### 📌 DATE_FORMAT

```sql
SELECT DATE_FORMAT(NOW(), '%d-%m-%Y');
```

---

### 📌 DATEDIFF

```sql
SELECT DATEDIFF('2026-01-01', '2025-01-01');
```

---

### 📌 ADDDATE

```sql
SELECT ADDDATE(NOW(), INTERVAL 7 DAY);
```

---

### ✅ Use Case

```sql
SELECT name, DATEDIFF(CURDATE(), join_date) AS days_worked
FROM employees;
```

---

# 🔸 4. Aggregate Functions 🔥

👉 Work on multiple rows

---

### 📌 COUNT

```sql
SELECT COUNT(*) FROM employees;
```

---

### 📌 SUM

```sql
SELECT SUM(salary) FROM employees;
```

---

### 📌 AVG

```sql
SELECT AVG(salary) FROM employees;
```

---

### 📌 MAX / MIN

```sql
SELECT MAX(salary), MIN(salary)
FROM employees;
```

---

### ✅ Real Example

```sql
SELECT department, AVG(salary)
FROM employees
GROUP BY department;
```

👉 (Next topic 🔥)

---

# 🔹 Combining Functions

---

```sql
SELECT UPPER(name), ROUND(salary)
FROM employees;
```

---

```sql
SELECT CONCAT(name, ' - ', salary)
FROM employees;
```

---

# 🔹 NULL Handling Functions

---

### 📌 IFNULL

```sql
SELECT IFNULL(email, 'No Email')
FROM employees;
```

---

### 📌 COALESCE

```sql
SELECT COALESCE(email, phone, 'No Contact')
FROM users;
```

---

# 🔹 Real-World Use Cases

---

### ✅ 1. Dashboard Metrics

```sql
SELECT COUNT(*) AS total_users FROM users;
```

---

### ✅ 2. Financial Reports

```sql
SELECT SUM(amount) FROM transactions;
```

---

### ✅ 3. Healthcare Example

```sql
SELECT AVG(age) FROM patients;
```

---

### ✅ 4. Formatting Data

```sql
SELECT CONCAT(name, ' (', age, ')')
FROM patients;
```

---

### ✅ 5. Time-Based Queries

```sql
SELECT * FROM orders
WHERE order_date >= CURDATE();
```

---

# 🔹 Performance Consideration ⚡

---

### ❌ Bad

```sql
SELECT * FROM users WHERE UPPER(name) = 'JOHN';
```

👉 Index not used

---

### ✅ Better

```sql
SELECT * FROM users WHERE name = 'John';
```

---

# 🔹 Common Mistakes 🚨

---

### ❌ Using aggregate without GROUP BY

```sql
SELECT department, COUNT(*) FROM employees;
```

👉 Error or wrong result

---

### ❌ Ignoring NULL values

👉 Functions may return NULL

---

# 🔹 Pro Tips (Production Level)

---

✔ Use functions for transformation, not filtering
✔ Avoid functions on indexed columns
✔ Use aggregate functions for analytics
✔ Combine with GROUP BY for reports

---

# 🔹 Mini Practice Task

```sql
CREATE TABLE employees (
    id INT,
    name VARCHAR(50),
    salary DECIMAL(10,2),
    join_date DATE
);

INSERT INTO employees VALUES
(1, 'A', 50000, '2023-01-01'),
(2, 'B', 60000, '2022-01-01');

-- Try
SELECT UPPER(name) FROM employees;

SELECT ROUND(salary) FROM employees;

SELECT DATEDIFF(CURDATE(), join_date) FROM employees;

SELECT AVG(salary) FROM employees;
```

---

## 🔚 Summary

* Functions = operations on data
* Types:

  * String
  * Numeric
  * Date
  * Aggregate
* Used for:

  * Data transformation
  * Analytics
  * Reporting
