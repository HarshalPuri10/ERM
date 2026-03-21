import { createBrowserRouter } from "react-router-dom";
import { ProtectedOutlet, PublicOutlet } from "./routeGuards";
import PublicRoutes from "./publicRoutes";
import PrivateRoutes from "./privateRoutes";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import ErrorComponent from "../components/Error/ErrorComponent";

const getRoutesConfig = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <PublicOutlet />,
      errorElement: <ErrorComponent />,
      children: [
        {
          element: <PublicLayout />,
          children: PublicRoutes,
        },
      ],
    },
    {
      path: "/",
      element: <ProtectedOutlet />,
      errorElement: <ErrorComponent />,
      children: [
        {
          element: <PrivateLayout />,
          children: PrivateRoutes,
        },
      ],
    },
  ]);
};

export default getRoutesConfig;
