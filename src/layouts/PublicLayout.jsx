import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center">
      <div className="container-fluid">
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
