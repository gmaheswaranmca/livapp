# 🔷 6 - Production & Scaling

## 🎯 What We Will Do

✅ Production build (React → static)
✅ Nginx for client serving
✅ Multi-stage Docker builds
✅ Env separation (dev vs prod)
✅ Mongo indexing
✅ API validation
✅ Logging system
✅ Performance improvements

---

## 🧠 1. Production Architecture (What changes?)

### BEFORE (Dev)

```
Vite Dev Server → Node → Mongo
```

### AFTER (Production)

```
Browser → Nginx → Node API → Mongo
```

👉 No Vite dev server
👉 Faster + secure + scalable

---

## 📄 2. Client – Production Dockerfile (IMPORTANT)

Replace `client/Dockerfile`

```dockerfile id="2r3lq4"
# Stage 1: Build
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

---

## 📄 3. Nginx Config (Optional but better)

📁 `client/nginx.conf`

```nginx id="u8j1qk"
server {
  listen 80;

  location / {
    root /usr/share/nginx/html;
    index index.html;
    try_files $uri /index.html;
  }
}
```

Update Dockerfile:

```dockerfile id="p8l1d2"
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

---

## 📄 4. Server – Production Dockerfile

Replace `server/Dockerfile`

```dockerfile id="b2q6gh"
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g typescript
RUN tsc index.ts

EXPOSE 5000

CMD ["node", "index.js"]
```

---

## 📄 5. Separate ENV Files

### Root

```env id="yikp0f"
NODE_ENV=production
```

---

### client/.env.production

```env id="vl7qut"
VITE_API_URL=http://localhost:5000
```

---

### server/.env.production

```env id="4o0vaf"
APP_PORT=5000
MONGO_URI=mongodb://mongo:27017/trainerdb
JWT_SECRET=super_secure_secret
```

---

## 📄 6. docker-compose.prod.yml

```yaml id="2g3o9h"
version: "3.8"

services:
  mongo:
    image: mongo:7
    volumes:
      - mongo_data:/data/db

  server:
    build: ./server
    env_file:
      - server/.env.production
    ports:
      - "5000:5000"
    depends_on:
      - mongo

  client:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - server

volumes:
  mongo_data:
```

---

## ▶️ Run Production

```bash id="1e1k9k"
docker compose -f docker-compose.prod.yml up --build
```

---

## 🧠 7. Mongo Optimization (IMPORTANT)

Add index in `index.ts` after schema:

```ts id="m6mbm1"
TrainerSchema.index({ name: 1 });
```

👉 Improves search performance 🔥

---

## 🧠 8. API Validation (Professional)

Install:

```bash id="7r3xok"
npm install joi
```

---

### Example (Create Trainer)

```ts id="kdr6eq"
import Joi from "joi";

const trainerSchema = Joi.object({
  name: Joi.string().required(),
  skills: Joi.array().items(Joi.string()).required(),
  status: Joi.string().valid("Active", "Inactive")
});
```

Use:

```ts id="4r03t6"
const { error } = trainerSchema.validate(req.body);
if (error) return res.status(400).send(error.message);
```

---

## 🧠 9. Logging (Enterprise)

Install:

```bash id="p8d3b9"
npm install winston
```

---

### Logger Setup

```ts id="eq4b7k"
import winston from "winston";

const logger = winston.createLogger({
  transports: [new winston.transports.Console()]
});
```

Use:

```ts id="kn9l2s"
logger.info("Trainer created");
logger.error("Error occurred");
```

---

## 🧠 10. Security Improvements

### 🔐 Add Helmet

```bash id="k1nt0n"
npm install helmet
```

```ts id="drk6gk"
import helmet from "helmet";
app.use(helmet());
```

---

### 🔐 CORS Restrict

```ts id="6rm9n7"
app.use(cors({ origin: "http://localhost" }));
```

---

## 🧠 11. Performance Improvements

### ✔ Enable Gzip

```bash id="y5j1fw"
npm install compression
```

```ts id="m6b7g1"
import compression from "compression";
app.use(compression());
```

---

## 🧠 12. Future Scaling (Your Next Level)

When system grows:

| Component | Upgrade            |
| --------- | ------------------ |
| Node      | Cluster mode / PM2 |
| Mongo     | Replica Set        |
| API       | Gateway            |
| UI        | CDN                |
| Infra     | Kubernetes         |

---

## 🧠 Final Architecture (Your Level Now)

