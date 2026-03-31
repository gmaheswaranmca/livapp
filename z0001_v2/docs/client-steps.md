# Create Client App (Vite React Typscript - ES6) 
```bash
cd ../client
npm create vite@latest . -- --template react-ts
npm install
npm install react-router-dom
```

# client/index.html
```html
<!doctype html>
<html lang="en">
  <head>
    ...
    <!-- Bootstrap CDN -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
  </head>
  ...
</html>
```

# client/vite.config.js
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  }
})
```

# client/.env
```env
VITE_API_URL=http://localhost:5000
```

# client/src/main.tsx
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

# client/src/App.tsx
```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages";
import PrivateRoute from "./routes/PrivateRoute";
import NewTrainer from "./pages/new";
import EditTrainer from "./pages/edit";
import Audit from "./pages/audit";

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

        <Route
          path="/new"
          element={
            <PrivateRoute>
              <NewTrainer />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditTrainer />
            </PrivateRoute>
          }
        />

        <Route
          path="/audit"
          element={
            <PrivateRoute>
              <Audit />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

# client/src/services/types.ts
```ts
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

# client/src/services/api.ts
```ts
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

export const createTrainer = async (data: any) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/trainers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token || ""
    },
    body: JSON.stringify(data)
  });

  return res.json();
};

export const getTrainerById = async (id: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/trainers/${id}`, {
    headers: { Authorization: token || "" }
  });

  return res.json();
};

export const updateTrainer = async (id: string, data: any) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/trainers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token || ""
    },
    body: JSON.stringify(data)
  });

  return res.json();
};

export const deleteTrainer = async (id: string) => {
  const token = localStorage.getItem("token");

  await fetch(`${API_URL}/api/trainers/${id}`, {
    method: "DELETE",
    headers: { Authorization: token || "" }
  });
};

export const fetchAudit = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/api/audit`, {
      headers: { Authorization: token || "" }
    });

    return res.json();
  };
```

# client/src/routes/PrivateRoute.tsx
```tsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;
```

# client/src/components/PublicNavbar.tsx
```tsx
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

# client/src/components/PrivateNavbar.tsx
```tsx
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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

        <div className="d-flex gap-2">
          <Link to="/" className="btn btn-warning">
            Trainers
          </Link>

          <Link to="/audit" className="btn btn-warning">
            Audit
          </Link>

          <button className="btn btn-light" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default PrivateNavbar;
```

# client/src/components/TrainerForm.tsx
```tsx
import { useEffect, useState } from "react";
import { createTrainer, updateTrainer, getTrainerById } from "../services/api";
import { useNavigate } from "react-router-dom";

const TrainerForm = ({ mode, id }: any) => {
  const [form, setForm] = useState({
    name: "",
    skills: "",
    photo: "",
    status: "Active"
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "edit" && id) load();
  }, [id]);

  const load = async () => {
    const data = await getTrainerById(id);
    setForm({
      ...data,
      skills: data.skills.join(",")
    });
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      skills: form.skills.split(",")
    };

    if (mode === "new") {
      await createTrainer(payload);
    } else {
      await updateTrainer(id, payload);
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
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="form-control mb-2"
        placeholder="Skills (comma separated)"
        value={form.skills}
        onChange={(e) => setForm({ ...form, skills: e.target.value })}
      />

      <input
        className="form-control mb-2"
        placeholder="Photo URL"
        value={form.photo}
        onChange={(e) => setForm({ ...form, photo: e.target.value })}
      />

      <select
        className="form-control mb-2"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option>Active</option>
        <option>Inactive</option>
      </select>

      <button className="btn btn-light" onClick={() => navigate('/')}>
        Back
      </button>
      <button className="btn btn-success" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
};

export default TrainerForm;
```

# client/src/pages/login.tsx
```tsx
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
      localStorage.setItem("role", res.role);
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

# client/src/pages/index.tsx
```tsx
import { useEffect, useState } from "react";
import PrivateNavbar from "../components/PrivateNavbar";
import { getTrainers, deleteTrainer } from "../services/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [trainers, setTrainers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const role = Number(localStorage.getItem("role"));

  useEffect(() => {
    load();
  }, [search]);

  const load = async () => {
    const res = await getTrainers(page, search);
    setTrainers(res.data);
    setTotal(res.total);
  };

  const remove = async (id: string) => {
    await deleteTrainer(id);
    load();
  };

  return (
    <>
      <PrivateNavbar />

      <div className="container mt-3">
        <div className="d-flex justify-content-between">
          <h3>Trainer List</h3>
          {role >= 1 && (
            <button className="btn btn-primary" onClick={() => navigate("/new")}>
              + Add
            </button>
          )}
        </div>

        <input
          className="form-control my-2"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Skills</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {trainers.map((t: any) => (
              <tr key={t._id}>
                <td>{t.name}</td>
                <td>{t.skills.join(", ")}</td>
                <td>{t.status}</td>
                <td>
                  {role >= 2 && (
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => navigate(`/edit/${t._id}`)}
                    >
                      Edit
                    </button>
                  )}

                  {role >= 3 && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => remove(t._id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={4}>
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
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    </>
  );
};

export default Home;
```

# client/src/pages/new.tsx
```tsx
import PrivateNavbar from "../components/PrivateNavbar";
import TrainerForm from "../components/TrainerForm";

const NewTrainer = () => {
  return (
    <>
      <PrivateNavbar />
      <TrainerForm mode="new" />
    </>
  );
};

export default NewTrainer;
```

# client/src/pages/edit.tsx
```tsx
import { useParams } from "react-router-dom";
import PrivateNavbar from "../components/PrivateNavbar";
import TrainerForm from "../components/TrainerForm";

const EditTrainer = () => {
  const { id } = useParams();

  return (
    <>
      <PrivateNavbar />
      <TrainerForm mode="edit" id={id} />
    </>
  );
};

export default EditTrainer;
```

# client/src/pages/audit.tsx
```tsx
import { useEffect, useState } from "react";
import PrivateNavbar from "../components/PrivateNavbar";
import { fetchAudit } from "../services/api";

const Audit = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    load()
  }, []);

    const load = async () => {
        const queried_logs = await fetchAudit();
        setLogs(queried_logs)
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




