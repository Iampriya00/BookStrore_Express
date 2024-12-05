import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (_state, action) => {
      return action.payload;
    },
    // deleteProduct: (state, action) => {
    //   const id = action.payload;

    //   // Filter out the product to be removed
    //   state.product = state.product.filter((item) => item.id !== id);
    // },
    // clearProduct: (state) => {
    //   // Clear all products from the cart
    //   state.product = [];
    // },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
