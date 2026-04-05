## 9. Subqueries (Nested Queries) 🔥

---

## 🔹 What is a Subquery?

A **subquery** is a query **inside another query**.

👉 In simple terms:

> Subquery = “Query inside query”

---

## 🔹 Why Use Subqueries?

* Break complex problems into smaller queries
* Fetch data based on another query result
* Used in filtering, comparisons, calculations

---

## 🔹 Basic Syntax

```sql id="1m8k9m"
SELECT column
FROM table
WHERE column OPERATOR (
    SELECT column FROM table
);
```

---

## 🔹 Types of Subqueries

| Type                      | Description             |
| ------------------------- | ----------------------- |
| **Single Row Subquery**   | Returns one value       |
| **Multiple Row Subquery** | Returns multiple values |
| **Correlated Subquery**   | Runs per row            |
| **Subquery in SELECT**    | Used as column          |
| **Subquery in FROM**      | Acts as derived table   |

---

# 🔸 1. Single Row Subquery

---

### 📌 Example: Highest Salary

```sql id="wnh69g"
SELECT name, salary
FROM employees
WHERE salary = (
    SELECT MAX(salary) FROM employees
);
```

👉 Inner query → gets max salary
👉 Outer query → finds employee

---

# 🔸 2. Multiple Row Subquery

---

### 📌 Example: Departments with high salary

```sql id="yjnay2"
SELECT *
FROM employees
WHERE department IN (
    SELECT department
    FROM employees
    WHERE salary > 50000
);
```

---

👉 Inner → returns multiple departments
👉 Outer → filters employees

---

# 🔸 3. Correlated Subquery 🔥

---

## 🔹 Definition

* Inner query depends on outer query
* Executes **once per row**

---

### 📌 Example

```sql id="xsp6vb"
SELECT name, salary
FROM employees e1
WHERE salary > (
    SELECT AVG(salary)
    FROM employees e2
    WHERE e1.department = e2.department
);
```

---

👉 Finds employees earning above their department average

---

# 🔸 4. Subquery in SELECT

---

### 📌 Example

```sql id="m2s9u1"
SELECT name,
       (SELECT AVG(salary) FROM employees) AS avg_salary
FROM employees;
```

---

👉 Adds computed column

---

# 🔸 5. Subquery in FROM (Derived Table)

---

### 📌 Example

```sql id="y0v9yv"
SELECT department, AVG(salary)
FROM (
    SELECT * FROM employees WHERE salary > 30000
) AS temp
GROUP BY department;
```

---

👉 Treat subquery as temporary table

---

# 🔹 EXISTS vs IN 🔥

---

## 📌 IN

```sql id="zkr9ec"
SELECT *
FROM employees
WHERE department IN (
    SELECT department FROM departments
);
```

---

## 📌 EXISTS

```sql id="n6y0y2"
SELECT *
FROM employees e
WHERE EXISTS (
    SELECT 1
    FROM departments d
    WHERE e.department = d.name
);
```

---

### 🔥 Difference

| Feature     | IN                  | EXISTS        |
| ----------- | ------------------- | ------------- |
| Works with  | Values              | Rows          |
| Performance | Slower (large data) | Faster        |
| Use case    | Small dataset       | Large dataset |

---

# 🔹 Real-World Use Cases

---

### ✅ 1. Find Highest Paid Employee

```sql id="b7xz3j"
SELECT *
FROM employees
WHERE salary = (SELECT MAX(salary) FROM employees);
```

---

### ✅ 2. E-commerce Example

```sql id="l5r3i5"
SELECT *
FROM products
WHERE price > (
    SELECT AVG(price) FROM products
);
```

---

### ✅ 3. Healthcare Example 🔥

```sql id="z22nkg"
SELECT *
FROM patients
WHERE age > (
    SELECT AVG(age) FROM patients
);
```

---

### ✅ 4. Banking Example

```sql id="z3k60o"
SELECT *
FROM accounts
WHERE balance > (
    SELECT AVG(balance) FROM accounts
);
```

---

### ✅ 5. Filter Using EXISTS

```sql id="mc3lj6"
SELECT *
FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o
    WHERE c.id = o.customer_id
);
```

👉 Customers who placed orders

---

# 🔹 Subquery vs JOIN 🔥

---

### 📌 Subquery

```sql id="q2r3tj"
SELECT name
FROM employees
WHERE department_id = (
    SELECT id FROM departments WHERE name = 'IT'
);
```

---

### 📌 JOIN (Better Performance)

```sql id="w7hvff"
SELECT e.name
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE d.name = 'IT';
```

---

👉 JOIN is usually faster

---

# 🔹 Common Mistakes 🚨

---

### ❌ Subquery returns multiple rows in `=`

```sql id="p0vl9y"
WHERE salary = (SELECT salary FROM employees);
```

👉 Error

---

### ❌ Overusing subqueries

👉 Use JOIN instead when possible

---

### ❌ Performance issues

👉 Nested queries can be slow

---

# 🔹 Performance Tips ⚡

---

✔ Prefer JOIN over subquery (when possible)
✔ Use EXISTS for large datasets
✔ Avoid deeply nested subqueries
✔ Index columns used in subqueries

---

# 🔹 Mini Practice Task

```sql id="h6kb93"
CREATE TABLE employees (
    id INT,
    name VARCHAR(50),
    salary INT,
    department VARCHAR(50)
);

INSERT INTO employees VALUES
(1, 'A', 50000, 'IT'),
(2, 'B', 60000, 'IT'),
(3, 'C', 40000, 'HR');

-- Try

-- 1. Highest salary
SELECT * FROM employees
WHERE salary = (SELECT MAX(salary) FROM employees);

-- 2. Above average salary
SELECT * FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- 3. Department average comparison
SELECT name, salary FROM employees e1
WHERE salary > (
    SELECT AVG(salary)
    FROM employees e2
    WHERE e1.department = e2.department
);
```

---

## 🔚 Summary

* Subquery = query inside query
* Types:

  * Single row
  * Multiple row
  * Correlated
* Used in:

  * Filtering
  * Comparisons
  * Calculations
* Key:

  * Use JOIN when possible
  * Use EXISTS for performance
