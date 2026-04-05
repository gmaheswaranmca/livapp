## 22. Real-World Use Cases 🔥 (Complete Schema + Queries + Concepts)

This is where everything comes together — **design + joins + indexing + performance + real business logic**

---

# 🔹 1. E-Commerce System 🛒

---

## 🔹 Core Tables

```sql
users (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE
);

products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10,2),
    stock INT
);

orders (
    id INT PRIMARY KEY,
    user_id INT,
    total DECIMAL(10,2),
    created_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

---

## 🔹 Key Concepts Used

* Relationships (1:N, M:N)
* Joins
* Transactions
* Indexing

---

## 🔹 Example Queries

---

### 📌 Get User Orders

```sql
SELECT u.name, o.id, o.total
FROM users u
JOIN orders o ON u.id = o.user_id;
```

---

### 📌 Order Details

```sql
SELECT o.id, p.name, oi.quantity
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id;
```

---

### 📌 Top Selling Products

```sql
SELECT p.name, SUM(oi.quantity) AS total_sold
FROM order_items oi
JOIN products p ON oi.product_id = p.id
GROUP BY p.name
ORDER BY total_sold DESC;
```

---

## 🔹 Real Features

* Cart system
* Order placement (Transaction 🔥)
* Inventory update

---

---

# 🔹 2. Banking System 💰

---

## 🔹 Core Tables

```sql
customers (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);

accounts (
    id INT PRIMARY KEY,
    customer_id INT,
    balance DECIMAL(10,2),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

transactions (
    id INT PRIMARY KEY,
    account_id INT,
    amount DECIMAL(10,2),
    type VARCHAR(10),
    created_at TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id)
);
```

---

## 🔹 Key Concepts Used

* Transactions (ACID 🔥)
* Constraints
* Security

---

## 🔹 Example Queries

---

### 📌 Account Balance

```sql
SELECT balance FROM accounts WHERE id = 1;
```

---

### 📌 Transaction History

```sql
SELECT * FROM transactions
WHERE account_id = 1
ORDER BY created_at DESC;
```

---

### 📌 Money Transfer (Critical 🔥)

```sql
START TRANSACTION;

UPDATE accounts SET balance = balance - 1000 WHERE id = 1;
UPDATE accounts SET balance = balance + 1000 WHERE id = 2;

COMMIT;
```

---

## 🔹 Real Features

* Fund transfer
* Balance check
* Fraud detection

---

---

# 🔹 3. Healthcare System 🏥 (Your Interest 🔥)

---

## 🔹 Core Tables

```sql
patients (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    age INT
);

doctors (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    specialization VARCHAR(100)
);

appointments (
    id INT PRIMARY KEY,
    patient_id INT,
    doctor_id INT,
    appointment_date DATE,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

medications (
    id INT PRIMARY KEY,
    patient_id INT,
    dosage INT,
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);
```

---

## 🔹 Key Concepts Used

* Joins
* Constraints
* Indexing
* Security

---

## 🔹 Example Queries

---

### 📌 Patient Appointments

```sql
SELECT p.name, d.name, a.appointment_date
FROM appointments a
JOIN patients p ON a.patient_id = p.id
JOIN doctors d ON a.doctor_id = d.id;
```

---

### 📌 Doctor-wise Patient Count

```sql
SELECT d.name, COUNT(*) AS total_patients
FROM appointments a
JOIN doctors d ON a.doctor_id = d.id
GROUP BY d.name;
```

---

### 📌 Patients with High Dosage

```sql
SELECT p.name, m.dosage
FROM medications m
JOIN patients p ON m.patient_id = p.id
WHERE m.dosage > 500;
```

---

## 🔹 Real Features

* Appointment booking
* Prescription tracking
* Medical reports

---

---

# 🔹 4. Analytics System 📊

---

## 🔹 Example Tables

```sql
sales (
    id INT,
    date DATE,
    amount DECIMAL(10,2)
);
```

---

## 🔹 Example Queries

---

### 📌 Daily Sales

```sql
SELECT date, SUM(amount)
FROM sales
GROUP BY date;
```

---

---

### 📌 Running Total 🔥

```sql
SELECT date, amount,
       SUM(amount) OVER (ORDER BY date) AS running_total
FROM sales;
```

---

---

### 📌 Top Days

```sql
SELECT date, SUM(amount) AS total
FROM sales
GROUP BY date
ORDER BY total DESC
LIMIT 5;
```

---

---

# 🔹 How Everything Connects 🔥

---

| Concept     | Used In            |
| ----------- | ------------------ |
| DDL         | Table creation     |
| DML         | Insert/update data |
| DQL         | Fetch data         |
| JOINS       | Combine tables     |
| GROUP BY    | Reports            |
| INDEX       | Performance        |
| TRANSACTION | Data safety        |
| SECURITY    | Access control     |
| SCALING     | Production systems |

---

---

# 🔹 Full Real-World Flow (Example)

---

## 🛒 Order Placement Flow

1. Insert order
2. Insert order items
3. Update product stock
4. Commit transaction

```sql
START TRANSACTION;

INSERT INTO orders VALUES (...);
INSERT INTO order_items VALUES (...);
UPDATE products SET stock = stock - 1 WHERE id = 10;

COMMIT;
```

---

---

# 🔹 Common Mistakes 🚨

---

### ❌ No normalization

👉 Duplicate data

---

### ❌ No transactions

👉 Data inconsistency

---

### ❌ No indexing

👉 Slow queries

---

### ❌ Poor relationships

👉 Data mismatch

---

---

# 🔹 Final Architecture Thinking 🔥

---

👉 Real system:

* Backend (Node.js)
* Database (MySQL)
* Cache (Redis)
* Scaling (Replication)

---

---

# 🔚 Final Summary

---

You now covered:

* Basics → Advanced SQL
* Performance → Security
* Design → Architecture
* Real-world systems

---

## 🎯 What You Can Do Now

* Build real backend systems
* Design scalable databases
* Optimize production queries
* Crack interviews 🔥
