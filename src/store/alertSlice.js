import { createSlice } from "@reduxjs/toolkit";

const alertSliсe = createSlice({
  name: "message",
  initialState: {
    message: '',
    type: ''
  },
  reducers: {   
    updateMessage: (state, { payload }) => {
      state.message = payload;
    },
    updateType: (state, { payload }) => {
      state.type = payload;
    }
  },
});

export const { updateMessage, updateType} = alertSliсe.actions;

export default alertSliсe.reducer;