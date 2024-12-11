import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (_state, action) => {
      return action.payload;
    },

    clearProduct: () => {
      return [];
    },
  },
});

export const { setProduct, clearProduct } = productSlice.actions;
export default productSlice.reducer;
