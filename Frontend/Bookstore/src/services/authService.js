import store from "@/store";
import { logout, setAccessToken, setUser } from "@/store/auth/authSlice";
import axios from "./axios"; // Your custom axios setup instance
import nativeAxios from "axios"; // Added to fix the addNewBook crash
import { clearProduct, setProduct } from "@/store/auth/productSlice";
import { clearBook } from "@/store/auth/bookSlice";
import { clearCart } from "@/store/auth/cartSlice";

const BASE_URL = "http://localhost:3000/api/v1";

// Helper to clean up getting tokens
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const loginservice = async (values) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/login`, values);
    store.dispatch(setUser(data.user));
    store.dispatch(setAccessToken(data.token));
    localStorage.setItem("token", data.token);
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export const handleLogout = () => {
  store.dispatch(logout());
  store.dispatch(clearBook());
  store.dispatch(clearCart());
  store.dispatch(clearProduct());
  localStorage.removeItem("token");
};

export const userInformation = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/userInformation`, {
      headers: getAuthHeader(),
    });
    store.dispatch(setUser(response.data));
  } catch (error) {
    console.error("Failed to fetch user info:", error);
  }
};

export const allBooks = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/allbooks`);
    store.dispatch(setProduct(data.data)); // Double check if this should be clearBook/setBook!
    return data.data;
  } catch (error) {
    console.error("Error in allBooks service:", error);
    throw error;
  }
};

export const editUserDetails = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/updateDetails`, data, {
      headers: getAuthHeader(),
    });
    const updatedUser = response.data.user;
    store.dispatch(setUser(updatedUser));
    return updatedUser;
  } catch (error) {
    console.error("Can't Update User details:", error);
  }
};

// ==========================================
// ADD NEW BOOK SERVICE (FIXED CRASH)
// ==========================================
export const addNewBook = async (data) => {
  try {
    const token = localStorage.getItem("token");

    // 🚨 Check if token exists before making the call
    if (!token) {
      alert("Your session has expired. Please log in again.");
      return;
    }

    // Use standard axios to post
    const resp = await nativeAxios.post(`${BASE_URL}/addnewbook`, data, {
      headers: {
        // Double check your backend middleware case sensitivity: 'Authorization' or 'authorization'
        Authorization: `Bearer ${token}`,
      },
    });

    alert(resp.data.message || "Book added successfully!");
    return resp.data;
  } catch (err) {
    console.error("Add Book Service Error:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Failed to add new book.");
    throw err;
  }
};

export const getBookDetailsByID = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/view-book-details/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching book details:", error);
    throw error;
  }
};

// ==========================================
// UPDATE BOOK SERVICE
// ==========================================
export const editBookDetails = async (bookId, data) => {
  try {
    const { data: res } = await axios.put(
      `${BASE_URL}/updatebook/${bookId}`,
      data,
      {
        headers: getAuthHeader(),
      },
    );
    return res.book;
  } catch (error) {
    console.error(
      "Error updating book details:",
      error.response || error.message,
    );
    throw error;
  }
};

// ==========================================
// DELETE BOOK SERVICE
// ==========================================
export const deleteBook = async (bookId) => {
  try {
    await axios.delete(`${BASE_URL}/deletebook/${bookId}`, {
      headers: getAuthHeader(),
    });
    alert("Book deleted successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to delete the book. Please try again.");
    throw error;
  }
};

// ==========================================
// FAVOURITES SERVICES
// ==========================================
export const addFav = async (bookid) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/addtofavourite`,
      { bookid },
      { headers: getAuthHeader() },
    );
    alert("Book Added to Favorites Successfully");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchFavouriteBooks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getallfavbooks`, {
      headers: getAuthHeader(),
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const removeFromFav = async (bookid) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/deletefromFav`,
      { bookid },
      { headers: getAuthHeader() },
    );
    alert("Book Removed from Favorites Successfully");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const clearAllFromFav = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/clearAllFavourites`, null, {
      headers: getAuthHeader(),
    });
    alert("All Books Removed from Favorites Successfully");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
