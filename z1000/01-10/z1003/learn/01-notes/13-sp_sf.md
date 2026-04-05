## 13. Stored Procedures & Functions 🔥 (DB-Level Business Logic)

---

## 🔹 What are Stored Procedures & Functions?

They are **pre-written SQL programs stored inside the database**.

👉 In simple terms:

> Stored Procedure = “Reusable SQL logic block”
> Function = “Reusable logic that returns a value”

---

## 🔹 Why Use Them?

* Reuse logic
* Improve performance
* Reduce application code
* Centralize business rules
* Enhance security (controlled access)

---

## 🔹 Stored Procedure vs Function

| Feature          | Stored Procedure | Function     |
| ---------------- | ---------------- | ------------ |
| Returns value    | Optional         | Mandatory    |
| Used in SELECT   | ❌ No             | ✅ Yes        |
| Multiple outputs | ✅ Yes            | ❌ No         |
| Purpose          | Operations       | Calculations |

---

# 🔸 1. Stored Procedures

---

## 🔹 Basic Syntax

```sql id="j3t5i7"
DELIMITER //

CREATE PROCEDURE procedure_name()
BEGIN
    SQL statements;
END //

DELIMITER ;
```

---

## 🔹 Example (Simple)

```sql id="3q4m8c"
DELIMITER //

CREATE PROCEDURE get_employees()
BEGIN
    SELECT * FROM employees;
END //

DELIMITER ;
```

---

### 📌 Call Procedure

```sql id="z0yrq2"
CALL get_employees();
```

---

---

## 🔹 Procedure with Parameters

---

### 📌 Syntax

```sql id="smb31o"
CREATE PROCEDURE proc_name(IN param datatype)
```

---

### 📌 Example

```sql id="2p9txp"
DELIMITER //

CREATE PROCEDURE get_employee_by_id(IN emp_id INT)
BEGIN
    SELECT * FROM employees WHERE id = emp_id;
END //

DELIMITER ;
```

---

```sql id="7sn2n1"
CALL get_employee_by_id(1);
```

---

---

## 🔹 Types of Parameters

| Type  | Meaning |
| ----- | ------- |
| IN    | Input   |
| OUT   | Output  |
| INOUT | Both    |

---

### 📌 OUT Example

```sql id="yxr7tg"
DELIMITER //

CREATE PROCEDURE get_total_employees(OUT total INT)
BEGIN
    SELECT COUNT(*) INTO total FROM employees;
END //

DELIMITER ;
```

---

```sql id="5k6zso"
CALL get_total_employees(@total);
SELECT @total;
```

---

---

## 🔹 Control Statements in Procedures

---

### 📌 IF

```sql id="w4c2ru"
IF salary > 50000 THEN
    SELECT 'High';
ELSE
    SELECT 'Low';
END IF;
```

---

### 📌 LOOP / WHILE

```sql id="d1wq35"
WHILE i <= 5 DO
    SET i = i + 1;
END WHILE;
```

---

---

# 🔸 2. Functions

---

## 🔹 Basic Syntax

```sql id="x6m2p9"
DELIMITER //

CREATE FUNCTION function_name(param datatype)
RETURNS datatype
DETERMINISTIC
BEGIN
    RETURN value;
END //

DELIMITER ;
```

---

## 🔹 Example

```sql id="x4dqk3"
DELIMITER //

CREATE FUNCTION get_bonus(salary INT)
RETURNS INT
DETERMINISTIC
BEGIN
    RETURN salary * 0.1;
END //

DELIMITER ;
```

---

### 📌 Use Function

```sql id="p7q7hk"
SELECT name, get_bonus(salary)
FROM employees;
```

---

---

## 🔹 Difference in Usage

---

### 📌 Procedure

```sql id="t2k9rz"
CALL get_employees();
```

---

### 📌 Function

```sql id="h0mds7"
SELECT get_bonus(50000);
```

---

---

## 🔹 Real-World Use Cases

---

### ✅ 1. Backend API Logic 🔥

```sql id="1z9eiy"
CALL get_employee_by_id(1);
```

👉 Used in Node.js backend

---

### ✅ 2. Salary Calculation

```sql id="hj4y3k"
SELECT name, get_bonus(salary)
FROM employees;
```

---

### ✅ 3. Healthcare Example 🔥

```sql id="z0y3n8"
CREATE FUNCTION calculate_dosage(weight INT)
RETURNS INT
BEGIN
    RETURN weight * 2;
END;
```

---

---

### ✅ 4. Reporting

```sql id="y9xvhl"
CALL get_total_employees(@total);
```

---

---

### ✅ 5. Validation Logic

```sql id="j8l5n2"
IF age < 18 THEN
    SIGNAL SQLSTATE '45000';
END IF;
```

---

---

## 🔹 Advantages

---

✔ Reusable logic
✔ Better performance (precompiled)
✔ Reduced network calls
✔ Security (restricted access)

---

---

## 🔹 Limitations

---

❌ Harder to debug
❌ Database dependency
❌ Not ideal for complex app logic

---

---

## 🔹 Common Mistakes 🚨

---

### ❌ Forgetting DELIMITER

👉 Causes syntax error

---

### ❌ Using function for data modification

👉 Functions should return values only

---

### ❌ Overusing procedures

👉 Business logic should not be fully in DB

---

---

## 🔹 Performance Tips ⚡

---

✔ Use procedures for batch operations
✔ Use functions for calculations
✔ Avoid heavy loops inside DB
✔ Keep logic simple

---

---

## 🔹 Mini Practice Task

```sql id="u4j4xv"
-- Procedure
DELIMITER //

CREATE PROCEDURE get_all_students()
BEGIN
    SELECT * FROM students;
END //

DELIMITER ;

CALL get_all_students();

-- Function
DELIMITER //

CREATE FUNCTION square_num(x INT)
RETURNS INT
DETERMINISTIC
BEGIN
    RETURN x * x;
END //

DELIMITER ;

SELECT square_num(5);
```

---

## 🔚 Summary

* Stored Procedure = reusable SQL logic
* Function = reusable value-returning logic
* Used for:

  * Backend operations
  * Calculations
  * Reports
* Key difference:

  * Procedure → CALL
  * Function → SELECT
