import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorComponent = () => {
  const error = useRouteError();

  const status = isRouteErrorResponse(error) ? error.status : 500;
  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error?.message || "Something went wrong.";

  return (
    <div className="min-vh-100 d-flex align-items-center">
      <div className="container text-center">
        <h1 className="display-5 fw-bold mb-3">Oops!</h1>
        <p className="text-muted mb-1">Status: {status}</p>
        <p className="lead">{message}</p>
      </div>
    </div>
  );
};

export default ErrorComponent;
