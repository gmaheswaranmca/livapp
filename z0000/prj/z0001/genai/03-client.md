Great — now we connect your backend to a **real UI with authentication flow** 🔥

---

# 🚀 Phase 3 – Frontend (React + TS + Auth + Routing)

Goal:

✅ Login page
✅ JWT storage
✅ PrivateRoute
✅ Navbar system
✅ Base structure ready for Trainer module

---

# 📁 1. Final Client Structure

Inside `client/src`:

```bash
mkdir pages components services routes
touch services/api.ts services/types.ts routes/PrivateRoute.tsx
```

---

# 📄 2. services/types.ts

```ts id="3q7o8n"
export interface User {
  email: string;
  password: string;
}

export interface Trainer {
  _id?: string;
  name: string;
  skills: string[];
  photo: string;
  status: "Active" | "Inactive";
}
```

---

# 📄 3. services/api.ts

```ts id="a9n2zl"
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const loginApi = async (data: any) => {
  const res = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
};

export const getTrainers = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/trainers`, {
    headers: {
      Authorization: token || ""
    }
  });

  return res.json();
};
```

---

# 📄 4. routes/PrivateRoute.tsx

```tsx id="4u7mkg"
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;
```

---

# 📄 5. components/PublicNavbar.tsx

```tsx id="l6d6tp"
const PublicNavbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand">Trainer App</span>
      </div>
    </nav>
  );
};

export default PublicNavbar;
```

---

# 📄 6. components/PrivateNavbar.tsx

```tsx id="7g6v0c"
import { useNavigate } from "react-router-dom";

const PrivateNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">Trainer Dashboard</span>
        <button className="btn btn-light" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default PrivateNavbar;
```

---

# 📄 7. pages/login.tsx

```tsx id="6u6yys"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import { loginApi } from "../services/api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await loginApi(form);

    if (res.token) {
      localStorage.setItem("token", res.token);
      navigate("/");
    } else {
      alert("Login failed");
    }
  };

  return (
    <>
      <PublicNavbar />
      <div className="container mt-5">
        <h3>Login</h3>
        <input
          className="form-control mb-2"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
```

---

# 📄 8. pages/index.tsx (Home)

```tsx id="i5p18v"
import { useEffect, useState } from "react";
import PrivateNavbar from "../components/PrivateNavbar";
import { getTrainers } from "../services/api";

const Home = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getTrainers();
    setTrainers(data);
  };

  return (
    <>
      <PrivateNavbar />
      <div className="container mt-3">
        <h3>Trainer List</h3>
        <ul className="list-group">
          {trainers.map((t: any) => (
            <li key={t._id} className="list-group-item">
              {t.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
```

---

# 📄 9. App.tsx (Routing Core)

```tsx id="c06wzq"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

# 📄 10. main.tsx

```tsx id="g7rqqk"
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

# 📄 11. Add ENV for Client

👉 `client/.env`

```env id="28c37c"
VITE_API_URL=http://localhost:5000
```

---

# ▶️ Restart Docker

```bash
docker compose down
docker compose up --build
```

---

# 🧪 Test Flow

### 1. Open:

```id="y0u2cf"
http://localhost:5173
```

👉 You should be redirected to `/login`

---

### 2. Login

```
email: su@gmail.com
password: 1234
```

---

### 3. After login

✔ Redirect to `/`
✔ Navbar visible
✔ Trainer list (empty or data)

---

# 🧠 What You Built

✅ Full Auth Flow (JWT stored in localStorage)
✅ Route protection (PrivateRoute)
✅ API integration
✅ Clean React structure
✅ Dockerized frontend

---

# 🚀 Next Phase (Most Important)

👉 **Phase 4 – Trainer Module (Real App Features)**

We will add:

* Create Trainer (Form component reusable)
* Edit Trainer
* Delete Trainer
* Pagination
* Search
* Role-based UI control

---

👉 Say:

**"Phase 4"**

Now your app becomes a **real product** 🔥
