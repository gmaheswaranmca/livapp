Excellent — now we build the **real backend (core brain of your system)** 🔥

---

# 🚀 Phase 2 – Backend (JWT + RBAC + Mongo ODM)

We will upgrade your **single-file `index.ts`** into a **production-style API (still single file as per your requirement)**

---

# 🎯 What You Will Get in This Phase

✅ Mongo Models (trainer, admin_users, audit, last_update)
✅ JWT Authentication
✅ Role-based Authorization
✅ Super User auto-create
✅ Login API
✅ Trainer CRUD APIs (secured)

---

# 📄 Replace `server/index.ts` COMPLETELY

👉 This is your **final Phase 2 backend**

```ts
import express from "express";
import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.APP_PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";
const JWT_SECRET = process.env.JWT_SECRET || "secret";

// =======================
// Mongo Schemas
// =======================

// Admin User
const AdminUserSchema = new Schema({
  email: String,
  password: String,
  role: Number,
  updated_time: { type: Date, default: Date.now }
});
const AdminUser = mongoose.model("admin_users", AdminUserSchema);

// Trainer
const TrainerSchema = new Schema({
  name: String,
  skills: [String],
  photo: String,
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  updated_user_id: String,
  updated_time: { type: Date, default: Date.now }
});
const Trainer = mongoose.model("trainer", TrainerSchema);

// Audit
const AuditSchema = new Schema({
  table: String,
  op: String,
  payload: Object,
  updated_time: { type: Date, default: Date.now }
});
const Audit = mongoose.model("audit", AuditSchema);

// Last Update
const LastUpdateSchema = new Schema({
  updated_time: { type: Date, default: Date.now }
});
const LastUpdate = mongoose.model("last_update", LastUpdateSchema);

// =======================
// Middleware
// =======================

const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("No token");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
};

const roleMiddleware = (roles: number[]) => {
  return (req: any, res: any, next: any) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send("Forbidden");
    }
    next();
  };
};

// =======================
// Utility
// =======================

const logAudit = async (table: string, op: string, payload: any) => {
  await Audit.create({ table, op, payload });
  await LastUpdate.findOneAndUpdate(
    {},
    { updated_time: new Date() },
    { upsert: true }
  );
};

// =======================
// Auth API
// =======================

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await AdminUser.findOne({ email, password });
  if (!user) return res.status(401).send("Invalid credentials");

  const token = jwt.sign(
    { user_id: user._id, email: user.email, role: user.role },
    JWT_SECRET
  );

  res.json({ token });
});

// =======================
// Trainer APIs
// =======================

// LIST / SEARCH
app.get("/api/trainers", authMiddleware, async (req, res) => {
  const { search = "" } = req.query;

  const trainers = await Trainer.find({
    name: { $regex: search, $options: "i" }
  });

  res.json(trainers);
});

// CREATE (agent+)
app.post(
  "/api/trainers",
  authMiddleware,
  roleMiddleware([1, 2, 3, 4]),
  async (req: any, res) => {
    const trainer = await Trainer.create({
      ...req.body,
      updated_user_id: req.user.user_id
    });

    await logAudit("trainer", "create", trainer);

    res.json(trainer);
  }
);

// VIEW
app.get("/api/trainers/:id", authMiddleware, async (req, res) => {
  const trainer = await Trainer.findById(req.params.id);
  res.json(trainer);
});

// UPDATE (officer+)
app.put(
  "/api/trainers/:id",
  authMiddleware,
  roleMiddleware([2, 3, 4]),
  async (req: any, res) => {
    const trainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updated_user_id: req.user.user_id,
        updated_time: new Date()
      },
      { new: true }
    );

    await logAudit("trainer", "update", trainer);

    res.json(trainer);
  }
);

// DELETE (manager+)
app.delete(
  "/api/trainers/:id",
  authMiddleware,
  roleMiddleware([3, 4]),
  async (req, res) => {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);

    await logAudit("trainer", "delete", trainer);

    res.json({ message: "Deleted" });
  }
);

// =======================
// INIT SUPER USER
// =======================

const createSuperUser = async () => {
  const exists = await AdminUser.findOne({ role: 4 });

  if (!exists) {
    await AdminUser.create({
      email: "su@gmail.com",
      password: "1234",
      role: 4
    });
    console.log("Super user created");
  }
};

// =======================
// START SERVER
// =======================

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("Mongo connected");

    await createSuperUser();

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
```

---

# ▶️ Restart Containers

```bash
docker compose down
docker compose up --build
```

---

# 🧪 Test APIs (VERY IMPORTANT)

## 🔐 Login

```
POST http://localhost:5000/api/login
```

Body:

```json
{
  "email": "su@gmail.com",
  "password": "1234"
}
```

👉 Copy token

---

## 📋 List Trainers

```
GET /api/trainers
Authorization: <token>
```

---

## ➕ Create Trainer

```json
POST /api/trainers
Authorization: <token>

{
  "name": "John",
  "skills": ["React", "Node"],
  "photo": "",
  "status": "Active"
}
```

---

# ⚠️ Important Notes

### 🔴 Password not encrypted (for now)

We will fix in later phase

---

### 🔴 Pagination not yet added

Will come in Phase 4

---

# 🧠 What You Built

✔ JWT Authentication
✔ Role-based Authorization (Agent / Officer / Manager / SU)
✔ Mongo ODM (Mongoose)
✔ Audit logging system
✔ Auto Super User creation
✔ Secure Trainer APIs

---

# 🚀 Next Phase (Frontend Begins)

We will build:

* React structure
* Routing
* PrivateRoute
* Login page
* Navbar

---

👉 Say:

**"Phase 3"**

Let’s bring UI + Auth together 🔥