```
Nginx (Client)
     ↓
Node API (JWT + RBAC)
     ↓
Mongo (Indexed + Persistent Volume)
```

---

## 🏆 What You Achieved (SERIOUS LEVEL)

You now built:

✅ Full MERN system (TypeScript)
✅ Dockerized (WSL Engine)
✅ Auth + RBAC
✅ Audit system
✅ Production build (Nginx)
✅ Validation + Logging
✅ Performance tuning
✅ Dev → Prod separation

---

# 🔷 7 - Photo Upload and Change Password

## 🚀 Phase 7 – Step 1

### 🖼️ Backend File Upload (Multer Setup)

Goal:

✅ Upload image via API
✅ Store in `/uploads/trainer_photos`
✅ Return file path
✅ Test via Postman

---

## 📦 1. Install Dependencies

Inside `server/`:

```bash
npm install multer
npm install -D @types/multer
```

---

## 📁 2. Create Upload Folder

```bash
mkdir -p uploads/trainer_photos
```

---

## 🧠 3. Update `index.ts` (IMPORTANT)

#### 👉 Add imports at top

```ts
import multer from "multer";
import path from "path";
import fs from "fs";
```

---

## 🧠 4. Configure Multer Storage

Add this **before routes**:

```ts
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/trainer_photos";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname;
    cb(null, unique);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});
```

---

## 🧠 5. File Type Validation (VERY IMPORTANT)

Add:

```ts
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed"), false);
  }
};
```

Update multer:

```ts
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }
});
```

---

## 🧠 6. Serve Static Files

Add this:

```ts
app.use("/uploads", express.static("uploads"));
```

👉 Now browser can access:

```
http://localhost:5000/uploads/filename.jpg
```

---

## 🚀 7. Create Upload API (Test Endpoint)

```ts
app.post(
  "/api/upload",
  authMiddleware,
  upload.single("photo"),
  (req: any, res) => {
    if (!req.file) return res.status(400).send("No file");

    res.json({
      path: `/uploads/trainer_photos/${req.file.filename}`
    });
  }
);
```

---

## 🔁 Restart Docker

```bash
docker compose down
docker compose up --build
```

---

## 🧪 8. Test Using Postman

### Request:

```http
POST http://localhost:5000/api/upload
```

Headers:

```
Authorization: <token>
```

Body:

* form-data

  * key: `photo`
  * type: File
  * select image

---

### ✅ Expected Response

```json
{
  "path": "/uploads/trainer_photos/1712345678-image.jpg"
}
```

---

## 🌐 Test in Browser

Open:

```
http://localhost:5000/uploads/trainer_photos/<filename>
```

👉 Image should load ✅

---

## ⚠️ IMPORTANT (Docker Volume)

To persist files, update `docker-compose.yml`:

```yaml
server:
  volumes:
    - ./server:/app
    - ./server/uploads:/app/uploads   ## ADD THIS
    - /app/node_modules
```

---

## 🧠 What You Achieved

✅ File upload system
✅ Secure validation (image only)
✅ Size restriction
✅ Static file serving
✅ Docker persistence

## 🚀 Phase 7 – Step 2

### 🧩 Integrate Photo Upload with Trainer Create API

Goal:

✅ Single API → create trainer + upload photo
✅ Store photo path in Mongo
✅ No separate upload call needed
✅ Works from Postman + Frontend

---

## 🧠 Design Change

#### ❌ Before

```id="u5y7fd"
POST /api/trainers (JSON only)
```

#### ✅ Now

```id="7x8q0y"
POST /api/trainers (multipart/form-data)
```

👉 Supports:

* text fields
* file upload together

---

## 🛠️ 1. Update Backend API

### 🔁 Replace your existing CREATE API

Find this:

```ts
app.post("/api/trainers", ...)
```

---

### ✅ Replace with:

```ts id="3c7h4f"
app.post(
  "/api/trainers",
  authMiddleware,
  roleMiddleware([1, 2, 3, 4]),
  upload.single("photo"),
  async (req: any, res) => {
    try {
      const { name, skills, status } = req.body;

      const trainer = await Trainer.create({
        name,
        skills: skills ? skills.split(",") : [],
        status,
        photo: req.file
          ? `/uploads/trainer_photos/${req.file.filename}`
          : "",
        updated_user_id: req.user.user_id
      });

      await logAudit("trainer", "create", trainer);

      res.json(trainer);
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  }
);
```

---

## 🧠 2. Important Notes

#### ✔ `skills` comes as string

👉 `"React,Node"` → converted to array

---

