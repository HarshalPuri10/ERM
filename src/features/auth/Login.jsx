import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/api";
import styles from "./Auth.module.scss";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await authService.login(form);
      // ✅ Adjust based on your API response shape
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authWrapper}>
      <div className={`card ${styles.authCard}`}>
        <div className={styles.authCardBody}>
          {/* Logo */}
          <div className="text-center mb-4">
            <div className={`${styles.authLogo} mb-2`}>
              <i className="bi bi-layers-fill"></i>
            </div>
            <h4 className={styles.authTitle}>Welcome back</h4>
            <p className={styles.authSubtitle}>Sign in to your account</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div
              className="alert alert-danger d-flex align-items-center gap-2 py-2"
              role="alert"
            >
              <i className="bi bi-exclamation-circle-fill"></i>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email address</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-envelope text-muted"></i>
                </span>
                <input
                  type="email"
                  name="email"
                  className="form-control border-start-0"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between">
                <label className="form-label fw-semibold">Password</label>
                <Link
                  to="/forgot-password"
                  className="small text-primary text-decoration-none"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-lock text-muted"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control border-start-0 border-end-0"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="input-group-text bg-light border-start-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} text-muted`}
                  ></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`btn btn-primary  w-100 ${styles.authButton}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Signing in...
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right me-2"></i>Sign In
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className={`${styles.divider} my-4`}>or</div>

          <p className="text-center text-muted small mb-0">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary fw-semibold text-decoration-none"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
