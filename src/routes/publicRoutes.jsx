import Login from "../features/auth/Login";
import Register from "../features/auth/Register";

const PublicRoutes = [
  { index: true, element: <Login /> },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
];

export default PublicRoutes;
