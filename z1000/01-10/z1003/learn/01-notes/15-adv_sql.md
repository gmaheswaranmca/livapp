## 15. Advanced SQL 🔥 (Window Functions, CTE, Recursive, Advanced Aggregations)

This is where SQL becomes **powerful for analytics, reporting, and complex logic**.

---

# 🔹 1. Window Functions 🔥

---

## 🔹 What are Window Functions?

They perform calculations **across rows related to the current row**, without collapsing results (unlike GROUP BY).

👉 In simple terms:

> Window Function = “Aggregate + keep all rows”

---

## 🔹 Syntax

```sql id="v7x8k2"
SELECT column,
       FUNCTION() OVER (PARTITION BY column ORDER BY column)
FROM table;
```

---

## 🔹 Common Window Functions

| Function     | Purpose           |
| ------------ | ----------------- |
| ROW_NUMBER() | Unique row number |
| RANK()       | Rank with gaps    |
| DENSE_RANK() | Rank without gaps |
| LAG()        | Previous row      |
| LEAD()       | Next row          |

---

## 🔸 ROW_NUMBER()

```sql id="jx9v3q"
SELECT name, salary,
       ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num
FROM employees;
```

👉 Assigns unique ranking

---

## 🔸 RANK()

```sql id="v5mn1c"
SELECT name, salary,
       RANK() OVER (ORDER BY salary DESC) AS rank
FROM employees;
```

👉 Same rank → skip numbers

---

## 🔸 DENSE_RANK()

```sql id="o2a9x4"
SELECT name, salary,
       DENSE_RANK() OVER (ORDER BY salary DESC) AS rank
FROM employees;
```

👉 No gaps

---

## 🔸 PARTITION BY (Important 🔥)

```sql id="y7p2bt"
SELECT name, department, salary,
       RANK() OVER (PARTITION BY department ORDER BY salary DESC)
FROM employees;
```

👉 Ranking inside each department

---

## 🔸 LAG / LEAD

```sql id="y5wqv8"
SELECT name, salary,
       LAG(salary) OVER (ORDER BY salary) AS prev_salary
FROM employees;
```

---

👉 Compare with previous row

---

---

# 🔹 2. CTE (Common Table Expressions) 🔥

---

## 🔹 What is CTE?

A **temporary named result set** used within a query.

👉 In simple terms:

> CTE = “Temporary table inside query”

---

## 🔹 Syntax

```sql id="4zqvhm"
WITH cte_name AS (
    SELECT ...
)
SELECT * FROM cte_name;
```

---

## 🔹 Example

```sql id="1k5xwr"
WITH high_salary AS (
    SELECT * FROM employees WHERE salary > 50000
)
SELECT * FROM high_salary;
```

---

---

## 🔹 CTE with JOIN

```sql id="ycfp0g"
WITH dept_avg AS (
    SELECT department, AVG(salary) AS avg_sal
    FROM employees
    GROUP BY department
)
SELECT e.name, e.salary
FROM employees e
JOIN dept_avg d ON e.department = d.department
WHERE e.salary > d.avg_sal;
```

---

---

# 🔹 3. Recursive CTE 🔥

---

## 🔹 What is Recursive Query?

Used for:

* Hierarchies
* Tree structures
* Graph traversal

---

## 🔹 Syntax

```sql id="j7p6f3"
WITH RECURSIVE cte_name AS (
    SELECT ...  -- base case
    UNION ALL
    SELECT ... FROM cte_name WHERE condition
)
SELECT * FROM cte_name;
```

---

## 🔹 Example (Employee Hierarchy)

```sql id="6l4o9k"
WITH RECURSIVE emp_hierarchy AS (
    SELECT id, name, manager_id
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    SELECT e.id, e.name, e.manager_id
    FROM employees e
    JOIN emp_hierarchy h ON e.manager_id = h.id
)
SELECT * FROM emp_hierarchy;
```

---

👉 Gets full hierarchy

---

---

# 🔹 4. Advanced Aggregations 🔥

---

## 🔸 GROUPING Multiple Levels

```sql id="e3q2j7"
SELECT department, job_role, COUNT(*)
FROM employees
GROUP BY department, job_role;
```

---

---

## 🔸 Conditional Aggregation

```sql id="bt2rj8"
SELECT 
    COUNT(CASE WHEN salary > 50000 THEN 1 END) AS high_salary,
    COUNT(CASE WHEN salary <= 50000 THEN 1 END) AS low_salary
FROM employees;
```

---

---

## 🔸 Running Total (Window Function)

```sql id="6s8y2d"
SELECT name, salary,
       SUM(salary) OVER (ORDER BY id) AS running_total
FROM employees;
```

---

---

## 🔸 Moving Average

```sql id="b5n4p1"
SELECT name, salary,
       AVG(salary) OVER (ORDER BY id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)
FROM employees;
```

---

---

# 🔹 Real-World Use Cases

---

### ✅ 1. Leaderboard System 🔥

```sql id="1fj2m4"
SELECT name, score,
       RANK() OVER (ORDER BY score DESC)
FROM players;
```

---

---

### ✅ 2. E-commerce Analytics

```sql id="x1m2n3"
SELECT category, SUM(price)
FROM products
GROUP BY category;
```

---

---

### ✅ 3. Healthcare Example 🔥

```sql id="m4v8c2"
SELECT name, diagnosis,
       COUNT(*) OVER (PARTITION BY diagnosis)
FROM patients;
```

👉 Count patients per disease

---

---

### ✅ 4. Sales Trend Analysis

```sql id="8k2j4h"
SELECT date, sales,
       LAG(sales) OVER (ORDER BY date)
FROM sales;
```

---

---

### ✅ 5. Organizational Hierarchy

👉 Recursive CTE

---

---

# 🔹 Common Mistakes 🚨

---

### ❌ Confusing GROUP BY vs Window

👉 GROUP BY → reduces rows
👉 Window → keeps rows

---

### ❌ Missing PARTITION BY

👉 Wrong grouping

---

### ❌ Heavy recursive queries

👉 Performance issue

---

---

# 🔹 Performance Tips ⚡

---

✔ Use window functions for analytics
✔ Use CTE for readability
✔ Avoid deep recursion
✔ Index columns used in joins

---

---

# 🔹 Mini Practice Task

```sql id="d5k3l8"
CREATE TABLE employees (
    id INT,
    name VARCHAR(50),
    department VARCHAR(50),
    salary INT
);

INSERT INTO employees VALUES
(1, 'A', 'IT', 50000),
(2, 'B', 'IT', 60000),
(3, 'C', 'HR', 40000);

-- Try

-- ROW_NUMBER
SELECT name, ROW_NUMBER() OVER (ORDER BY salary DESC)
FROM employees;

-- CTE
WITH high_salary AS (
    SELECT * FROM employees WHERE salary > 50000
)
SELECT * FROM high_salary;
```

---

## 🔚 Summary

* Window functions → analytics without grouping
* CTE → temporary readable queries
* Recursive → hierarchies
* Advanced aggregation → powerful reporting
