import store from "@/store";
import { logout, setAccessToken, setUser } from "@/store/auth/authSlice";
import axios from "./axios";
import { clearProduct, setProduct } from "@/store/auth/productSlice";
import { clearBook } from "@/store/auth/bookSlice";
import { clearCart } from "@/store/auth/cartSlice";

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

export const handleLogout = () => {
  store.dispatch(logout());
  store.dispatch(clearBook());
  store.dispatch(clearCart());
  store.dispatch(clearProduct());
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
    const { data } = await axios.get("/allbooks");
    store.dispatch(setProduct(data.data));
    return data.data;
  } catch (error) {
    console.error("Error in allBooks service:", error);
    throw error;
  }
};

export const editUserDetails = async (data) => {
  try {
    const response = await axios.post("/updateDetails", data);
    const updatedUser = response.data.user;
    store.dispatch(setUser(updatedUser));
    return updatedUser;
  } catch (error) {
    console.error("Can't Update User details:", error);
  }
};

export const addNewBook = async (data) => {
  try {
    const resp = await axios.post("/addnewbook", data);
    alert(resp.data.message);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

export const getBookDetailsByID = async (id) => {
  const { data } = await axios.get(`/view-book-details/${id}`);
  return data;
};

export const editBookDetails = async (data) => {
  try {
    const { data: res } = await axios.post("/updatebook", data);
    return res.books;
  } catch (error) {
    console.error(
      "Error updating book details:",
      error.response || error.message
    );
  }
};

export const deleteBook = async (bookId) => {
  try {
    const response = await axios.delete(`/deletebook/${bookId}`);
    console.log(response.data);
    alert("Book deleted successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to delete the book. Please try again.");
  }
};
