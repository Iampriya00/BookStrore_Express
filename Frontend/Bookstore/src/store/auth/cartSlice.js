import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const bookToAdd = action.payload;

      // Check if the book is already in the cart
      const existingBookIndex = state.findIndex(
        (item) => item._id === bookToAdd._id // Assuming `_id` is a unique identifier
      );

      if (existingBookIndex !== -1) {
        // If the book is already in the cart, increase the quantity by 1
        state[existingBookIndex].quantity += 1;
      } else {
        // If the book is not in the cart, add it with quantity 1
        state.push(bookToAdd);
      }
    },

    updateCart: (state, action) => {
      const { id, quantity } = action.payload;

      const bookToUpdate = state.find((item) => item._id === id);

      if (bookToUpdate) {
        bookToUpdate.quantity = quantity;
      }
    },
    deleteFromCart: (state, action) => {
      const idToDelete = action.payload;
      return state.filter((item) => item._id !== idToDelete); // Remove item by _id
    },

    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, updateCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
