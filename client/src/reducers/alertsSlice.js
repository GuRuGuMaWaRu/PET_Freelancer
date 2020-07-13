import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const slice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    addAlert(state, action) {},
    removeAlert(state, action) {}
  }
});

export const { addAlert, removeAlert } = slice.actions;

export default slice.reducer;
