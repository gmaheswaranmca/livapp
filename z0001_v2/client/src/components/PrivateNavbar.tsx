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