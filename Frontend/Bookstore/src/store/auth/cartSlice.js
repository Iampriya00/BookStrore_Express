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
        (item) => item._id === bookToAdd._id // Assuming `id` is a unique identifier
      );

      if (existingBookIndex !== -1) {
        // If the book is already in the cart, increase the quantity
        state[existingBookIndex].quantity += bookToAdd.quantity;
      } else {
        // If the book is not in the cart, add it
        state.push(bookToAdd);
      }
    },

    clearCart: () => initialState,
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
