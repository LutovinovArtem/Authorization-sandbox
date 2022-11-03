import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./bookSlice";


export default configureStore({
  reducer: {
    books: booksReducer,
  },
});
