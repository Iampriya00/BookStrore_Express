import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;

      // Check if the product is already in the cart
      const existingProduct = state.find((item) => item.id === product.id);

      if (existingProduct) {
        // If the product already exists, increase its quantity
        existingProduct.quantity += 1;
      } else {
        // If it's a new product, add it to the cart with quantity 1
        state.push({ ...product, quantity: 1 });
      }
    },
    deleteProduct: (state, action) => {
      const id = action.payload;
      state = state.filter((item) => item.id !== id);
    },
    clearProduct: () => {
      state.product = [];
    },
  },
});

export const { addProduct, deleteProduct, clearProduct } = cartSlice.actions;
export default cartSlice.reducer;
