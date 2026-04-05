# 🧠 MQL (MongoDB Query Language) – DCL-like Operations

---

# 📌 What is DCL in MongoDB?

In SQL:

* DCL = **GRANT, REVOKE**
* Controls **access & permissions**

In MongoDB:

* DCL = **User & Role Management**
* Controls:

  * Authentication (who can access)
  * Authorization (what they can do)

👉 Implemented using:

* **Users**
* **Roles**
* **Privileges**

---

# 🔐 1. Core Concepts

## 🔹 User

* Entity that logs into MongoDB

## 🔹 Role

* Set of permissions (read, write, admin)

## 🔹 Privilege

* Specific action on a resource

---

## 📊 Structure

```
User → assigned → Roles → contain → Privileges
```

---

# 👤 2. User Management

## 🔹 Create User

```js id="1y4ehy"
db.createUser({
  user: "trainerAdmin",
  pwd: "1234",
  roles: [
    { role: "readWrite", db: "trainingDB" }
  ]
})
```

---

### ✅ Use Case:

👉 Trainer app admin with full CRUD access

---

## 🔹 Create Admin User

```js id="hjg9g6"
use admin

db.createUser({
  user: "superAdmin",
  pwd: "admin123",
  roles: ["root"]
})
```

---

### ✅ Use Case:

👉 Full system control (DevOps / DBA)

---

## 🔹 Authenticate User

```js id="wq5og5"
db.auth("trainerAdmin", "1234")
```

---

---

## 🔹 Update User Roles

```js id="u2afbt"
db.updateUser("trainerAdmin", {
  roles: [
    { role: "read", db: "trainingDB" }
  ]
})
```

---

### ✅ Use Case:

👉 Downgrade permissions (security policy)

---

## 🔹 Drop User

```js id="9pg8df"
db.dropUser("trainerAdmin")
```

---

# 🛡 3. Built-in Roles (VERY IMPORTANT)

## 🔹 Database-Level Roles

| Role        | Description            |
| ----------- | ---------------------- |
| `read`      | Read-only              |
| `readWrite` | Read + Write           |
| `dbAdmin`   | Manage indexes, schema |
| `userAdmin` | Manage users           |

---

## 🔹 Cluster-Level Roles

| Role           | Description    |
| -------------- | -------------- |
| `clusterAdmin` | Manage cluster |
| `root`         | Full access    |

---

---

## 🔹 Example

```js id="nfwbvx"
db.createUser({
  user: "viewer",
  pwd: "1234",
  roles: [
    { role: "read", db: "trainingDB" }
  ]
})
```

---

### ✅ Use Case:

👉 Reporting dashboard (read-only user)

---

# 🧩 4. Custom Roles

## 🔹 Create Custom Role

```js id="jgrm2r"
db.createRole({
  role: "limitedEditor",
  privileges: [
    {
      resource: { db: "trainingDB", collection: "trainers" },
      actions: ["find", "update"]
    }
  ],
  roles: []
})
```

---

## 🔹 Assign Custom Role

```js id="qg5jqc"
db.createUser({
  user: "editorUser",
  pwd: "1234",
  roles: ["limitedEditor"]
})
```

---

### ✅ Use Case:

👉 Trainer can update only their profile

---

# 🔄 5. Grant & Revoke Roles

## 🔹 Grant Role

```js id="1k7onp"
db.grantRolesToUser("editorUser", [
  { role: "readWrite", db: "trainingDB" }
])
```

---

## 🔹 Revoke Role

```js id="g8d63j"
db.revokeRolesFromUser("editorUser", [
  { role: "readWrite", db: "trainingDB" }
])
```

---

### ✅ Use Case:

👉 Temporary access control

---

# 🔍 6. View Users & Roles

## 🔹 Show Users

```js id="5y5ns9"
db.getUsers()
```

---

## 🔹 Show Roles

```js id="j8f49o"
db.getRoles({ showPrivileges: true })
```

---

---

# 🔐 7. Authentication Mechanisms

MongoDB supports:

* SCRAM (default)
* x.509 certificates
* LDAP (enterprise)

---

### Example (Default SCRAM)

```js id="z8d41v"
db.auth("user", "password")
```

---

# 🏗 8. Real-World Use Cases

---

## 👨‍🏫 Trainer Platform (Your Context)

### Roles:

* **Super Admin** → root
* **Admin** → readWrite
* **Trainer** → limitedEditor
* **Viewer** → read

---

### Example:

```js id="0uxcd1"
db.createUser({
  user: "trainer1",
  pwd: "1234",
  roles: ["limitedEditor"]
})
```

---

---

## 🛒 E-Commerce

| User Type | Role      |
| --------- | --------- |
| Customer  | read      |
| Admin     | readWrite |
| Analyst   | read      |

---

---

## 🔐 Banking System

* Teller → limited write
* Auditor → read only
* Admin → full access

---

# ⚠️ 9. Common Mistakes

---

### ❌ Using root for all users

👉 Security risk

---

### ❌ No role separation

👉 Violates least privilege principle

---

### ❌ Hardcoding credentials

👉 Use environment variables

---

# ⚖️ SQL vs MongoDB DCL

| SQL         | MongoDB             |
| ----------- | ------------------- |
| GRANT       | grantRolesToUser    |
| REVOKE      | revokeRolesFromUser |
| CREATE USER | createUser          |
| DROP USER   | dropUser            |
| ROLES       | Roles + Privileges  |

---

# 🚀 Final Understanding

👉 MongoDB DCL is:

* **Role-based (RBAC)**
* **Flexible**
* **Security-focused**

👉 Key concepts:

* Users
* Roles
* Privileges

---

# 🧩 Interview Insight

👉 If asked:

**“How does MongoDB handle security?”**

Answer:

* Uses **Role-Based Access Control (RBAC)**
* Users are assigned roles
* Roles define privileges on DB/collections

---

# 🏁 Final Tip (Very Important)

👉 Always follow:

* **Least privilege principle**
* Separate roles per environment:

  * Dev
  * Test
  * Prod
