import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  book: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    // Set selected book
    setBook: (state, action) => {
      state.book = action.payload;
    },

    // Clear selected book
    clearBook: (state) => {
      state.book = null;
    },
  },
});

export const { setBook, clearBook } = bookSlice.actions;
export default bookSlice.reducer;
