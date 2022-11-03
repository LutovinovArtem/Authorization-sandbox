import { createAction, createReducer } from "@reduxjs/toolkit";

// ?
// import { deleteBook, getBooks, getGenres } from "../../API/instanceBook";
// ?

const initialState = {
  author: {},
  genres: [],
  id: 0,
  key: 0,
  rub_price: 0,
  title: "",
};

export const tryDeleteBook = createAction("DELETE_BOOK");

export default createReducer(initialState, {
  [tryDeleteBook]: function(state, id) {

  },
});
