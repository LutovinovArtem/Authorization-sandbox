import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: []
  },
  reducers: {   
    updateBooks: (state, action) => {
      state.books.push(...action.payload);
      console.log('action: ', action.payload);
    },
  },
});

export const { updateBooks } = bookSlice.actions;

export default bookSlice.reducer;
