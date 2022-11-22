import { createSelector } from "@reduxjs/toolkit";

export const selectGenres = (state) => state.genres.genres;
export const selectCurrency = (state) => state.currency.currency;

const selectBooksSlice = (state) => state.books;
const selectBooks = (state) => selectBooksSlice(state).books;
const selectIsLoading = (state) => selectBooksSlice(state).isLoading;
const selectError = (state) => selectBooksSlice(state).error;

export const reselectBooks = createSelector([selectBooksSlice], (books) => {
  if (books) return books;
});

export const reselectIsLoading = createSelector(
  [selectIsLoading],
  (isLoading) => {
    if (isLoading === true) return isLoading;
  }
);

export const reselectError = createSelector([selectError], (error) => {
  if (error) return error;
});













// ???
export const reselectBookById = createSelector([selectBooks], (books, id) =>
  books.find(({ id: bookID }) => bookID === id)
);