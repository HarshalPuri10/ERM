import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import getRoutesConfig from "./routes";

function App() {
  const router = getRoutesConfig();

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
