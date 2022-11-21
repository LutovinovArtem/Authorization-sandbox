import { configureStore } from "@reduxjs/toolkit";

import booksReducer from "./bookSlice";
import genresReducer from "./genresSlice";
import currencyReducer from "./currencySlice";
// import messageReducer from "./alertSlice";

export default configureStore({
  reducer: {
    books: booksReducer,
    genres: genresReducer,
    currency: currencyReducer,
    // message: messageReducer,
  },
});
