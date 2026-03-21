import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className={`navbar-brand ${styles.brand}`} to="/dashboard">
          <i className="bi bi-layers-fill me-2"></i>MyApp
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                <i className="bi bi-grid me-1"></i>Dashboard
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <span className="text-white-50 small">
              <i className="bi bi-person-circle me-1"></i>
              {user?.name || user?.email || "User"}
            </span>
            <button
              className="btn btn-outline-light btn-sm"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-1"></i>Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
