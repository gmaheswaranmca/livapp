## 3. DML (Data Manipulation Language)

---

## 🔹 What is DML?

**DML (Data Manipulation Language)** is used to **work with the actual data inside tables**.

👉 While DDL creates structure,
👉 **DML = Insert, Update, Delete data**

---

## 🔹 Core DML Commands

| Command  | Purpose              |
| -------- | -------------------- |
| `INSERT` | Add new data         |
| `UPDATE` | Modify existing data |
| `DELETE` | Remove data          |

---

## 🔹 1. INSERT

Used to **add records into a table**

---

### 📌 Basic Syntax

```sql
INSERT INTO table_name (column1, column2)
VALUES (value1, value2);
```

---

### 📌 Example

```sql
INSERT INTO employees (id, name, salary)
VALUES (1, 'John', 50000);
```

---

### 📌 Insert Multiple Rows

```sql
INSERT INTO employees (id, name, salary)
VALUES 
(2, 'Alice', 60000),
(3, 'Bob', 55000);
```

---

### 📌 Insert Without Column Names

```sql
INSERT INTO employees
VALUES (4, 'David', 45000);
```

⚠️ Risky → depends on column order

---

### 📌 Healthcare Example

```sql
INSERT INTO patients (id, name, age, diagnosis)
VALUES (1, 'Ravi', 45, 'Diabetes');
```

---

## 🔹 2. UPDATE

Used to **modify existing records**

---

### 📌 Basic Syntax

```sql
UPDATE table_name
SET column = value
WHERE condition;
```

---

### 📌 Example

```sql
UPDATE employees
SET salary = 70000
WHERE id = 1;
```

---

### 📌 Update Multiple Columns

```sql
UPDATE employees
SET salary = 80000, name = 'John Updated'
WHERE id = 1;
```

---

### ⚠️ Important

```sql
UPDATE employees SET salary = 50000;
```

👉 This updates **ALL rows** (danger 🚨)

---

## 🔹 3. DELETE

Used to **remove records**

---

### 📌 Basic Syntax

```sql
DELETE FROM table_name
WHERE condition;
```

---

### 📌 Example

```sql
DELETE FROM employees
WHERE id = 2;
```

---

### ⚠️ Dangerous

```sql
DELETE FROM employees;
```

👉 Deletes ALL data (but structure remains)

---

## 🔹 DML vs TRUNCATE

| Feature  | DELETE | TRUNCATE |
| -------- | ------ | -------- |
| Type     | DML    | DDL      |
| WHERE    | Yes    | No       |
| Rollback | Yes    | No       |
| Speed    | Slower | Faster   |

---

## 🔹 Real-World Use Cases

---

### ✅ 1. User Registration (INSERT)

```sql
INSERT INTO users (name, email)
VALUES ('Mahesh', 'mahesh@gmail.com');
```

---

### ✅ 2. Update Profile (UPDATE)

```sql
UPDATE users
SET email = 'new@gmail.com'
WHERE id = 1;
```

---

### ✅ 3. Delete Account (DELETE)

```sql
DELETE FROM users
WHERE id = 1;
```

---

### ✅ 4. Healthcare System

```sql
-- Add patient
INSERT INTO patients VALUES (2, 'Kumar', 60, 'BP');

-- Update diagnosis
UPDATE patients SET diagnosis = 'Hypertension' WHERE id = 2;

-- Remove record
DELETE FROM patients WHERE id = 2;
```

---

## 🔹 Important Concepts

---

### 🔸 WHERE Clause (Critical 🔥)

Without `WHERE`:

* UPDATE → affects all rows
* DELETE → removes all data

---

### 🔸 Transactions (Preview)

DML operations can be controlled:

```sql
START TRANSACTION;

UPDATE employees SET salary = 90000 WHERE id = 1;

ROLLBACK; -- undo
```

👉 (Detailed in Topic 14)

---

### 🔸 Auto Increment Example

```sql
INSERT INTO employees (name, salary)
VALUES ('Sam', 40000);
```

👉 ID automatically generated

---

## 🔹 Common Mistakes 🚨

---

### ❌ Forgetting WHERE

```sql
UPDATE users SET role = 'admin';
```

👉 Everyone becomes admin 😱

---

### ❌ Inserting wrong data types

```sql
INSERT INTO employees VALUES ('abc', 'John', 'salary');
```

---

### ❌ Duplicate primary key

```sql
INSERT INTO employees (id, name) VALUES (1, 'Test');
```

👉 Error if ID already exists

---

## 🔹 Pro Tips (Production Level)

---

✔ Always test queries with SELECT first
✔ Use transactions for safety
✔ Avoid direct DELETE → use soft delete (`is_active`)
✔ Log critical changes

---

## 🔹 Mini Practice Task

```sql
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    marks INT
);

-- Insert
INSERT INTO students (name, marks)
VALUES ('A', 80), ('B', 90);

-- Update
UPDATE students SET marks = 85 WHERE name = 'A';

-- Delete
DELETE FROM students WHERE name = 'B';
```

---

## 🔚 Summary

* DML = Data operations
* Core:

  * `INSERT` → Add data
  * `UPDATE` → Modify data
  * `DELETE` → Remove data
* Most used in:

  * Backend APIs
  * Applications (MERN, etc.)
  * Real-world systems

