## 12. Views 🔥 (Abstraction Layer over Tables)

---

## 🔹 What is a View?

A **View** is a **virtual table** created from a query.

👉 It does NOT store data (in most cases)
👉 It shows data from underlying tables

👉 In simple terms:

> View = “Saved SELECT query”

---

## 🔹 Why Use Views?

* Simplify complex queries
* Hide sensitive data
* Improve reusability
* Provide abstraction layer (like API for DB)

---

## 🔹 Basic Syntax

---

### 📌 Create View

```sql id="r9dzx6"
CREATE VIEW view_name AS
SELECT column1, column2
FROM table_name
WHERE condition;
```

---

### 📌 Example

```sql id="u4z3px"
CREATE VIEW high_salary_employees AS
SELECT name, salary
FROM employees
WHERE salary > 50000;
```

---

### 📌 Use View

```sql id="pfvfbm"
SELECT * FROM high_salary_employees;
```

---

👉 Works like a table

---

## 🔹 Types of Views

| Type               | Description            |
| ------------------ | ---------------------- |
| Simple View        | Based on single table  |
| Complex View       | Multiple tables, joins |
| Updatable View     | Can modify data        |
| Non-updatable View | Read-only              |

---

# 🔸 1. Simple View

---

```sql id="vgg35o"
CREATE VIEW employee_names AS
SELECT id, name FROM employees;
```

---

👉 Easy to use and update

---

# 🔸 2. Complex View

---

```sql id="s88m6s"
CREATE VIEW employee_details AS
SELECT e.name, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.id;
```

---

👉 Uses JOIN

---

# 🔸 3. Updatable View

---

## 🔹 Conditions for Updatable View

* Single table
* No GROUP BY
* No aggregate functions
* No JOIN

---

### 📌 Example

```sql id="8vfrjn"
CREATE VIEW simple_view AS
SELECT id, name FROM employees;
```

---

```sql id="i5v5fx"
UPDATE simple_view SET name = 'New Name' WHERE id = 1;
```

---

👉 Updates original table

---

# 🔸 4. Non-Updatable View

---

### 📌 Example

```sql id="suz3s2"
CREATE VIEW dept_avg_salary AS
SELECT department, AVG(salary)
FROM employees
GROUP BY department;
```

---

👉 Cannot update (uses aggregate)

---

---

## 🔹 Modify View

---

```sql id="uq6gbd"
CREATE OR REPLACE VIEW high_salary_employees AS
SELECT name, salary
FROM employees
WHERE salary > 60000;
```

---

---

## 🔹 Drop View

---

```sql id="k7e2gi"
DROP VIEW high_salary_employees;
```

---

---

## 🔹 View with Column Aliases

---

```sql id="g8n7kt"
CREATE VIEW emp_view AS
SELECT name AS employee_name, salary AS emp_salary
FROM employees;
```

---

---

## 🔹 Real-World Use Cases

---

### ✅ 1. Security (Hide Sensitive Data) 🔥

```sql id="qh4xbn"
CREATE VIEW user_public_data AS
SELECT id, name FROM users;
```

👉 Hide:

* password
* email

---

### ✅ 2. Simplify Complex Queries

```sql id="ysbr8r"
CREATE VIEW order_summary AS
SELECT u.name, o.amount
FROM users u
JOIN orders o ON u.id = o.user_id;
```

---

👉 Instead of writing JOIN repeatedly

---

### ✅ 3. Healthcare Example 🔥

```sql id="a3rlq5"
CREATE VIEW patient_summary AS
SELECT name, diagnosis
FROM patients;
```

---

---

### ✅ 4. Reporting Dashboard

```sql id="uq41kc"
CREATE VIEW department_salary AS
SELECT department, AVG(salary)
FROM employees
GROUP BY department;
```

---

---

### ✅ 5. API Layer (Very Important)

👉 Backend can query views instead of raw tables

---

## 🔹 Advantages

---

✔ Simplifies queries
✔ Improves security
✔ Reusable
✔ Logical abstraction

---

## 🔹 Limitations

---

❌ May affect performance (complex views)
❌ Not always updatable
❌ Depends on base tables

---

---

## 🔹 Views vs Tables

| Feature     | View        | Table   |
| ----------- | ----------- | ------- |
| Stores data | ❌ No        | ✅ Yes   |
| Performance | Depends     | Faster  |
| Use case    | Abstraction | Storage |

---

---

## 🔹 Common Mistakes 🚨

---

### ❌ Assuming view stores data

👉 It doesn’t (unless materialized)

---

### ❌ Complex nested views

👉 Hard to debug + slow

---

### ❌ Updating non-updatable views

👉 Causes error

---

---

## 🔹 Performance Tips ⚡

---

✔ Keep views simple
✔ Avoid heavy joins in views
✔ Use indexes on base tables
✔ Avoid nesting views too much

---

---

## 🔹 Mini Practice Task

```sql id="lxzlxv"
CREATE TABLE employees (
    id INT,
    name VARCHAR(50),
    salary INT
);

INSERT INTO employees VALUES
(1, 'A', 50000),
(2, 'B', 70000);

-- Create view
CREATE VIEW high_salary AS
SELECT name, salary
FROM employees
WHERE salary > 60000;

-- Use
SELECT * FROM high_salary;
```

---

## 🔚 Summary

* View = virtual table
* Based on SELECT query
* Types:

  * Simple
  * Complex
  * Updatable
* Used for:

  * Security
  * Reusability
  * Simplification
