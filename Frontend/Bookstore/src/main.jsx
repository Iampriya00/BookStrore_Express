import React from "react";
import ReactDOM from "react-dom/client"; // Ensure correct import
import { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Use `BrowserRouter` correctly
import { Provider } from "react-redux";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import store, { persistor } from "./store"; // Ensure store is imported correctly

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </StrictMode>
);
