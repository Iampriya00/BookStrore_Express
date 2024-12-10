import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: null,
  user: {
    username: "",
    address: "",
    phone: "",
    avatar: "",
  },
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    logout: () => initialState,
  },
});

export const { logout, setAccessToken, setUser } = authSlice.actions;
export default authSlice.reducer;