#### ✔ `req.file`

* Available only if file uploaded
* Optional (safe handling)

---

#### ✔ Photo path stored like:

```id="mbrl9n"
/uploads/trainer_photos/abc.jpg
```

---

## 🔁 Restart

```bash id="y9y14f"
docker compose down
docker compose up --build
```

---

## 🧪 3. Test in Postman

### Request

```http id="0k98p2"
POST http://localhost:5000/api/trainers
```

Headers:

```id="gcrq47"
Authorization: <token>
```

---

### Body → form-data

| Key    | Type | Value          |
| ------ | ---- | -------------- |
| name   | Text | John           |
| skills | Text | React,Node     |
| status | Text | Active         |
| photo  | File | (select image) |

---

### ✅ Response

```json id="lxyf6a"
{
  "_id": "...",
  "name": "John",
  "skills": ["React", "Node"],
  "photo": "/uploads/trainer_photos/xyz.jpg"
}
```

---

## 🌐 4. Verify Image

```id="r3csxg"
http://localhost:5000/uploads/trainer_photos/xyz.jpg
```

👉 Should display image ✅

---

## 🧠 What You Achieved

✅ Combined API (file + data)
✅ Real-world multipart handling
✅ Mongo + file system sync
✅ Cleaner frontend (single call)

---

## ⚠️ Next Problem (Very Important)

👉 Update Trainer (edit) **does NOT handle photo yet**

👉 Also:

* Old photo not deleted ❌
* Photo update API missing ❌

---

## 🚀 Phase 7 – Step 3

### 🔁 Update Trainer Photo API (with old file cleanup)

---

## 🎯 Goal

✅ Update only trainer photo
✅ Delete old image from disk
✅ Avoid storage leaks
✅ Keep DB + filesystem in sync

---

## 🧠 API Design

```http
PUT /api/trainers/:id/photo
```

* Input: `multipart/form-data`
* Field: `photo` (file)

---

## 🛠️ 1. Add API in `index.ts`

👉 Add this below existing routes

```ts id="v4m2pt"
app.put(
  "/api/trainers/:id/photo",
  authMiddleware,
  roleMiddleware([2, 3, 4]),
  upload.single("photo"),
  async (req: any, res) => {
    try {
      const { id } = req.params;

      if (!req.file) return res.status(400).send("No file uploaded");

      // 1️⃣ Get existing trainer
      const trainer = await Trainer.findById(id);
      if (!trainer) return res.status(404).send("Trainer not found");

      // 2️⃣ Delete old photo (if exists)
      if (trainer.photo) {
        const oldPath = trainer.photo.replace("/uploads/", "uploads/");
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      // 3️⃣ Save new photo path
      const newPath = `/uploads/trainer_photos/${req.file.filename}`;

      trainer.photo = newPath;
      trainer.updated_time = new Date();

      await trainer.save();

      // 4️⃣ Audit
      await logAudit("trainer", "update_photo", {
        id,
        photo: newPath
      });

      res.json({ message: "Photo updated", photo: newPath });
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  }
);
```

---

## 🧠 2. Key Logic Explained

#### 🔴 Old File Deletion

```ts id="tqglkh"
fs.unlinkSync(oldPath);
```

👉 Prevents:

* disk filling
* orphan files

---

#### 🔴 Path Fix

```ts id="9ew40b"
.replace("/uploads/", "uploads/")
```

👉 Converts:

```id="m6n9j0"
/uploads/trainer_photos/a.jpg
```

➡️ to actual file path:

```id="2y7h03"
uploads/trainer_photos/a.jpg
```

---

## 🔁 Restart

```bash id="90svy1"
docker compose down
docker compose up --build
```

---

## 🧪 3. Test in Postman

### Request

```http id="v1p7gl"
PUT http://localhost:5000/api/trainers/<id>/photo
```

Headers:

```id="i1ccj9"
Authorization: <token>
```

Body → form-data:

| Key   | Type | Value              |
| ----- | ---- | ------------------ |
| photo | File | (select new image) |

---

### ✅ Expected Response

```json id="d92qhz"
{
  "message": "Photo updated",
  "photo": "/uploads/trainer_photos/new.jpg"
}
```

---

## 🧪 4. Verify

#### ✔ Old image deleted

#### ✔ New image accessible

```id="p0k3fz"
http://localhost:5000/uploads/trainer_photos/new.jpg
```

---

## ⚠️ Edge Cases (Handled)

✔ No file uploaded
✔ Trainer not found
✔ Old file missing (safe check)

