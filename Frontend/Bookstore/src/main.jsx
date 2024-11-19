import React from "react";
import ReactDOM from "react-dom/client"; // Ensure correct import
import { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Use `BrowserRouter` correctly
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import store from "./store"; // Ensure store is imported correctly

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>
);
