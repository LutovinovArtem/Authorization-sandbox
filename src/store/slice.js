import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        response: ''
    },
    reducers: {
        setResponse(state, action){
            // state.response.push
        }
    },
});

export const {setResponse} = alertSlice.actions;

export default alertSlice.reducer;
