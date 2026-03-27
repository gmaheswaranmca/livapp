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