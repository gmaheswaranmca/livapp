## 8. JOINS (Very Important 🔥)

---

## 🔹 What are JOINS?

**JOINs** are used to **combine data from multiple tables** based on a related column.

👉 In simple terms:

> JOIN = “Connect tables using relationships”

---

## 🔹 Why JOINS are Important?

In real-world databases:

* Data is **normalized** (split into multiple tables)
* You must **combine tables to get meaningful data**

---

## 🔹 Example Tables

### 📌 `customers`

| id | name  |
| -- | ----- |
| 1  | Ravi  |
| 2  | Kumar |

---

### 📌 `orders`

| id | customer_id | amount |
| -- | ----------- | ------ |
| 1  | 1           | 1000   |
| 2  | 1           | 2000   |
| 3  | 2           | 1500   |

---

---

# 🔹 Types of JOINS

---

# 🔸 1. INNER JOIN (Most Used 🔥)

---

## 🔹 Definition

Returns **only matching rows** from both tables

---

### 📌 Syntax

```sql id="35q9q6"
SELECT columns
FROM table1
INNER JOIN table2
ON table1.col = table2.col;
```

---

### 📌 Example

```sql id="6gy3m6"
SELECT customers.name, orders.amount
FROM customers
INNER JOIN orders
ON customers.id = orders.customer_id;
```

---

### ✅ Output

| name  | amount |
| ----- | ------ |
| Ravi  | 1000   |
| Ravi  | 2000   |
| Kumar | 1500   |

---

👉 Only matching data

---

# 🔸 2. LEFT JOIN

---

## 🔹 Definition

Returns:

* All rows from **left table**
* Matching rows from right
* Non-matching → NULL

---

### 📌 Syntax

```sql id="5gpbqm"
SELECT columns
FROM table1
LEFT JOIN table2
ON table1.col = table2.col;
```

---

### 📌 Example

```sql id="nldltu"
SELECT customers.name, orders.amount
FROM customers
LEFT JOIN orders
ON customers.id = orders.customer_id;
```

---

👉 Even customers without orders appear

---

# 🔸 3. RIGHT JOIN

---

## 🔹 Definition

Returns:

* All rows from **right table**
* Matching from left

---

### 📌 Example

```sql id="g9xph9"
SELECT customers.name, orders.amount
FROM customers
RIGHT JOIN orders
ON customers.id = orders.customer_id;
```

---

👉 All orders will appear

---

# 🔸 4. FULL JOIN (Not directly in MySQL ⚠️)

---

## 🔹 Workaround

```sql id="hy5e1h"
SELECT * FROM A
LEFT JOIN B ON A.id = B.id

UNION

SELECT * FROM A
RIGHT JOIN B ON A.id = B.id;
```

---

---

# 🔸 5. CROSS JOIN

---

## 🔹 Definition

Returns **all combinations (Cartesian product)**

---

### 📌 Example

```sql id="h9r9e8"
SELECT customers.name, orders.amount
FROM customers
CROSS JOIN orders;
```

---

👉 Every customer with every order

---

# 🔸 6. SELF JOIN

---

## 🔹 Definition

Join a table with itself

---

### 📌 Example

```sql id="6z0j4s"
SELECT A.name AS employee, B.name AS manager
FROM employees A
JOIN employees B
ON A.manager_id = B.id;
```

---

👉 Used for:

* Hierarchies
* Manager relationships

---

# 🔹 Visual Understanding (Important)

---

## INNER JOIN

```
Common area only
```

## LEFT JOIN

```
All left + matched right
```

## RIGHT JOIN

```
All right + matched left
```

---

# 🔹 Real-World Use Cases

---

### ✅ 1. E-commerce

```sql id="e1ysiw"
SELECT users.name, orders.amount
FROM users
JOIN orders ON users.id = orders.user_id;
```

---

### ✅ 2. Healthcare 🔥

```sql id="yr2y0r"
SELECT patients.name, medication.dosage
FROM patients
JOIN medication
ON patients.id = medication.patient_id;
```

---

### ✅ 3. Banking

```sql id="1eyw2p"
SELECT customers.name, accounts.balance
FROM customers
JOIN accounts
ON customers.id = accounts.customer_id;
```

---

### ✅ 4. Admin Dashboard

```sql id="6c7cny"
SELECT users.name, roles.role_name
FROM users
JOIN roles ON users.role_id = roles.id;
```

---

# 🔹 JOIN with WHERE

```sql id="6lpw7e"
SELECT customers.name, orders.amount
FROM customers
JOIN orders ON customers.id = orders.customer_id
WHERE orders.amount > 1000;
```

---

# 🔹 JOIN with GROUP BY

```sql id="q6iwrl"
SELECT customers.name, SUM(orders.amount)
FROM customers
JOIN orders ON customers.id = orders.customer_id
GROUP BY customers.name;
```

---

# 🔹 Common Mistakes 🚨

---

### ❌ Missing ON condition

```sql id="d5q6bx"
SELECT * FROM A JOIN B;
```

👉 Cartesian product (huge data)

---

### ❌ Wrong join column

👉 Leads to incorrect results

---

### ❌ Using SELECT *

👉 Performance issue

---

# 🔹 Performance Tips ⚡

---

✔ Always index join columns
✔ Use INNER JOIN when possible (faster)
✔ Avoid unnecessary joins
✔ Select only required columns
✔ Use aliases (`A`, `B`) for readability

---

# 🔹 Mini Practice Task

```sql id="5iv4oy"
CREATE TABLE customers (
    id INT,
    name VARCHAR(50)
);

CREATE TABLE orders (
    id INT,
    customer_id INT,
    amount INT
);

INSERT INTO customers VALUES
(1, 'Ravi'),
(2, 'Kumar');

INSERT INTO orders VALUES
(1, 1, 1000),
(2, 1, 2000),
(3, 2, 1500);

-- Try

-- INNER JOIN
SELECT c.name, o.amount
FROM customers c
JOIN orders o ON c.id = o.customer_id;

-- LEFT JOIN
SELECT c.name, o.amount
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id;
```

---

## 🔚 Summary

* JOIN = combine tables
* Types:

  * INNER → matching
  * LEFT → all left
  * RIGHT → all right
  * CROSS → all combinations
  * SELF → same table
* Most used in:

  * APIs
  * Dashboards
  * Reports
