import store from "@/store";
import { setAccessToken, setUser } from "@/store/auth/authSlice";
import axios from "./axios";
import { setProduct } from "@/store/auth/productSlice";
export const loginservice = async (values) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/login",
      values
    );
    console.log(data);
    store.dispatch(setUser(data.user));
    store.dispatch(setAccessToken(data.token));
  } catch (error) {
    console.error(error);
  }
};

export const userInformation = async () => {
  try {
    const response = await axios.get("/userInformation");
    store.dispatch(setUser(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const allBooks = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/v1/allbooks");
    store.dispatch(setProduct(data.data));
    return data.data;
  } catch (error) {
    console.error("Error in allBooks service:", error);
    throw error;
  }
};
