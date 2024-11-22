import store from "@/store";
import { setAccessToken, setUser } from "@/store/auth/authSlice";
import axios from "axios";
export const loginservice = async (values) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/login",
      values
    );
    store.dispatch(setUser(data.user));
    store.dispatch(setAccessToken(data.token));
  } catch (error) {
    console.error(error);
  }
};
