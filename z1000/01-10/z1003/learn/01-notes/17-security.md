## 17. Security 🔐 (Users, Roles, Privileges, Authentication)

---

## 🔹 What is Database Security?

Database security ensures:

* Only **authorized users** can access data
* Sensitive data is **protected**
* Actions are **controlled & auditable**

👉 In simple terms:

> Security = “Who can access what and what they can do”

---

## 🔹 Core Concepts

| Concept        | Meaning              |
| -------------- | -------------------- |
| Users          | Who accesses DB      |
| Roles          | Group of permissions |
| Privileges     | What actions allowed |
| Authentication | Login verification   |
| Encryption     | Protect data         |

---

# 🔸 1. Users in MySQL

---

## 🔹 Create User

```sql id="j6d4k2"
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'password123';
```

---

## 🔹 Create User for Remote Access

```sql id="0w8r9x"
CREATE USER 'api_user'@'%' IDENTIFIED BY 'secure_pass';
```

👉 `%` → any host (use carefully ⚠️)

---

## 🔹 Show Users

```sql id="s9z4mx"
SELECT user, host FROM mysql.user;
```

---

## 🔹 Delete User

```sql id="s7g2fy"
DROP USER 'app_user'@'localhost';
```

---

---

# 🔸 2. Privileges (GRANT / REVOKE) 🔥

---

## 🔹 What are Privileges?

Permissions to perform actions like:

* SELECT
* INSERT
* UPDATE
* DELETE

---

## 🔹 Grant Privileges

```sql id="ntj0y1"
GRANT SELECT, INSERT ON company_db.* TO 'app_user'@'localhost';
```

---

👉 User can:

* Read data
* Insert data

---

## 🔹 Grant All Privileges

```sql id="x9rk6v"
GRANT ALL PRIVILEGES ON company_db.* TO 'admin_user'@'localhost';
```

---

## 🔹 Apply Changes

```sql id="sn5f7z"
FLUSH PRIVILEGES;
```

---

---

## 🔹 Revoke Privileges

```sql id="b0t2d8"
REVOKE INSERT ON company_db.* FROM 'app_user'@'localhost';
```

---

---

## 🔹 Show Privileges

```sql id="z7h9kx"
SHOW GRANTS FOR 'app_user'@'localhost';
```

---

---

# 🔸 3. Roles 🔥

---

## 🔹 What are Roles?

Roles = **group of privileges**

👉 Instead of assigning permissions to each user individually

---

## 🔹 Create Role

```sql id="k2w7rq"
CREATE ROLE 'read_only';
```

---

## 🔹 Assign Privileges to Role

```sql id="b4k6nx"
GRANT SELECT ON company_db.* TO 'read_only';
```

---

## 🔹 Assign Role to User

```sql id="z8t1px"
GRANT 'read_only' TO 'app_user'@'localhost';
```

---

## 🔹 Activate Role

```sql id="n4z2hs"
SET DEFAULT ROLE 'read_only' TO 'app_user'@'localhost';
```

---

---

# 🔸 4. Authentication 🔥

---

## 🔹 What is Authentication?

Verifying user identity using:

* Username
* Password

---

## 🔹 Change Password

```sql id="y1k9v2"
ALTER USER 'app_user'@'localhost' IDENTIFIED BY 'new_password';
```

---

## 🔹 Authentication Plugins

* `mysql_native_password`
* `caching_sha2_password` (default modern)

---

---

# 🔸 5. Data Encryption 🔥

---

## 🔹 Types

| Type         | Description             |
| ------------ | ----------------------- |
| At Rest      | Stored data encryption  |
| In Transit   | SSL/TLS encryption      |
| Column Level | Encrypt specific fields |

---

## 🔹 Example (Basic Encryption)

```sql id="y6f4o8"
SELECT AES_ENCRYPT('password', 'key');
SELECT AES_DECRYPT(column, 'key');
```

---

---

# 🔹 Real-World Use Cases

---

### ✅ 1. Backend App (MERN) 🔥

```sql id="g8f3kp"
CREATE USER 'app_user'@'%' IDENTIFIED BY 'secure_pass';

GRANT SELECT, INSERT, UPDATE ON app_db.* TO 'app_user'@'%';
```

👉 Limited access (no DROP)

---

---

### ✅ 2. Admin User

```sql id="u2q8v7"
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost';
```

---

---

### ✅ 3. Read-Only Reporting

```sql id="k9r1x6"
CREATE ROLE 'report_viewer';
GRANT SELECT ON company_db.* TO 'report_viewer';
```

---

---

### ✅ 4. Healthcare System 🔥

```sql id="c3y7m2"
-- Doctor: read + update
GRANT SELECT, UPDATE ON patients.* TO 'doctor_user';

-- Receptionist: limited access
GRANT SELECT ON patients.* TO 'reception_user';
```

---

---

# 🔹 Security Best Practices 🔥

---

✔ Never use root in applications
✔ Use strong passwords
✔ Use least privilege principle
✔ Restrict remote access
✔ Use roles instead of direct grants
✔ Enable SSL/TLS
✔ Regularly audit users

---

---

# 🔹 Common Mistakes 🚨

---

### ❌ Using root in production

👉 Huge security risk

---

### ❌ Granting ALL PRIVILEGES unnecessarily

👉 Over-permission

---

### ❌ Using '%' host carelessly

👉 Opens DB to internet

---

---

# 🔹 Performance & Security Tips ⚡

---

✔ Use connection pooling with limited users
✔ Rotate passwords regularly
✔ Monitor failed login attempts
✔ Log access activity

---

---

# 🔹 Mini Practice Task

```sql id="b9x8d1"
-- Create user
CREATE USER 'test_user'@'localhost' IDENTIFIED BY '1234';

-- Grant access
GRANT SELECT ON test_db.* TO 'test_user'@'localhost';

-- Check
SHOW GRANTS FOR 'test_user'@'localhost';

-- Revoke
REVOKE SELECT ON test_db.* FROM 'test_user'@'localhost';
```

---

## 🔚 Summary

* Security = control access
* Key components:

  * Users
  * Roles
  * Privileges
  * Authentication
  * Encryption
* Core principle:
  👉 Least privilege
