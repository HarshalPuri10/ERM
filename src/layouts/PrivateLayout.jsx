import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const PrivateLayout = () => {
  return (
    <div className="min-vh-100  ">
      <Navbar />
      <main className="container-fluid">
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
