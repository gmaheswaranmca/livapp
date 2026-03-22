Now we move from **working app → professional system** 🔥
This phase upgrades your project to **real enterprise-level behavior**

---

# 🚀 Phase 5 – Advanced + Production Features

## 🎯 What We Add

✅ Role-based UI control
✅ Backend Pagination (real)
✅ Password encryption (bcrypt)
✅ Audit Viewer
✅ Last Update tracking
✅ Better API design

---

# 🧠 STEP 1 – Password Encryption (CRITICAL)

## 📦 Install bcrypt

Inside `server/`:

```bash
npm install bcrypt
```

---

## ✏️ Update Login + Super User

### 🔁 Replace in `index.ts`

```ts
import bcrypt from "bcrypt";
```

---

### 🔐 Update Super User Creation

```ts
const createSuperUser = async () => {
  const exists = await AdminUser.findOne({ role: 4 });

  if (!exists) {
    const hashed = await bcrypt.hash("1234", 10);

    await AdminUser.create({
      email: "su@gmail.com",
      password: hashed,
      role: 4
    });

    console.log("Super user created");
  }
};
```

---

### 🔐 Update Login API

```ts
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await AdminUser.findOne({ email });
  if (!user) return res.status(401).send("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).send("Invalid credentials");

  const token = jwt.sign(
    { user_id: user._id, email: user.email, role: user.role },
    JWT_SECRET
  );

  res.json({ token, role: user.role });
});
```

---

# 🧠 STEP 2 – Backend Pagination (REAL)

## ✏️ Update Trainers API

```ts
app.get("/api/trainers", authMiddleware, async (req, res) => {
  const { page = 1, limit = 5, search = "" }: any = req.query;

  const query = {
    name: { $regex: search, $options: "i" }
  };

  const data = await Trainer.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await Trainer.countDocuments(query);

  res.json({
    data,
    total
  });
});
```

---

# 🧠 STEP 3 – Role-Based UI

## 📄 Update login.tsx

```ts
if (res.token) {
  localStorage.setItem("token", res.token);
  localStorage.setItem("role", res.role);
  navigate("/");
}
```

---

## 📄 Update Home UI (IMPORTANT)

### Add role check:

```ts
const role = Number(localStorage.getItem("role"));
```

---

### Update Buttons:

```tsx
{role >= 1 && (
  <button className="btn btn-primary" onClick={() => navigate("/new")}>
    + Add
  </button>
)}
```

```tsx
{role >= 2 && (
  <button
    className="btn btn-warning btn-sm me-2"
    onClick={() => navigate(`/edit/${t._id}`)}
  >
    Edit
  </button>
)}
```

```tsx
{role >= 3 && (
  <button
    className="btn btn-danger btn-sm"
    onClick={() => remove(t._id)}
  >
    Delete
  </button>
)}
```

---

# 🧠 STEP 4 – Frontend Pagination

## ✏️ Update API

```ts
export const getTrainers = async (page = 1, search = "") => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${API_URL}/api/trainers?page=${page}&limit=5&search=${search}`,
    {
      headers: { Authorization: token || "" }
    }
  );

  return res.json();
};
```

---

## ✏️ Update Home

Add state:

```ts
const [page, setPage] = useState(1);
const [total, setTotal] = useState(0);
```

---

Update load:

```ts
const res = await getTrainers(page, search);
setTrainers(res.data);
setTotal(res.total);
```

---

Pagination UI:

```tsx
<div className="mt-3">
  <button
    className="btn btn-secondary me-2"
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    Prev
  </button>

  <button
    className="btn btn-secondary"
    disabled={page * 5 >= total}
    onClick={() => setPage(page + 1)}
  >
    Next
  </button>
</div>
```

---

# 🧠 STEP 5 – Audit Viewer (Manager/SU)

## 📄 Backend API

```ts
app.get(
  "/api/audit",
  authMiddleware,
  roleMiddleware([3, 4]),
  async (req, res) => {
    const logs = await Audit.find().sort({ updated_time: -1 }).limit(20);
    res.json(logs);
  }
);
```

---

## 📄 Frontend Page

```tsx
// pages/audit.tsx
import { useEffect, useState } from "react";
import PrivateNavbar from "../components/PrivateNavbar";

const Audit = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchAudit();
  }, []);

  const fetchAudit = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/audit", {
      headers: { Authorization: token || "" }
    });

    const data = await res.json();
    setLogs(data);
  };

  return (
    <>
      <PrivateNavbar />
      <div className="container mt-3">
        <h3>Audit Logs</h3>

        <ul className="list-group">
          {logs.map((l: any) => (
            <li key={l._id} className="list-group-item">
              {l.table} - {l.op}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Audit;
```

---

# 🧠 STEP 6 – Last Update API

## Backend

```ts
app.get("/api/last-update", async (req, res) => {
  const data = await LastUpdate.findOne();
  res.json(data);
});
```

---

## Use in UI (Optional Header)

```ts
const res = await fetch("/api/last-update");
```

---

# ▶️ Restart

```bash
docker compose down
docker compose up --build
```

---

# 🧠 What You Achieved (BIG)

✅ Secure password handling
✅ Real pagination (backend + frontend)
✅ Role-based UI + API enforcement
✅ Audit logging system (enterprise feature)
✅ System-wide update tracking
✅ Production-level architecture

---

# 🚀 FINAL PHASE (Optional but Powerful)

👉 Phase 6 – Production & Scaling

* Build optimization (vite build + nginx)
* Environment separation (dev/prod)
* Mongo indexing
* API validation (Joi/Zod)
* Logging (Winston)
* Docker optimization (multi-stage)

---

👉 If you want:

Say **"Phase 6"**

OR

Say **"Explain architecture deeply"** (I’ll break this like system design interview level)