---

## 🧠 What You Achieved

✅ File replacement logic
✅ Disk cleanup (VERY IMPORTANT in real apps)
✅ Partial update API
✅ Clean audit logging

---

## 🚀 Phase 7 – Step 4

### 🖥️ Frontend Integration (File Upload + Preview)

---

## 🎯 Goal

✅ Upload image from UI
✅ Send via `FormData`
✅ Show preview before upload
✅ Display uploaded image
✅ Work for **Create + Edit**

---

## 🧠 Key Change

#### ❌ Before

```ts
JSON API
```

#### ✅ Now

```ts
FormData (multipart)
```

---

## 📄 1. Update API (services/api.ts)

### 🔁 Replace `createTrainer`

```ts id="q2r7o1"
export const createTrainer = async (form: any) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("skills", form.skills);
  formData.append("status", form.status);

  if (form.photoFile) {
    formData.append("photo", form.photoFile);
  }

  const res = await fetch(`${API_URL}/api/trainers`, {
    method: "POST",
    headers: {
      Authorization: token || ""
    },
    body: formData
  });

  return res.json();
};
```

---

## 📄 2. Update TrainerForm (IMPORTANT)

### 🔁 Replace your `TrainerForm.tsx`

```tsx id="6m4j9z"
import { useEffect, useState } from "react";
import {
  createTrainer,
  updateTrainer,
  getTrainerById
} from "../services/api";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const TrainerForm = ({ mode, id }: any) => {
  const [form, setForm] = useState<any>({
    name: "",
    skills: "",
    status: "Active",
    photoFile: null,
    photoPreview: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "edit" && id) load();
  }, [id]);

  const load = async () => {
    const data = await getTrainerById(id);

    setForm({
      ...data,
      skills: data.skills.join(","),
      photoPreview: data.photo
        ? API_URL + data.photo
        : ""
    });
  };

  // 📸 Handle file selection
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];

    setForm({
      ...form,
      photoFile: file,
      photoPreview: URL.createObjectURL(file)
    });
  };

  const handleSubmit = async () => {
    if (mode === "new") {
      await createTrainer(form);
    } else {
      // Update basic fields first
      await updateTrainer(id, {
        name: form.name,
        skills: form.skills.split(","),
        status: form.status
      });

      // Update photo separately if selected
      if (form.photoFile) {
        const fd = new FormData();
        fd.append("photo", form.photoFile);

        const token = localStorage.getItem("token");

        await fetch(`${API_URL}/api/trainers/${id}/photo`, {
          method: "PUT",
          headers: { Authorization: token || "" },
          body: fd
        });
      }
    }

    navigate("/");
  };

  return (
    <div className="container mt-3">
      <h3>{mode === "new" ? "Create" : "Edit"} Trainer</h3>

      <input
        className="form-control mb-2"
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        className="form-control mb-2"
        placeholder="Skills (comma separated)"
        value={form.skills}
        onChange={(e) =>
          setForm({ ...form, skills: e.target.value })
        }
      />

      <select
        className="form-control mb-2"
        value={form.status}
        onChange={(e) =>
          setForm({ ...form, status: e.target.value })
        }
      >
        <option>Active</option>
        <option>Inactive</option>
      </select>

      {/* 📸 File Upload */}
      <input
        type="file"
        className="form-control mb-2"
        onChange={handleFileChange}
      />

      {/* 👁 Preview */}
      {form.photoPreview && (
        <img
          src={form.photoPreview}
          alt="preview"
          width="120"
          className="mb-2"
        />
      )}

      <button className="btn btn-success" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
};

export default TrainerForm;
```

---

## 📄 3. Show Image in List Page

Update `pages/index.tsx`

#### Add column:

```tsx id="7bgz9e"
<th>Photo</th>
```

---

#### Show image:

```tsx id="6y9g2j"
<td>
  {t.photo && (
    <img
      src={API_URL + t.photo}
      width="50"
      height="50"
    />
  )}
</td>
```

---

## 🔁 Restart

```bash id="f09k2q"
docker compose down
docker compose up --build
```

---

## 🧪 Test Flow

### ✅ Create Trainer

* Select image
* Save
* Image should appear in list

---

### ✅ Edit Trainer

* Change image
* Old image deleted ✔
* New image shown ✔

---

## ⚠️ Common Issues

#### ❌ Image not loading

✔ Check URL:

```id="kq2u9l"
http://localhost:5000/uploads/...
```

---

