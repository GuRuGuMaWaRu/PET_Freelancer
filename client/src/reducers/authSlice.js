import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/v1/users/getUser");
      localStorage.setItem("freelancer_token", res.data.token);

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/v1/users/login", values);
      localStorage.setItem("freelancer_token", res.data.token);
    } catch (err) {
      let message = "";

      if (err.message === "Request failed with status code 400") {
        message = "Wrong credentials";
      } else {
        message = "Bad request";
      }

      return rejectWithValue({ msg: message, type: "error" });
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/v1/users/signup", values);
      localStorage.setItem("freelancer_token", res.data.token);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  loading: true
};

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser(state, _) {
      localStorage.setItem("freelancer_token", null);
      state.isAuthenticated = false;
      state.currentUser = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(getUser.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload.user;
      state.loading = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
    });
    builder.addCase(loginUser.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, _) => {
      state.isAuthenticated = true;
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
    });
    builder.addCase(registerUser.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, _) => {
      state.isAuthenticated = true;
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
    });
  }
});

export const { logoutUser } = slice.actions;

export default slice.reducer;
