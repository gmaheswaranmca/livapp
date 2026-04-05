## 1. MySQL CLI – Connecting to MySQL Server & Basics

---

## 🔹 What is MySQL CLI?

The **MySQL Command Line Interface (CLI)** is a terminal-based tool to interact directly with the MySQL server.

* No GUI (like phpMyAdmin / MySQL Workbench)
* Fast, lightweight, production-friendly
* Used by developers, DBAs, DevOps

---

## 🔹 Connecting to MySQL Server

### ✅ Basic Command

```bash
mysql -u root -p
```

* `-u` → username
* `-p` → prompts for password

---

### ✅ Connect to Remote Server

```bash
mysql -h 192.168.1.10 -u admin -p
```

* `-h` → host (IP or domain)

---

### ✅ Connect to Specific Database

```bash
mysql -u root -p my_database
```

---

### ✅ Using Docker (your use case 🔥)

If MySQL runs inside Docker:

```bash
docker exec -it mysql_container mysql -u root -p
```

---

## 🔹 After Login – What You See

```sql
mysql>
```

You are now inside MySQL shell.

---

## 🔹 Basic Commands to Work with Databases

---

### 📌 1. Show all databases

```sql
SHOW DATABASES;
```

---

### 📌 2. Create a database

```sql
CREATE DATABASE company_db;
```

---

### 📌 3. Use a database

```sql
USE company_db;
```

👉 This sets the current working database.

---

### 📌 4. Check current database

```sql
SELECT DATABASE();
```

---

### 📌 5. Delete a database

```sql
DROP DATABASE company_db;
```

⚠️ Dangerous → permanently deletes everything

---

## 🔹 Working with Tables (Basic)

---

### 📌 Show tables

```sql
SHOW TABLES;
```

---

### 📌 Describe table structure

```sql
DESCRIBE employees;
```

or

```sql
DESC employees;
```

---

## 🔹 Example Flow (Real Scenario)

Let’s simulate a company system:

```sql
-- Step 1: Create DB
CREATE DATABASE company;

-- Step 2: Use it
USE company;

-- Step 3: Create table
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    salary DECIMAL(10,2)
);

-- Step 4: View tables
SHOW TABLES;

-- Step 5: Describe
DESC employees;
```

---

## 🔹 CLI Productivity Commands (Important 💡)

---

### 📌 Clear screen

```sql
\! clear
```

---

### 📌 Exit MySQL

```sql
exit;
```

or

```sql
\q
```

---

### 📌 Run SQL file

```bash
mysql -u root -p company < script.sql
```

---

### 📌 Source file inside CLI

```sql
SOURCE script.sql;
```

---

## 🔹 Real-World Use Cases

---

### ✅ 1. DevOps / Docker Environments

* No GUI available
* CLI is fastest way to debug DB issues

---

### ✅ 2. Production Debugging

* Check live data
* Run quick fixes
* Analyze issues

---

### ✅ 3. Automation Scripts

* Backup scripts
* Migration scripts
* Cron jobs

---

### ✅ 4. Backend Developers

* Quick testing of queries before writing code
* Validate ORM queries (Prisma / Sequelize)

---

## 🔹 Common Mistakes (Important 🚨)

---

### ❌ Forgetting `USE database`

→ Leads to:

```
ERROR 1046 (3D000): No database selected
```

---

### ❌ Missing semicolon `;`

→ Query won’t execute

---

### ❌ Using wrong user privileges

→ Access denied errors

---

## 🔹 Pro Tips (Production Level)

---

✔ Always create separate users (don’t use root in apps)
✔ Use `.sql` files for version control
✔ Combine CLI + Docker for full control
✔ Learn shortcuts → improves speed drastically

---

## 🔹 Mini Practice Task

Try this in your system:

```sql
CREATE DATABASE school;
USE school;

CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    marks INT
);

SHOW TABLES;
DESC students;
```

---

## 🔚 Summary

* MySQL CLI = direct, powerful DB interaction tool
* You can:

  * Connect to DB
  * Create/manage databases
  * Inspect tables
* Essential for:

  * Backend dev
  * DevOps
  * Production debugging
