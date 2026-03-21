import axios from "axios";

// ── Base instance ──────────────────────────────────────────────
const api = axios.create({
  baseURL: "http://localhost:8080", // proxied via vite.config.js → your backend
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// ── Request interceptor: attach token ─────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response interceptor: global error handling ───────────────
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error.response?.data || error.message);
  },
);

export default api;

// ── Auth helpers ───────────────────────────────────────────────
export const authService = {
  login: (data) => api.post("/auth-service/login", data),
  register: (data) => api.post("/auth-service/register", data),
  logout: () => api.post("/auth-service/logout"),
  me: () => api.get("/auth-service/me"),
};
