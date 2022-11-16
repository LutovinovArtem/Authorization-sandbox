import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./bookSlice";
import messageReducer from "./alertSlice"

export default configureStore({
  reducer: {
    books: booksReducer,
    message: messageReducer,
  },
});
