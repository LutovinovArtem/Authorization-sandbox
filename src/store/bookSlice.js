import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getGenres,
  getBooks as getBooksAPI,
  deleteBook as deleteBookAPI,
  postBooks,
  putBook,
} from "../API/instanceBook";

const getBooksRAW = (genres, books) => {
  return books.map((book) => ({
    key: book.id,
    ...book,
    author: book.author.Name,
    // curr => id, title
    genres: genres.reduce((acc, { id, title }) => {
      if (book.genres.includes(id)) {
        return [...acc, title];
      }
      return acc;
    }, []),
  }));
};

const checkError = (response) => {
  if (!response.status) {
    throw new Error("Error");
  }
};

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async (_, { rejectWithValue }) => {
    try {
      const genres = await getGenres().then((response) => checkError(response));
      const books = await getBooksAPI().then((response) => checkError(response));

      const booksRAW = getBooksRAW(genres, books);

      return booksRAW;
    } catch (error) {
      return rejectWithValue(`getBooks - ${error.message}`);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await deleteBookAPI(id).then((response) => checkError(response));

      dispatch(removeBook(id));
    } catch (error) {
      return rejectWithValue(`deleteBook - ${error.message}`);
    }
  }
);

export const addBook = createAsyncThunk(
  "books/addBook",
  async (value, { rejectWithValue, dispatch }) => {
    try {
      await postBooks(value).then((response) => checkError(response));

      dispatch(addedBook(value));
    } catch (error) {
      return rejectWithValue(`addBook - ${error.message}`);
    }
  }
);

export const editBook = createAsyncThunk(
  "books/editBook",
  async (value, id, { rejectWithValue, dispatch }) => {
    try {
      await putBook(value, id).then((response) => checkError(response));
      // тут вообще не уверен
      // пока так

      dispatch(replaceBook(value)); // value ?
    } catch (error) {
      return rejectWithValue(`editBook - ${error.message}`);
    }
  }
);

const setError = (state, { payload }) => {
  state.status = "rejected";
  state.error = payload;
};

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    updateBooks: (state, { payload }) => {
      state.books = payload;
    },
    removeBook: (state, { payload }) => {
      state.books = state.books.filter((book) => book.id !== payload); // было payload.id
    },
    addedBook: (state, { payload }) => {
      state.books.push(payload);
    },
    replaceBook: (state, { payload }) => {
      // Вот тут вообще не уверен
      state.books = state.books.map((book, index) => { // map ?
        if (book.id === payload.id) {
          state.books[index] = payload;
        }
      });
    },
  },
  extraReducers: {
    [getBooks.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getBooks.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.books = payload;
    },
    [getBooks.rejected]: setError,
    [deleteBook.rejected]: setError,
    [addBook.rejected]: setError,
    [editBook.rejected]: setError,
  },
});

const { updateBooks, removeBook, replaceBook, addedBook } = booksSlice.actions;

export default booksSlice.reducer;
