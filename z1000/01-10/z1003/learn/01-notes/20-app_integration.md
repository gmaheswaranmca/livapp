## 20. MySQL + Application Integration 🔥 (Backend + ORM + Production Patterns)

---

## 🔹 What is Integration?

Connecting **MySQL database with application code** (like Node.js backend).

👉 In simple terms:

> Integration = “App ↔ Database communication”

---

## 🔹 Why It’s Important?

* Backend APIs depend on DB
* CRUD operations happen here
* Performance & scalability depend on integration

---

# 🔸 1. MySQL with Node.js (Core Integration) 🔥

---

## 🔹 Install MySQL Driver

```bash
npm install mysql2
```

---

## 🔹 Basic Connection

```javascript id="p1k2m3"
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'app_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});
```

---

## 🔹 Execute Query

```javascript id="u4v5w6"
connection.query('SELECT * FROM users', (err, results) => {
  console.log(results);
});
```

---

---

# 🔸 2. Connection Pooling 🔥

---

## 🔹 Why Pooling?

* Avoid creating connection each request
* Improve performance

---

## 🔹 Example

```javascript id="z7x8y9"
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'app_db',
  waitForConnections: true,
  connectionLimit: 10
});

pool.query('SELECT * FROM users', (err, results) => {
  console.log(results);
});
```

---

---

# 🔸 3. Using Promises / Async-Await

---

```javascript id="m1n2o3"
const mysql = require('mysql2/promise');

const pool = mysql.createPool({ /* config */ });

async function getUsers() {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
}
```

---

---

# 🔸 4. Transactions in Application 🔥

---

## 🔹 Example

```javascript id="q4r5s6"
const conn = await pool.getConnection();

try {
  await conn.beginTransaction();

  await conn.query('UPDATE accounts SET balance = balance - 100 WHERE id = 1');
  await conn.query('UPDATE accounts SET balance = balance + 100 WHERE id = 2');

  await conn.commit();
} catch (err) {
  await conn.rollback();
} finally {
  conn.release();
}
```

---

👉 Critical for:

* Payments
* Orders
* Banking

---

---

# 🔸 5. ORM Tools 🔥

---

## 🔹 What is ORM?

ORM = **Object Relational Mapping**

👉 Convert:

* Tables ↔ Objects
* SQL ↔ Code

---

## 🔹 Popular ORMs

| ORM       | Use                   |
| --------- | --------------------- |
| Prisma    | Modern, type-safe     |
| Sequelize | Traditional, flexible |
| TypeORM   | TypeScript-based      |

---

---

# 🔸 Prisma (Recommended 🔥)

---

## 🔹 Install

```bash
npm install prisma @prisma/client
```

---

## 🔹 Schema Example

```prisma id="pr1"
model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
}
```

---

## 🔹 Query Example

```javascript id="pr2"
const users = await prisma.user.findMany();
```

---

👉 No raw SQL needed

---

---

# 🔸 Sequelize

---

## 🔹 Define Model

```javascript id="sq1"
const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: DataTypes.STRING
});
```

---

## 🔹 Query

```javascript id="sq2"
const users = await User.findAll();
```

---

---

# 🔸 6. Raw SQL vs ORM 🔥

---

| Feature     | Raw SQL   | ORM             |
| ----------- | --------- | --------------- |
| Control     | High      | Medium          |
| Performance | High      | Slight overhead |
| Ease        | Harder    | Easier          |
| Learning    | SQL-heavy | JS-friendly     |

---

👉 Best practice:

* Use ORM + raw SQL when needed

---

---

# 🔸 7. API Example (CRUD) 🔥

---

## 🔹 Create User

```javascript id="api1"
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  await pool.query(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email]
  );
  res.send('User created');
});
```

---

---

## 🔹 Get Users

```javascript id="api2"
app.get('/users', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM users');
  res.json(rows);
});
```

---

---

# 🔸 8. Security in Integration 🔥

---

## 🔹 SQL Injection (Important 🚨)

---

### ❌ Unsafe

```javascript id="bad1"
const query = `SELECT * FROM users WHERE email = '${email}'`;
```

---

### ✅ Safe (Prepared Statement)

```javascript id="good1"
await pool.query(
  'SELECT * FROM users WHERE email = ?',
  [email]
);
```

---

---

# 🔸 9. Real-World Use Cases

---

### ✅ 1. MERN Backend 🔥

* Node.js API → MySQL
* CRUD operations

---

---

### ✅ 2. E-commerce

* Orders
* Payments
* Users

---

---

### ✅ 3. Healthcare System 🔥

* Patients
* Doctors
* Appointments

---

---

### ✅ 4. Banking

* Transactions
* Account balance updates

---

---

# 🔹 Common Mistakes 🚨

---

### ❌ No connection pooling

👉 Performance issue

---

### ❌ SQL injection vulnerability

👉 Security risk

---

### ❌ Not handling transactions

👉 Data inconsistency

---

---

# 🔹 Performance Tips ⚡

---

✔ Use connection pooling
✔ Use prepared statements
✔ Use indexes in DB
✔ Avoid unnecessary queries
✔ Use caching (Redis)

---

---

# 🔹 Mini Practice Task

```javascript id="prac1"
// Create connection pool
// Insert user
// Fetch users
// Use prepared statements
```

---

## 🔚 Summary

* Integration = App ↔ DB
* Key components:

  * Connection
  * Pooling
  * Transactions
  * ORM
* Tools:

  * mysql2
  * Prisma
  * Sequelize
* Critical for:

  * Backend development
  * Production systems
