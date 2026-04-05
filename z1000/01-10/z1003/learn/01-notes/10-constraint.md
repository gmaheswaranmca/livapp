## 10. Constraints 🔥 (Data Integrity Foundation)

---

## 🔹 What are Constraints?

**Constraints** are rules applied to table columns to **ensure data accuracy, validity, and consistency**.

👉 In simple terms:

> Constraints = “Rules that protect your data”

---

## 🔹 Why Constraints are Important?

* Prevent invalid data
* Maintain relationships between tables
* Ensure business rules are enforced
* Critical for **production systems**

---

## 🔹 Types of Constraints

| Constraint  | Purpose                |
| ----------- | ---------------------- |
| PRIMARY KEY | Unique + not null      |
| FOREIGN KEY | Maintain relationships |
| UNIQUE      | No duplicate values    |
| NOT NULL    | Cannot be empty        |
| CHECK       | Custom condition       |
| DEFAULT     | Default value          |

---

# 🔸 1. PRIMARY KEY 🔥

---

## 🔹 Definition

* Uniquely identifies each row
* Cannot be NULL
* Only one per table

---

### 📌 Syntax

```sql id="m5h7bb"
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(50)
);
```

---

### ✅ Example

```sql id="fl95nf"
INSERT INTO users VALUES (1, 'A'); -- ✅
INSERT INTO users VALUES (1, 'B'); -- ❌ duplicate
```

---

---

# 🔸 2. FOREIGN KEY 🔥

---

## 🔹 Definition

* Links one table to another
* Maintains **referential integrity**

---

### 📌 Syntax

```sql id="wr1yfb"
CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

### ✅ Example

```sql id="q6nt85"
INSERT INTO orders VALUES (1, 10);
```

👉 ❌ Error if user_id doesn’t exist in `users`

---

---

# 🔸 3. UNIQUE

---

## 🔹 Definition

* Ensures values are unique
* Allows NULL (unlike PRIMARY KEY)

---

### 📌 Syntax

```sql id="4tpjy7"
CREATE TABLE users (
    email VARCHAR(100) UNIQUE
);
```

---

### ✅ Example

```sql id="d26b3u"
INSERT INTO users VALUES ('a@gmail.com'); -- ✅
INSERT INTO users VALUES ('a@gmail.com'); -- ❌ duplicate
```

---

---

# 🔸 4. NOT NULL

---

## 🔹 Definition

* Column must have a value

---

### 📌 Syntax

```sql id="5fsx4l"
CREATE TABLE users (
    name VARCHAR(50) NOT NULL
);
```

---

### ❌ Example

```sql id="u9yexv"
INSERT INTO users VALUES (NULL); -- ❌
```

---

---

# 🔸 5. CHECK

---

## 🔹 Definition

* Ensures condition is satisfied

---

### 📌 Syntax

```sql id="7u2rgg"
CREATE TABLE employees (
    age INT CHECK (age >= 18)
);
```

---

### ❌ Example

```sql id="gljkpk"
INSERT INTO employees VALUES (15); -- ❌
```

---

---

# 🔸 6. DEFAULT

---

## 🔹 Definition

* Assigns default value if none provided

---

### 📌 Syntax

```sql id="u7h7tr"
CREATE TABLE users (
    status VARCHAR(20) DEFAULT 'active'
);
```

---

### ✅ Example

```sql id="j9x5u8"
INSERT INTO users (name) VALUES ('A');
```

👉 status = 'active'

---

---

# 🔹 Multiple Constraints Together

---

```sql id="9vfj3i"
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    age INT CHECK (age >= 18),
    status VARCHAR(20) DEFAULT 'active'
);
```

---

---

# 🔹 ALTER TABLE with Constraints

---

### 📌 Add constraint

```sql id="8z2l3k"
ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE(email);
```

---

### 📌 Add foreign key

```sql id="nqqx9y"
ALTER TABLE orders
ADD FOREIGN KEY (user_id) REFERENCES users(id);
```

---

### 📌 Drop constraint

```sql id="whm8l9"
ALTER TABLE users DROP INDEX unique_email;
```

---

---

# 🔹 Real-World Use Cases

---

### ✅ 1. User System

```sql id="k91g5y"
email VARCHAR(100) UNIQUE NOT NULL
```

👉 No duplicate accounts

---

### ✅ 2. E-commerce

```sql id="9npz7g"
FOREIGN KEY (user_id) REFERENCES users(id)
```

👉 Order must belong to valid user

---

### ✅ 3. Healthcare 🔥

```sql id="3o5gti"
age INT CHECK (age > 0)
```

👉 Valid patient data

---

### ✅ 4. Banking

```sql id="rbf9nl"
balance DECIMAL(10,2) CHECK (balance >= 0)
```

👉 No negative balance

---

---

# 🔹 ON DELETE / ON UPDATE (Foreign Key Behavior) 🔥

---

### 📌 Options

| Option   | Meaning           |
| -------- | ----------------- |
| CASCADE  | Delete child rows |
| SET NULL | Set FK to NULL    |
| RESTRICT | Prevent delete    |

---

### 📌 Example

```sql id="2b8a1o"
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE;
```

---

👉 If user deleted → orders also deleted

---

---

# 🔹 Common Mistakes 🚨

---

### ❌ Missing constraints

👉 Leads to:

* Duplicate data
* Invalid entries

---

### ❌ Wrong foreign key mapping

👉 Causes data inconsistency

---

### ❌ Overusing constraints

👉 Too many checks → performance impact

---

---

# 🔹 Performance Considerations ⚡

---

✔ Primary key → automatically indexed
✔ Foreign key → should be indexed
✔ Use constraints wisely (balance performance)
✔ Avoid heavy CHECK logic

---

---

# 🔹 Mini Practice Task

```sql id="p2s6hy"
CREATE TABLE users (
    id INT PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT,
    amount INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Try inserting valid and invalid data
```

---

## 🔚 Summary

* Constraints = data protection rules
* Key types:

  * PRIMARY KEY
  * FOREIGN KEY
  * UNIQUE
  * NOT NULL
  * CHECK
  * DEFAULT
* Used for:

  * Data integrity
  * Relationships
  * Business rules
