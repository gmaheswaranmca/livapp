import express from "express";
import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

const PORT = process.env.APP_PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";
const JWT_SECRET = process.env.JWT_SECRET || "secret";

const app = express();
app.use(cors());
app.use(express.json());

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

  const user = await AdminUser.findOne({ email });
  const user_pwd : string = user?.password ? user?.password : '';

  if (!user) return res.status(401).send("Invalid credentials");

  const valid = await bcrypt.compare(password, user_pwd);
  if (!valid) return res.status(401).send("Invalid credentials");

  const token = jwt.sign(
    { user_id: user._id, email: user.email, role: user.role },
    JWT_SECRET
  );

  res.json({ token, role: user.role });
});

// =======================
// Trainer APIs
// =======================

// LIST / SEARCH
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

//AUDIT
app.get(
  "/api/audit",
  authMiddleware,
  roleMiddleware([3, 4]),
  async (req, res) => {
    const logs = await Audit.find().sort({ updated_time: -1 }).limit(20);
    res.json(logs);
  }
);

//LAST UPDATE - API ENDPOINTS
app.get("/api/last-update", async (req, res) => {
  const data = await LastUpdate.findOne();
  res.json(data);
});

// =======================
// INIT SUPER USER
// =======================

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