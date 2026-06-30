import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: localStorage.getItem("token") || null, // ✅ persist token
  user: {
    username: "",
    address: "",
    phone: "",
    avatar: "",
    role: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // =====================
    // SET USER
    // =====================
    setUser: (state, action) => {
      state.user = action.payload;
    },

    // =====================
    // SET TOKEN
    // =====================
    setAccessToken: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;

      // ✅ SAVE TO LOCALSTORAGE (IMPORTANT FIX)
      localStorage.setItem("token", action.payload);
    },

    // =====================
    // LOGOUT
    // =====================
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = {
        username: "",
        address: "",
        phone: "",
        avatar: "",
        role: "",
      };

      // ✅ CLEAR LOCALSTORAGE
      localStorage.removeItem("token");
    },
  },
});

export const { logout, setAccessToken, setUser } = authSlice.actions;
export default authSlice.reducer;
