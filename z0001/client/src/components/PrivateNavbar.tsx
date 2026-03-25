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