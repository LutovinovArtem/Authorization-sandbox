import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGenres as getGenresAPI } from "../API/instanceBook";

export const getGenres = createAsyncThunk(
  "genres/getGenres",
  async (_, { rejectWithValue }) => {
    try {
      const genres = await getGenresAPI();

      if (genres.status !== 201) {
        throw new Error("Error");
      }

      return genres;
    } catch (error) {
      return rejectWithValue(`getBooks - ${error.message}`);
    }
  }
);

const setError = (state, { payload }) => {
    state.status = "rejected";
    state.isLoading = false;
    state.error = payload;
  };

const genresSlice = createSlice({
  name: "genres",
  initialState: {
    genres: [],
  },
  extraReducers: {
    [getGenres.pending]: (state) => {
      state.error = null;
    },
    [getGenres.fulfilled]: (state, { payload }) => {
      state.genres = payload;
    },
    [getGenres.rejected]: setError,
  },
});

export default genresSlice.reducer;
