## 4. DQL (Data Query Language) — `SELECT` 🔥

---

## 🔹 What is DQL?

**DQL (Data Query Language)** is used to **retrieve data from the database**.

👉 The main command:

```sql
SELECT
```

👉 In simple terms:

> DQL = “Get data from tables”

---

## 🔹 Basic SELECT Syntax

```sql
SELECT column1, column2
FROM table_name;
```

---

### 📌 Example

```sql
SELECT name, salary
FROM employees;
```

---

## 🔹 Select All Columns

```sql
SELECT * FROM employees;
```

👉 `*` = all columns
⚠️ Avoid in production (performance issue)

---

## 🔹 Selecting Specific Columns

```sql
SELECT name, salary
FROM employees;
```

👉 Better performance + clarity

---

## 🔹 Using Aliases (Rename Output)

```sql
SELECT name AS employee_name, salary AS emp_salary
FROM employees;
```

---

## 🔹 DISTINCT (Unique Values)

```sql
SELECT DISTINCT department
FROM employees;
```

👉 Removes duplicates

---

## 🔹 WHERE Clause (Filtering Intro)

```sql
SELECT *
FROM employees
WHERE salary > 50000;
```

👉 (Detailed in Topic 5)

---

## 🔹 ORDER BY (Sorting)

```sql
SELECT *
FROM employees
ORDER BY salary ASC;
```

---

### 📌 Descending

```sql
ORDER BY salary DESC;
```

---

## 🔹 LIMIT (Top N Records)

```sql
SELECT *
FROM employees
LIMIT 5;
```

---

### 📌 Pagination (Important 🔥)

```sql
SELECT *
FROM employees
LIMIT 5 OFFSET 5;
```

👉 Used in:

* APIs
* UI pagination

---

## 🔹 Real-World Example

---

### ✅ Employee System

```sql
SELECT name, salary
FROM employees
WHERE salary > 50000
ORDER BY salary DESC
LIMIT 3;
```

👉 Get top 3 highest-paid employees

---

### ✅ Healthcare Example

```sql
SELECT name, diagnosis
FROM patients
WHERE age > 50;
```

---

### ✅ E-commerce Example

```sql
SELECT product_name, price
FROM products
ORDER BY price DESC
LIMIT 10;
```

👉 Top 10 expensive products

---

## 🔹 Expressions in SELECT

---

### 📌 Calculations

```sql
SELECT name, salary * 12 AS yearly_salary
FROM employees;
```

---

### 📌 String Functions

```sql
SELECT UPPER(name) AS name_upper
FROM employees;
```

---

## 🔹 SELECT with Conditions

```sql
SELECT *
FROM employees
WHERE salary BETWEEN 40000 AND 80000;
```

---

```sql
SELECT *
FROM employees
WHERE name LIKE 'J%';
```

👉 Names starting with J

---

## 🔹 SELECT Execution Order (Very Important 🔥)

Even though we write:

```sql
SELECT name
FROM employees
WHERE salary > 50000
ORDER BY salary;
```

👉 Internally MySQL runs:

1. FROM
2. WHERE
3. SELECT
4. ORDER BY
5. LIMIT

👉 Helps in:

* Debugging
* Optimization

---

## 🔹 Real-World Use Cases

---

### ✅ 1. Backend APIs (Most Important)

```sql
SELECT * FROM users WHERE email = 'test@gmail.com';
```

👉 Login system

---

### ✅ 2. Dashboard Data

```sql
SELECT COUNT(*) FROM orders;
```

---

### ✅ 3. Reports

```sql
SELECT department, AVG(salary)
FROM employees;
```

👉 (Used with GROUP BY later)

---

### ✅ 4. Search Feature

```sql
SELECT * FROM products
WHERE name LIKE '%phone%';
```

---

## 🔹 Common Mistakes 🚨

---

### ❌ Using `SELECT *` in production

👉 Loads unnecessary data

---

### ❌ Missing WHERE condition

```sql
SELECT * FROM orders;
```

👉 Loads huge data → slow

---

### ❌ Wrong ORDER BY column

```sql
ORDER BY non_existing_column;
```

---

## 🔹 Pro Tips (Production Level)

---

✔ Always specify columns
✔ Use indexes (covered later)
✔ Combine LIMIT + OFFSET for pagination
✔ Avoid heavy queries without filters
✔ Use aliases for readability

---

## 🔹 Mini Practice Task

```sql
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    marks INT
);

INSERT INTO students (name, marks)
VALUES ('A', 80), ('B', 90), ('C', 70);

-- Queries
SELECT * FROM students;

SELECT name, marks FROM students;

SELECT * FROM students WHERE marks > 75;

SELECT * FROM students ORDER BY marks DESC;

SELECT * FROM students LIMIT 2;
```

---

## 🔚 Summary

* DQL = Data retrieval
* Main command: `SELECT`
* Key features:

  * Filtering (`WHERE`)
  * Sorting (`ORDER BY`)
  * Limiting (`LIMIT`)
  * Aliases & expressions
