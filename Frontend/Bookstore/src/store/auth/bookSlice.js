import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBook: (_state, action) => {
      return action.payload;
    },
    clearBook: () => {
      return initialState;
    },
  },
});

export const { setBook, clearBook } = bookSlice.actions;
export default bookSlice.reducer;
