Below is a **clean, production-style skeleton** for your requirement:

> ✅ **Next.js (fullstack) + TypeScript + MongoDB + Docker Compose**
> ✅ Entities:

* **admin_user** → `{id, email, password, role}`
* **trainer** → `{id, name, skills, photo}`

> ✅ Default super user → `su@gmail.com / 1234`

---

# 🧱 1. Project Setup (from scratch)

```bash
npx create-next-app@latest trainer-app --typescript
cd trainer-app
```

Select:

* ✔ App Router
* ✔ TypeScript
* ✔ ESLint

---

# 📦 2. Install Dependencies

```bash
npm install mongoose bcrypt jsonwebtoken
npm install -D @types/bcrypt @types/jsonwebtoken
```

---

# 📁 3. Folder Structure

```id="s1"
trainer-app/
├── app/
│   ├── api/
│   │   ├── auth/login/route.ts
│   │   └── trainer/route.ts
├── lib/
│   ├── db.ts
│   └── seed.ts
├── models/
│   ├── AdminUser.ts
│   └── Trainer.ts
├── docker-compose.yml
├── Dockerfile
└── .env
```

---

# 🧩 4. MongoDB Connection

### `lib/db.ts`

```ts id="s2"
import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;

  await mongoose.connect(process.env.MONGO_URI!);
};
```

---

# 🧾 5. Models

### 🔐 Admin User Model

```ts id="s3"
import mongoose from "mongoose";

const AdminUserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
});

export default mongoose.models.AdminUser ||
  mongoose.model("AdminUser", AdminUserSchema);
```

---

### 🧑‍🏫 Trainer Model

```ts id="s4"
import mongoose from "mongoose";

const TrainerSchema = new mongoose.Schema({
  name: String,
  skills: [String],
  photo: String,
});

export default mongoose.models.Trainer ||
  mongoose.model("Trainer", TrainerSchema);
```

---

# 🔑 6. Seed Super User

### `lib/seed.ts`

```ts id="s5"
import bcrypt from "bcrypt";
import AdminUser from "@/models/AdminUser";
import { connectDB } from "./db";

export const seedSuperUser = async () => {
  await connectDB();

  const exists = await AdminUser.findOne({ email: "su@gmail.com" });

  if (!exists) {
    const hashed = await bcrypt.hash("1234", 10);

    await AdminUser.create({
      email: "su@gmail.com",
      password: hashed,
      role: "super",
    });

    console.log("Super user created");
  }
};
```

👉 Call this once in startup (optional: inside login route first time)

---

# 🔐 7. Login API

### `app/api/auth/login/route.ts`

```ts id="s6"
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AdminUser from "@/models/AdminUser";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  await connectDB();

  const { email, password } = await req.json();

  const user = await AdminUser.findOne({ email });
  if (!user) return NextResponse.json({ error: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return NextResponse.json({ error: "Invalid password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET!
  );

  return NextResponse.json({ token });
}
```

---

# 🧑‍🏫 8. Trainer API

### `app/api/trainer/route.ts`

```ts id="s7"
import { NextResponse } from "next/server";
import Trainer from "@/models/Trainer";
import { connectDB } from "@/lib/db";

export async function GET() {
  await connectDB();
  const trainers = await Trainer.find();
  return NextResponse.json(trainers);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const trainer = await Trainer.create(body);
  return NextResponse.json(trainer);
}
```

---

# 🌐 9. Environment Variables

### `.env`

```env
MONGO_URI=mongodb://mongo:27017/trainerdb
JWT_SECRET=secret123
```

---

# 🐳 10. Docker Setup

## Dockerfile

```dockerfile id="s8"
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

---

## docker-compose.yml

```yaml id="s9"
version: "3.9"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/trainerdb
      - JWT_SECRET=secret123
    depends_on:
      - mongo

  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

---

# ▶️ 11. Run the Project

```bash
docker compose up --build
```

---

# 🔑 12. First Time Setup

👉 Open API (trigger seed manually or add call)

Then login:

```
POST http://localhost:3000/api/auth/login

{
  "email": "su@gmail.com",
  "password": "1234"
}
```

---

# 🧠 Architecture Summary

* **Next.js App Router**
* API routes = backend
* MongoDB = database
* Docker = runtime
* JWT = auth

---

# 🚀 What You Can Add Next

* Role-based access (super / admin)
* Trainer image upload (Cloudinary / S3)
* Protected routes (middleware)
* UI (React forms)
