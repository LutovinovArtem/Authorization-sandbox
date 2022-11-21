import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrency as getCurrencyAPI } from "../API/instanceBook";

export const getCurrency = createAsyncThunk(
  "currency/getCurrency",
  async (_, { rejectWithValue }) => {
    try {
      const currency = await getCurrencyAPI();

      if (currency.status !== 201) {
        throw new Error("Error");
      }

      return currency;
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

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    currency: [],
  },
//   reducers: {
//     updateCurrency: (state, { payload }) => {
//       state.currency = payload;
//     },
//   },
  extraReducers: {
    [getCurrency.pending]: (state) => {
      state.error = null;
    },
    [getCurrency.fulfilled]: (state, { payload }) => {
      state.currency = payload;
    },
    [getCurrency.rejected]: setError,
  },
});

// const {  } = currencySlice.actions;

export default currencySlice.reducer;