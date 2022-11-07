import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: []
  },
  reducers: {   
    updateBooks: (state, { payload }) => {
      // state.books.push(...payload);
      state.books = payload;
    },
  },
});

export const { updateBooks } = bookSlice.actions;

export default bookSlice.reducer;