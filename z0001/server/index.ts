/*
Settigup Reading Env Vars from .env file
  READ configurations from Env Vars PORT, MONGO_URI, JWT_SECRET
Create App  
  Add middlewares 
    CORS
    JSON

Create mongoose models 
  admin_user model = from admin_user schema 
  trainer model = from trainer schema
  audit model = from audit schema
  last_update model = from last_update schema

Define middlewares and utility 
  middlewares:
    authMiddleware  : token verification, sets token user in req.user  
    roleMiddleware hof : for param role numbers to hof, 
      getting middleware : to check: given param role matches user role

  utility
    logAudit entry and update to lastUpdate

API End Points
  Auth
    login API : POST /api/login {email, password} -> { token }
      
      for matched user, for token
  Trainer
    list: GET /api/trainers -> [{ ie trainer json }]
      authMiddleware
      find Trainers filter "name contains search"
    create: POST /api/trainers 
      ... { body+, updated_user_id from req.user}
        -> { createdTrainer json }
      authMiddleware, roleMiddleware([1, 2, 3, 4])
      create Trainer
      op+: logAudit
    view: GET /api/trainers/:id -> { ie trainer json }
      authMiddleware, roleMiddleware([1, 2, 3, 4])
      query filter "name contains search"
    update: PUT /api/trainers/:id 
      ... { body+, updated_user_id from req.user}
        -> { createdTrainer json }
      authMiddleware, roleMiddleware([2, 3, 4])
      findByIdAndUpdate Trainer
      op+: logAudit   
    delete: DELETE /api/trainers/:id 
      ... { body+, updated_user_id from req.user}
        -> { createdTrainer json }
      authMiddleware, roleMiddleware([3, 4])
      findByIdAndDelete Trainer
      op+: logAudit
Init super user
  createSuperUser
Start Server
  mongoose.connect
    -> createSuperUser
    -> app.liste PORT
*/
import express from "express";
import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";

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
  const searchStr = typeof search === "string" ? search : "";
  
  const trainers = await Trainer.find({
    name: { $regex: searchStr, $options: "i" }
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