import { createSelector } from "@reduxjs/toolkit";

// export const selectBook = (state) => state.books.books.find(({ id: bookID }) => bookID === id);

export const selectGenres = (state) => state.genres.genres;
export const selectCurrency = (state) => state.currency.currency;

export const selectBooks = (state) => state.books.books;
export const selectIsLoading = (state) => state.books.books;
export const selectError = (state) => state.books.books;

export const selectFromBookSlice = createSelector(
  [selectIsLoading, selectError, selectBooks],
  (isLoading, error, books) => {
    if (isLoading === true) {
      return isLoading;
    }

    if (error) {
      return error;
    }

    return books;
  }
);
