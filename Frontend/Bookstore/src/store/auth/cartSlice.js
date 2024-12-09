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
      console.log("Update Cart Payload:", action.payload);

      // Find the product in the cart
      const bookIndex = state.findIndex((item) => item._id === id);

      if (bookIndex !== -1) {
        if (quantity > 0) {
          // Update the quantity if it's greater than 0
          state[bookIndex].quantity = quantity;
        } else {
          // Remove the product if the quantity is 0
          state.splice(bookIndex, 1);
        }
      }
    },

    deleteFromCart: (state, action) => {
      const { id } = action.payload;
      return state.filter((item) => item._id !== id);
    },

    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, updateCart, deleteFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
