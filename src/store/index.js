import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./bookSlice";
import loaderReducer from "./loaderSlice";
import messageReducer from "./alertSlice"

export default configureStore({
  reducer: {
    books: booksReducer,
    loader: loaderReducer,
    message: messageReducer,
  },
});
