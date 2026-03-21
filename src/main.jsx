import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./styles/bootstrap-custom.scss"; //   Bootstrap CSS via SCSS (customized)
import "bootstrap-icons/font/bootstrap-icons.css"; //   Icons
import "bootstrap/dist/js/bootstrap.bundle.min.js"; //   Bootstrap JS (dropdowns, modals etc.)
import "./index.scss"; //   Your global styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
);