#### ❌ CORS issue

✔ Ensure backend:

```ts id="2l5qv8"
app.use(cors());
```

---

## 🧠 What You Achieved

✅ File upload UI
✅ Image preview UX
✅ Multipart API integration
✅ Clean edit flow (data + file separation)
✅ Real-world frontend pattern

---

## 🚀 Phase 7 – Step 5

### 🔐 Change Password (Backend + Frontend)

---

## 🎯 Goal

✅ User can change password
✅ Verify old password
✅ Hash new password (bcrypt)
✅ Secure API
✅ Simple UI

---

## 🧠 1. Backend API

### 📄 Add in `index.ts`

```ts id="r8z2k1"
app.put("/api/change-password", authMiddleware, async (req: any, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).send("Missing fields");
    }

    // 1️⃣ Get user
    const user = await AdminUser.findById(req.user.user_id);
    if (!user) return res.status(404).send("User not found");

    // 2️⃣ Verify old password
    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) return res.status(401).send("Old password incorrect");

    // 3️⃣ Hash new password
    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;
    user.updated_time = new Date();

    await user.save();

    // 4️⃣ Audit
    await logAudit("admin_users", "change_password", {
      user_id: user._id
    });

    res.json({ message: "Password updated successfully" });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
```

---

## 🧠 2. Frontend API

### 📄 services/api.ts

```ts id="k6j9x2"
export const changePassword = async (data: any) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token || ""
    },
    body: JSON.stringify(data)
  });

  return res.json();
};
```

---

## 📄 3. Create Page

```bash id="4m2f9l"
touch src/pages/change-password.tsx
```

---

### 📄 change-password.tsx

```tsx id="d5v8q1"
import { useState } from "react";
import PrivateNavbar from "../components/PrivateNavbar";
import { changePassword } from "../services/api";

const ChangePassword = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const handleSubmit = async () => {
    const res = await changePassword(form);

    if (res.message) {
      alert("Password changed successfully");
      setForm({ oldPassword: "", newPassword: "" });
    } else {
      alert("Error: " + res);
    }
  };

  return (
    <>
      <PrivateNavbar />
      <div className="container mt-3">
        <h3>Change Password</h3>

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Old Password"
          value={form.oldPassword}
          onChange={(e) =>
            setForm({ ...form, oldPassword: e.target.value })
          }
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="New Password"
          value={form.newPassword}
          onChange={(e) =>
            setForm({ ...form, newPassword: e.target.value })
          }
        />

        <button className="btn btn-primary" onClick={handleSubmit}>
          Update Password
        </button>
      </div>
    </>
  );
};

export default ChangePassword;
```

---

## 📄 4. Add Route

### Update `App.tsx`

```tsx id="9k2x8f"
import ChangePassword from "./pages/change-password";
```

Add route:

```tsx id="z1n8p4"
<Route
  path="/change-password"
  element={
    <PrivateRoute>
      <ChangePassword />
    </PrivateRoute>
  }
/>
```

---

## 📄 5. Add Menu in Navbar

### Update `PrivateNavbar.tsx`

```tsx id="p6w3m9"
<button
  className="btn btn-light me-2"
  onClick={() => navigate("/change-password")}
>
  Change Password
</button>
```

---

## 🔁 Restart

```bash id="x8p3k2"
docker compose down
docker compose up --build
```

---

## 🧪 Test Flow

### ✅ Step 1

Login → go to **Change Password**

---

### ✅ Step 2

Enter:

```id="2f7k1m"
old: 1234
new: 5678
```

---

### ✅ Step 3

Logout → Login again

✔ Old password ❌
✔ New password ✅

---

## ⚠️ Important Improvements (Optional but Strong)

#### 🔒 Add validation

```ts id="q2x7v9"
if (newPassword.length < 6)
```

---

#### 🔒 Force logout after change

```ts id="k7v2x1"
localStorage.removeItem("token");
```

---

## 🧠 What You Achieved

✅ Secure password update
✅ bcrypt integration (real security)
✅ Authenticated user action
✅ Audit logging
✅ Clean UI flow

---

## 🏆 FINAL SYSTEM STATUS

You now have:

✅ Auth (JWT + RBAC)
✅ Trainer CRUD
✅ File upload + image handling
✅ Audit system
✅ Pagination + search
✅ Change password
✅ Dockerized full stack
✅ Production-ready setup

---

## 🚀 You Are Now At

👉 **Full MERN + DevOps + Security level (job-ready)** 💯

---