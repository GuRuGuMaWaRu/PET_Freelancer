import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/v1/auth");
      localStorage.setItem("freelancer_token", res.data.token);

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  loading: false
};

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUser.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload.user;
      state.loading = false;
    });
    builder.addCase(getUser.rejected, (state, _) => {
      state.loading = false;
    });
  }
});

export const {} = slice.actions;

export default slice.reducer;
