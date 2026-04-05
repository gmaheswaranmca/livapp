## 2. DDL (Data Definition Language)

---

## 🔹 What is DDL?

**DDL (Data Definition Language)** is used to **define and manage database structure**.

👉 It deals with:

* Databases
* Tables
* Columns
* Constraints

👉 In simple terms:

> DDL = “Structure creation & modification”

---

## 🔹 Core DDL Commands

| Command    | Purpose                |
| ---------- | ---------------------- |
| `CREATE`   | Create database/table  |
| `ALTER`    | Modify structure       |
| `DROP`     | Delete object          |
| `TRUNCATE` | Delete all rows (fast) |
| `RENAME`   | Rename table           |

---

## 🔹 1. CREATE

---

### 📌 Create Database

```sql
CREATE DATABASE company_db;
```

---

### 📌 Create Table

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    salary DECIMAL(10,2),
    created_at TIMESTAMP
);
```

---

### 💡 Data Types (Important)

| Type         | Use         |
| ------------ | ----------- |
| `INT`        | Numbers     |
| `VARCHAR(n)` | Strings     |
| `DECIMAL`    | Money       |
| `DATE`       | Date        |
| `TIMESTAMP`  | Date + Time |

---

### ✅ Real Example

```sql
CREATE TABLE patients (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    age INT,
    diagnosis VARCHAR(255)
);
```

👉 (Matches your healthcare interest 🔥)

---

## 🔹 2. ALTER

Used to **modify existing table structure**

---

### 📌 Add column

```sql
ALTER TABLE employees ADD email VARCHAR(100);
```

---

### 📌 Modify column

```sql
ALTER TABLE employees MODIFY salary DECIMAL(12,2);
```

---

### 📌 Drop column

```sql
ALTER TABLE employees DROP COLUMN email;
```

---

### 📌 Rename column

```sql
ALTER TABLE employees RENAME COLUMN name TO full_name;
```

---

## 🔹 3. DROP

Deletes entire object (⚠️ irreversible)

---

### 📌 Drop table

```sql
DROP TABLE employees;
```

---

### 📌 Drop database

```sql
DROP DATABASE company_db;
```

---

## 🔹 4. TRUNCATE

Deletes **all rows** but keeps structure

```sql
TRUNCATE TABLE employees;
```

---

### 🔥 Difference: DELETE vs TRUNCATE

| Feature              | DELETE | TRUNCATE |
| -------------------- | ------ | -------- |
| Speed                | Slow   | Fast     |
| Rollback             | Yes    | No       |
| WHERE                | Yes    | No       |
| Reset AUTO_INCREMENT | No     | Yes      |

---

## 🔹 5. RENAME

```sql
RENAME TABLE employees TO staff;
```

---

## 🔹 Real-World Use Cases

---

### ✅ 1. Initial Project Setup

```sql
CREATE DATABASE ecommerce;
```

Create tables:

* users
* products
* orders

---

### ✅ 2. Feature Update

New requirement → add column

```sql
ALTER TABLE users ADD phone VARCHAR(15);
```

---

### ✅ 3. Cleanup Old Data

```sql
TRUNCATE TABLE logs;
```

---

### ✅ 4. Schema Refactoring

```sql
ALTER TABLE orders MODIFY amount DECIMAL(12,2);
```

---

### ✅ 5. Healthcare Example

```sql
CREATE TABLE medication (
    id INT PRIMARY KEY,
    patient_name VARCHAR(100),
    dosage INT,
    doctor VARCHAR(100)
);
```

---

## 🔹 Important Concepts

---

### 🔸 Schema = Blueprint

DDL defines:

* What data looks like
* How tables are structured

---

### 🔸 Auto Increment

```sql
id INT AUTO_INCREMENT PRIMARY KEY
```

---

### 🔸 Default Values

```sql
status VARCHAR(20) DEFAULT 'active'
```

---

## 🔹 Common Mistakes 🚨

---

### ❌ Dropping table accidentally

```sql
DROP TABLE users;
```

👉 Always double-check!

---

### ❌ Wrong data types

```sql
salary INT  -- ❌ bad for money
```

👉 Use:

```sql
DECIMAL(10,2)
```

---

### ❌ Too many ALTER operations

👉 Instead:

* Plan schema properly
* Reduce frequent changes

---

## 🔹 Pro Tips (Production Level)

---

✔ Use migrations (Prisma / Sequelize / Flyway)
✔ Never modify production DB directly
✔ Backup before `ALTER` or `DROP`
✔ Use naming conventions:

* `user_id`
* `created_at`
* `updated_at`

---

## 🔹 Mini Practice Task

```sql
CREATE DATABASE hospital;
USE hospital;

CREATE TABLE doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    specialization VARCHAR(100)
);

ALTER TABLE doctors ADD experience INT;

DESC doctors;
```

---

## 🔚 Summary

* DDL = Structure control
* Key commands:

  * `CREATE`
  * `ALTER`
  * `DROP`
  * `TRUNCATE`
* Used in:

  * Schema design
  * System evolution
  * Production database management
