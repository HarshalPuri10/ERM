import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/api";
import styles from "./Auth.module.scss";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await authService.register({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      // ✅ Adjust based on your API response shape
      login(res.user, res.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = () => {
    const p = form.password;
    if (!p) return null;
    if (p.length < 6) return { label: "Weak", color: "danger", width: "33%" };
    if (p.length < 10)
      return { label: "Medium", color: "warning", width: "66%" };
    return { label: "Strong", color: "success", width: "100%" };
  };
  const strength = passwordStrength();

  return (
    <div className={styles.authWrapper}>
      <div className={`card ${styles.authCard}`}>
        <div className={styles.authCardBody}>
          {/* Logo */}
          <div className="text-center mb-4">
            <div className={`${styles.authLogo} mb-2`}>
              <i className="bi bi-layers-fill"></i>
            </div>
            <h4 className={styles.authTitle}>Create an account</h4>
            <p className={styles.authSubtitle}>Join us today, it's free!</p>
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
            {/* Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-person text-muted"></i>
                </span>
                <input
                  type="text"
                  name="name"
                  className="form-control border-start-0"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
            <div className="mb-2">
              <label className="form-label fw-semibold">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-lock text-muted"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control border-start-0 border-end-0"
                  placeholder="Min. 6 characters"
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

            {/* Password strength bar */}
            {strength && (
              <div className="mb-3">
                <div className="progress" style={{ height: "4px" }}>
                  <div
                    className={`progress-bar bg-${strength.color}`}
                    style={{
                      width: strength.width,
                      transition: "width 0.3s ease",
                    }}
                  ></div>
                </div>
                <small className={`text-${strength.color}`}>
                  {strength.label} password
                </small>
              </div>
            )}

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Confirm Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-shield-lock text-muted"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="form-control border-start-0"
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-100 ${styles.authButton}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Creating account...
                </>
              ) : (
                <>
                  <i className="bi bi-person-plus me-2"></i>Create Account
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className={`${styles.divider} my-4`}>or</div>

          <p className="text-center text-muted small mb-0">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary fw-semibold text-decoration-none"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
