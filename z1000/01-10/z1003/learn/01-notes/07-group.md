## 7. GROUP BY & HAVING 🔥 (Core for Analytics & Reports)

---

## 🔹 What is GROUP BY?

`GROUP BY` is used to **group rows with similar values** and apply **aggregate functions** on each group.

👉 In simple terms:

> GROUP BY = “Group data + summarize it”

---

## 🔹 Basic Syntax

```sql
SELECT column, AGGREGATE_FUNCTION(column)
FROM table_name
GROUP BY column;
```

---

## 🔹 Simple Example

### 📌 Table: employees

| id | name | department | salary |
| -- | ---- | ---------- | ------ |
| 1  | A    | IT         | 50000  |
| 2  | B    | IT         | 60000  |
| 3  | C    | HR         | 40000  |

---

### 📌 Query

```sql
SELECT department, SUM(salary)
FROM employees
GROUP BY department;
```

---

### ✅ Output

| department | SUM(salary) |
| ---------- | ----------- |
| IT         | 110000      |
| HR         | 40000       |

---

## 🔹 Common Aggregate Functions with GROUP BY

| Function  | Use        |
| --------- | ---------- |
| `COUNT()` | Count rows |
| `SUM()`   | Total      |
| `AVG()`   | Average    |
| `MAX()`   | Maximum    |
| `MIN()`   | Minimum    |

---

### 📌 Example

```sql
SELECT department, AVG(salary)
FROM employees
GROUP BY department;
```

---

## 🔹 GROUP BY Multiple Columns

```sql
SELECT department, job_role, COUNT(*)
FROM employees
GROUP BY department, job_role;
```

👉 Groups by combination

---

## 🔹 HAVING Clause 🔥

---

## 🔹 What is HAVING?

`HAVING` is used to **filter grouped data (after aggregation)**

👉 Difference:

* `WHERE` → filters rows
* `HAVING` → filters groups

---

## 🔹 Syntax

```sql
SELECT column, AGG_FUNC(column)
FROM table
GROUP BY column
HAVING condition;
```

---

### 📌 Example

```sql
SELECT department, SUM(salary) AS total_salary
FROM employees
GROUP BY department
HAVING total_salary > 50000;
```

---

### ✅ Output

| department | total_salary |
| ---------- | ------------ |
| IT         | 110000       |

---

## 🔹 WHERE vs HAVING (Very Important 🔥)

| Feature            | WHERE    | HAVING         |
| ------------------ | -------- | -------------- |
| Works on           | Rows     | Groups         |
| Used before        | GROUP BY | After GROUP BY |
| Can use aggregate? | ❌ No     | ✅ Yes          |

---

### 📌 Example

```sql
SELECT department, COUNT(*)
FROM employees
WHERE salary > 40000
GROUP BY department
HAVING COUNT(*) > 1;
```

👉 Flow:

1. Filter rows (`WHERE`)
2. Group them
3. Filter groups (`HAVING`)

---

## 🔹 Execution Order (Important)

1. FROM
2. WHERE
3. GROUP BY
4. HAVING
5. SELECT
6. ORDER BY

---

## 🔹 Real-World Use Cases

---

### ✅ 1. Dashboard Metrics

```sql
SELECT department, COUNT(*) AS total_employees
FROM employees
GROUP BY department;
```

---

### ✅ 2. Top Performing Departments

```sql
SELECT department, AVG(salary) AS avg_salary
FROM employees
GROUP BY department
HAVING avg_salary > 50000;
```

---

### ✅ 3. E-commerce Example

```sql
SELECT category, SUM(price) AS total_sales
FROM products
GROUP BY category;
```

---

### ✅ 4. Healthcare Example 🔥

```sql
SELECT diagnosis, COUNT(*) AS patient_count
FROM patients
GROUP BY diagnosis
HAVING patient_count > 5;
```

👉 Find common diseases

---

### ✅ 5. Banking Example

```sql
SELECT account_type, SUM(balance)
FROM accounts
GROUP BY account_type;
```

---

## 🔹 GROUP BY with ORDER BY

```sql
SELECT department, SUM(salary) AS total
FROM employees
GROUP BY department
ORDER BY total DESC;
```

---

## 🔹 GROUP BY with LIMIT

```sql
SELECT department, SUM(salary) AS total
FROM employees
GROUP BY department
ORDER BY total DESC
LIMIT 3;
```

👉 Top 3 departments

---

## 🔹 Common Mistakes 🚨

---

### ❌ Missing GROUP BY column

```sql
SELECT department, name, COUNT(*)
FROM employees
GROUP BY department;
```

👉 Error / undefined behavior

---

### ❌ Using WHERE with aggregate

```sql
WHERE COUNT(*) > 2; -- ❌ wrong
```

👉 Use HAVING

---

### ❌ Confusing WHERE & HAVING

👉 Rule:

* Row filter → WHERE
* Group filter → HAVING

---

## 🔹 Performance Tips ⚡

---

✔ Use WHERE before GROUP BY (reduces data early)
✔ Index grouping columns
✔ Avoid grouping large unnecessary datasets
✔ Use LIMIT for large reports

---

## 🔹 Mini Practice Task

```sql
CREATE TABLE employees (
    id INT,
    name VARCHAR(50),
    department VARCHAR(50),
    salary INT
);

INSERT INTO employees VALUES
(1, 'A', 'IT', 50000),
(2, 'B', 'IT', 60000),
(3, 'C', 'HR', 40000),
(4, 'D', 'HR', 45000);

-- Try queries

-- 1. Count employees per department
SELECT department, COUNT(*)
FROM employees
GROUP BY department;

-- 2. Average salary per department
SELECT department, AVG(salary)
FROM employees
GROUP BY department;

-- 3. Departments with avg salary > 45000
SELECT department, AVG(salary) AS avg_sal
FROM employees
GROUP BY department
HAVING avg_sal > 45000;
```

---

## 🔚 Summary

* `GROUP BY` → groups data
* `HAVING` → filters grouped data
* Works with:

  * COUNT, SUM, AVG, MAX, MIN
* Core for:

  * Dashboards
  * Reports
  * Analytics
