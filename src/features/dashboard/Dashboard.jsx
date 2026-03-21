import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Dashboard.module.scss";

const StatCard = ({ icon, label, value, color }) => (
  <div className="col-sm-6 col-xl-3">
    <div className={`card p-3 ${styles.statCard}`}>
      <div className="d-flex align-items-center gap-3">
        <div className={`rounded-3 p-3 bg-${color} bg-opacity-10`}>
          <i className={`bi ${icon} fs-4 text-${color}`}></i>
        </div>
        <div>
          <div className="text-muted small">{label}</div>
          <div className="fw-bold fs-5">{value}</div>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="container py-4">
        {/* Welcome */}
        <div className="mb-4">
          <h4 className={`fw-bold mb-1 ${styles.welcomeTitle}`}>
            👋 Hello, {user?.name || "User"}!
          </h4>
          <p className="text-muted mb-0">Here's what's happening today.</p>
        </div>

        {/* Stat Cards */}
        <div className="row g-3 mb-4">
          <StatCard
            icon="bi-people-fill"
            label="Total Users"
            value="1,284"
            color="primary"
          />
          <StatCard
            icon="bi-bag-check-fill"
            label="Orders"
            value="348"
            color="success"
          />
          <StatCard
            icon="bi-graph-up-arrow"
            label="Revenue"
            value="₹92.4k"
            color="warning"
          />
          <StatCard
            icon="bi-bell-fill"
            label="Notifications"
            value="7"
            color="danger"
          />
        </div>

        {/* Recent Activity */}
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-header bg-white border-0 py-3 px-4">
            <h6 className="fw-bold mb-0">
              <i className="bi bi-clock-history me-2 text-primary"></i>Recent
              Activity
            </h6>
          </div>
          <div className="card-body px-4 pb-4">
            <ul className="list-group list-group-flush">
              {[
                {
                  icon: "bi-person-plus-fill",
                  text: "New user registered",
                  time: "2 min ago",
                  color: "primary",
                },
                {
                  icon: "bi-bag-fill",
                  text: "New order #1042 placed",
                  time: "15 min ago",
                  color: "success",
                },
                {
                  icon: "bi-shield-check",
                  text: "Security check passed",
                  time: "1 hr ago",
                  color: "info",
                },
                {
                  icon: "bi-arrow-up-circle",
                  text: "API deployed successfully",
                  time: "3 hrs ago",
                  color: "warning",
                },
              ].map((item, i) => (
                <li
                  key={i}
                  className="list-group-item px-0 d-flex align-items-center gap-3"
                >
                  <span
                    className={`rounded-circle p-2 bg-${item.color} bg-opacity-10`}
                  >
                    <i className={`bi ${item.icon} text-${item.color}`}></i>
                  </span>
                  <span className="flex-grow-1">{item.text}</span>
                  <small className="text-muted">{item.time}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
