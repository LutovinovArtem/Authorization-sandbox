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
    ...book,
    key: book.id,
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

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async (_, { rejectWithValue }) => {
    try {
      const genres = await getGenres(); // диспатчить
      const books = await getBooksAPI();

      if (genres.status !== 201 || books.status !== 201) {
        throw new Error("Error");
      }

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
      const response = await deleteBookAPI(id);

      if (response.status !== 204) {
        throw new Error("Error");
      }

      dispatch(removeBook(id));
    } catch (error) {
      return rejectWithValue(`deleteBook - ${error.message}`);
    }
  }
);

export const addBookAsync = createAsyncThunk(
  "books/addBookAsync",
  async (value, { rejectWithValue, dispatch }) => {
    try {
      const response = await postBooks(value);

      if (response !== 201) {
        throw new Error("Error");
      }

      dispatch(addBook(value));
    } catch (error) {
      return rejectWithValue(`addBook - ${error.message}`);
    }
  }
);

export const editBook = createAsyncThunk(
  "books/editBook",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const { value, id } = data;
      const response = await putBook(value, id);

      if (response !== 201) {
        throw new Error("Error");
      }

      dispatch(changeBook(data));
    } catch (error) {
      return rejectWithValue(`editBook - ${error.message}`);
    }
  }
);

const setError = (state, { payload }) => {
  state.status = "rejected";
  state.isLoading = false;
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
    removeBook: (state, { payload }) => {
      state.books = state.books.filter((book) => book.id !== payload);
    },
    addBook: (state, { payload }) => {
      state.books.push(payload);
    },
    changeBook: (state, { payload }) => {
      // Вот тут вообще не уверен

      state.books = state.books.forEach((book) => {
        if (book.id === payload.id) {
          book = payload.value;
        }
      });

      // state.books = state.books.map((book, index) => {
      // if (book.id === payload.id) {
      //   state.books[index] = payload;
      // }

      // const finedBook = state.books.find(({id}) => id === payload.id);
      // state.books.find(({id}) => id === payload.id) = {
      //   ...finedBook,
      //   ...payload
      // }
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
    [addBookAsync.rejected]: setError,
    [editBook.rejected]: setError,
  },
});

const { removeBook, changeBook, addBook } = booksSlice.actions;

export default booksSlice.reducer;
