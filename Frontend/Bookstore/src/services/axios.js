import store from "@/store";
import { logout } from "@/store/auth/authSlice";
import _axios from "axios";
import { handleLogout } from "./authService";

const baseURL = "http://localhost:3000/api/v1";

const axios = _axios.create({
  baseURL,
});

axios.interceptors.request.use((config) => {
  const { token } = store.getState().auth;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`; // Set Authorization header
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response) {
      const errorObject = response.data;

      // Handle unauthorized error
      if (response.status === 401) {
        handleLogout();
        // Redirect using window.location
        window.location.href = "/";
      }
      throw errorObject; // Rethrow error for further handling
    }
    throw error; // Rethrow error if no response object
  }
);

export default axios;
