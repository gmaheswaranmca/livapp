## 16. Database Design 🔥 (Most Important for Real-World Systems)

---

## 🔹 What is Database Design?

Database design is the process of **structuring data efficiently** so that it is:

* Organized
* Scalable
* Consistent
* Performant

👉 In simple terms:

> Database Design = “How you plan your data structure before coding”

---

## 🔹 Why It Matters?

Bad design →
❌ Duplicate data
❌ Slow queries
❌ Hard to scale

Good design →
✅ Clean data
✅ Fast queries
✅ Easy maintenance

---

# 🔸 1. Normalization 🔥

---

## 🔹 What is Normalization?

Process of **removing redundancy (duplicate data)** and improving data integrity.

---

## 🔹 Types of Normal Forms

| Form | Rule                      |
| ---- | ------------------------- |
| 1NF  | Atomic values (no arrays) |
| 2NF  | No partial dependency     |
| 3NF  | No transitive dependency  |

---

## 🔹 Example (Bad Design ❌)

```sql
students (
    id,
    name,
    subjects (Math, Science, English)
)
```

👉 Multiple values in one column

---

## 🔹 Fixed (1NF ✅)

```sql
students (id, name)
subjects (student_id, subject_name)
```

---

---

## 🔹 Example (2NF & 3NF)

---

### ❌ Bad

```sql
orders (
    order_id,
    customer_name,
    customer_address
)
```

👉 Duplicate customer data

---

### ✅ Good

```sql
customers (id, name, address)
orders (id, customer_id)
```

---

---

# 🔸 2. Denormalization 🔥

---

## 🔹 What is Denormalization?

Adding redundancy **intentionally** to improve performance.

---

## 🔹 Example

```sql
orders (
    id,
    customer_id,
    customer_name  -- duplicated
)
```

---

👉 Faster reads, but:

* Risk of inconsistency

---

## 🔹 When to Use?

✔ Reporting systems
✔ Analytics
✔ Read-heavy systems

---

---

# 🔸 3. ER Diagram (Entity Relationship) 🔥

---

## 🔹 What is ER Diagram?

Visual representation of:

* Entities (tables)
* Attributes (columns)
* Relationships

---

## 🔹 Basic Components

| Component    | Meaning    |
| ------------ | ---------- |
| Entity       | Table      |
| Attribute    | Column     |
| Relationship | Connection |

---

## 🔹 Example (E-commerce)

* User → Order
* Order → Product

---

---

# 🔸 4. Relationships 🔥

---

## 🔹 Types

| Type         | Example            |
| ------------ | ------------------ |
| One-to-One   | User ↔ Profile     |
| One-to-Many  | User → Orders      |
| Many-to-Many | Students ↔ Courses |

---

---

## 🔹 One-to-Many Example

```sql
users (id, name)
orders (id, user_id)
```

---

---

## 🔹 Many-to-Many Example

```sql
students (id, name)
courses (id, name)
student_courses (student_id, course_id)
```

---

👉 Junction table

---

---

# 🔸 5. Schema Design Best Practices 🔥

---

## 🔹 Naming Conventions

✔ Use lowercase
✔ Use snake_case
✔ Use meaningful names

```sql
user_id, created_at, order_amount
```

---

---

## 🔹 Primary Keys

✔ Always use primary key

```sql
id INT AUTO_INCREMENT PRIMARY KEY
```

---

---

## 🔹 Foreign Keys

✔ Maintain relationships

```sql
FOREIGN KEY (user_id) REFERENCES users(id)
```

---

---

## 🔹 Timestamps

```sql
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at TIMESTAMP
```

---

---

## 🔹 Avoid Common Mistakes

---

### ❌ Storing multiple values in one column

```sql
skills = 'Java,Python'
```

---

### ❌ Too many NULLs

👉 Poor design

---

### ❌ No indexing

👉 Slow queries

---

---

# 🔸 6. Real-World Schema Examples 🔥

---

## ✅ 1. E-commerce System

```sql
users (id, name, email)
products (id, name, price)
orders (id, user_id, total)
order_items (order_id, product_id, quantity)
```

---

---

## ✅ 2. Banking System

```sql
customers (id, name)
accounts (id, customer_id, balance)
transactions (id, account_id, amount)
```

---

---

## ✅ 3. Healthcare System (Your Interest 🔥)

```sql
patients (id, name, age)
doctors (id, name, specialization)
appointments (id, patient_id, doctor_id, date)
medications (id, patient_id, dosage)
```

---

---

## 🔹 Design Process (Step-by-Step)

---

1. Identify entities
2. Define attributes
3. Define relationships
4. Normalize data
5. Add constraints
6. Add indexes

---

---

## 🔹 Normalization vs Denormalization

| Feature     | Normalization | Denormalization |
| ----------- | ------------- | --------------- |
| Redundancy  | Low           | High            |
| Performance | Slower reads  | Faster reads    |
| Consistency | High          | Medium          |

---

---

## 🔹 Common Mistakes 🚨

---

### ❌ Over-normalization

👉 Too many joins → slow

---

### ❌ Under-normalization

👉 Duplicate data

---

### ❌ No relationships

👉 Data inconsistency

---

---

## 🔹 Performance Tips ⚡

---

✔ Normalize first, then optimize
✔ Add indexes on foreign keys
✔ Avoid unnecessary joins
✔ Use denormalization for analytics

---

---

## 🔹 Mini Practice Task

```sql
-- Design a simple system

CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE courses (
    id INT PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE student_courses (
    student_id INT,
    course_id INT
);
```

---

## 🔚 Summary

* Database design = foundation of system
* Key concepts:

  * Normalization
  * Denormalization
  * ER modeling
  * Relationships
* Critical for:

  * Scalability
  * Performance
  * Maintainability
