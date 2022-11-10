import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    isLoading: true
  },
  reducers: {   
    updateLoader: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const { updateLoader } = loaderSlice.actions;

export default loaderSlice.reducer;