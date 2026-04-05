## 5. Filtering & Conditions (WHERE Deep Dive) 🔥

---

## 🔹 What is Filtering?

Filtering is used to **retrieve only the required rows** from a table.

👉 Done using:

```sql
WHERE
```

👉 In simple terms:

> WHERE = “Apply conditions to data”

---

## 🔹 Basic Syntax

```sql
SELECT column1, column2
FROM table_name
WHERE condition;
```

---

## 🔹 Comparison Operators

| Operator     | Meaning          |
| ------------ | ---------------- |
| `=`          | Equal            |
| `!=` or `<>` | Not equal        |
| `>`          | Greater than     |
| `<`          | Less than        |
| `>=`         | Greater or equal |
| `<=`         | Less or equal    |

---

### 📌 Example

```sql
SELECT * 
FROM employees
WHERE salary > 50000;
```

---

## 🔹 Logical Operators

| Operator | Use                  |
| -------- | -------------------- |
| `AND`    | Both conditions true |
| `OR`     | Any condition true   |
| `NOT`    | Reverse condition    |

---

### 📌 Example

```sql
SELECT *
FROM employees
WHERE salary > 50000 AND department = 'IT';
```

---

```sql
SELECT *
FROM employees
WHERE department = 'HR' OR department = 'IT';
```

---

## 🔹 BETWEEN (Range Filter)

```sql
SELECT *
FROM employees
WHERE salary BETWEEN 40000 AND 80000;
```

👉 Inclusive (includes both 40000 & 80000)

---

## 🔹 IN (Multiple Values)

```sql
SELECT *
FROM employees
WHERE department IN ('HR', 'IT', 'Finance');
```

👉 Cleaner than multiple OR conditions

---

## 🔹 LIKE (Pattern Matching) 🔥

---

### 📌 Wildcards

| Symbol | Meaning                  |
| ------ | ------------------------ |
| `%`    | Any number of characters |
| `_`    | Single character         |

---

### 📌 Examples

```sql
SELECT *
FROM employees
WHERE name LIKE 'J%';
```

👉 Starts with J

---

```sql
WHERE name LIKE '%n';
```

👉 Ends with n

---

```sql
WHERE name LIKE '%oh%';
```

👉 Contains “oh”

---

```sql
WHERE name LIKE '_a%';
```

👉 Second letter is ‘a’

---

## 🔹 IS NULL / IS NOT NULL

---

### 📌 Example

```sql
SELECT *
FROM employees
WHERE email IS NULL;
```

---

```sql
SELECT *
FROM employees
WHERE email IS NOT NULL;
```

---

👉 Important:
❌ `= NULL` won’t work

---

## 🔹 Combining Conditions

---

```sql
SELECT *
FROM employees
WHERE (salary > 50000 AND department = 'IT')
   OR age > 40;
```

👉 Use brackets for clarity

---

## 🔹 NOT Operator

```sql
SELECT *
FROM employees
WHERE NOT department = 'HR';
```

---

## 🔹 Real-World Use Cases

---

### ✅ 1. Login System

```sql
SELECT *
FROM users
WHERE email = 'test@gmail.com' AND password = '1234';
```

---

### ✅ 2. Search Feature

```sql
SELECT *
FROM products
WHERE name LIKE '%laptop%';
```

---

### ✅ 3. Filters in UI (E-commerce)

```sql
SELECT *
FROM products
WHERE price BETWEEN 20000 AND 50000
AND category IN ('Electronics', 'Mobiles');
```

---

### ✅ 4. Healthcare Example

```sql
SELECT *
FROM patients
WHERE age > 60 AND diagnosis = 'Diabetes';
```

---

### ✅ 5. Reports

```sql
SELECT *
FROM employees
WHERE department != 'HR';
```

---

## 🔹 Performance Insight (Important 🔥)

---

### ❌ Bad

```sql
SELECT * FROM employees WHERE name LIKE '%John%';
```

👉 Full table scan (slow)

---

### ✅ Better

```sql
SELECT * FROM employees WHERE name LIKE 'John%';
```

👉 Can use index

---

## 🔹 Common Mistakes 🚨

---

### ❌ Using `= NULL`

```sql
WHERE email = NULL;
```

👉 Wrong

---

### ❌ Forgetting brackets

```sql
WHERE salary > 50000 AND department = 'IT' OR age > 40;
```

👉 Logic confusion

---

### ❌ Case sensitivity confusion

👉 Depends on collation

---

## 🔹 Pro Tips (Production Level)

---

✔ Always filter large tables
✔ Use indexed columns in WHERE
✔ Avoid leading `%` in LIKE
✔ Use IN instead of multiple OR
✔ Combine conditions carefully

---

## 🔹 Mini Practice Task

```sql
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    marks INT,
    department VARCHAR(50)
);

INSERT INTO students (name, marks, department)
VALUES 
('Arun', 85, 'CS'),
('Bala', 70, 'IT'),
('Charan', 90, 'CS'),
('Deepak', 60, 'ECE');

-- Try queries
SELECT * FROM students WHERE marks > 75;

SELECT * FROM students WHERE department IN ('CS', 'IT');

SELECT * FROM students WHERE name LIKE 'A%';

SELECT * FROM students WHERE marks BETWEEN 60 AND 80;
```

---

## 🔚 Summary

* Filtering = selecting specific rows
* Core: `WHERE`
* Important operators:

  * `=, >, <`
  * `AND, OR`
  * `IN, BETWEEN`
  * `LIKE`
  * `IS NULL`
* Critical for:

  * APIs
  * Search
  * Dashboards
