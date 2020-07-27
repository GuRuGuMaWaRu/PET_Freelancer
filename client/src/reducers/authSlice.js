import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  loadingUser: true
};

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {}
});

export const {} = slice.actions;

export default slice.reducer;
