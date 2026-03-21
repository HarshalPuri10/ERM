import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const PrivateLayout = () => {
  return (
    <div className="min-vh-100 bg-light">
      <Navbar />
      <main className="container py-4">
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
