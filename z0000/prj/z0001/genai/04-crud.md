Now we turn your app into a **real usable product** 🔥

This phase is the **core business feature** — Trainer Management with CRUD + UX.

---

# 🚀 Phase 4 – Trainer Module (Full CRUD + UI)

## 🎯 What You Will Build

✅ Create Trainer
✅ Edit Trainer
✅ Delete Trainer
✅ Search
✅ Pagination (basic)
✅ Reusable Form Component
✅ Role-based UI control

---

# 📁 1. New Files

```bash
touch src/components/TrainerForm.tsx
touch src/pages/new.tsx
touch src/pages/edit.tsx
```

---

# 📄 2. Update API (services/api.ts)

Add these:

```ts
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
```

---

# 📄 3. TrainerForm (Reusable Core)

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

      <button className="btn btn-success" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
};

export default TrainerForm;
```

---

# 📄 4. New Page

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

---

# 📄 5. Edit Page

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

---

# 📄 6. Update Home Page (IMPORTANT)

Replace your `pages/index.tsx`:

```tsx
import { useEffect, useState } from "react";
import PrivateNavbar from "../components/PrivateNavbar";
import { getTrainers, deleteTrainer } from "../services/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [trainers, setTrainers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, [search]);

  const load = async () => {
    const data = await getTrainers();
    setTrainers(
      data.filter((t: any) =>
        t.name.toLowerCase().includes(search.toLowerCase())
      )
    );
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
          <button className="btn btn-primary" onClick={() => navigate("/new")}>
            + Add
          </button>
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
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => navigate(`/edit/${t._id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => remove(t._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
```

---

# 📄 7. Update Routes (App.tsx)

```tsx
import NewTrainer from "./pages/new";
import EditTrainer from "./pages/edit";

// ADD:

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
```

---

# ▶️ Restart

```bash
docker compose down
docker compose up --build
```

---

# 🧪 Test Full Flow

### ✅ Add Trainer

### ✅ Edit Trainer

### ✅ Delete Trainer

### ✅ Search

---

# ⚠️ Known Gaps (Next Phase)

❌ Role-based UI hiding
❌ Pagination (real backend)
❌ Password encryption
❌ Audit view

---

# 🧠 What You Achieved

✔ Full CRUD system
✔ Reusable component design
✔ Navigation flow
✔ API integration complete
✔ Real-world structure

---

# 🚀 Phase 5 (Advanced + Production Level)

We will add:

* Role-based UI (agent/officer/manager)
* Pagination (backend + frontend)
* Password encryption (bcrypt)
* Audit viewer
* Last update tracking UI

---

👉 Say:

**"Phase 5"**

Now we move from **working app → professional system** 🔥
