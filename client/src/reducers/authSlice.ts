import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getErrorMessage } from '../utils/getErrorMessage';

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IState {
  isAuthenticated: boolean;
  currentUser: IUser | null;
  loading: boolean;
}

const initialState: IState = {
  isAuthenticated: false,
  currentUser: null,
  loading: true
};

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/v1/users/getUser");
      localStorage.setItem("freelancer_token", res.data.token);

      return res.data.data;
    } catch (err) {
      // TODO
      // rejectWithValue works as intended
      // now I need to wire it up to show Notifications with proper messages
      return rejectWithValue({
        status: 'error',
        message: getErrorMessage(err),
      });
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
      const message = getErrorMessage(err);

      if (message === "Request failed with status code 400") {
        return rejectWithValue({ 
          status: "error",
          message: "Wrong credentials",
        });
      }

      return rejectWithValue({ 
        status: "error",
        message: "Bad request",
      });
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
      const message = getErrorMessage(err);

      return rejectWithValue({ status: "error", message });
    }
  }
);

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser(state, _) {
      localStorage.setItem("freelancer_token", '');
      state.isAuthenticated = false;
      state.currentUser = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction<IUser>) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
      state.loading = false;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const { logoutUser } = slice.actions;

export default slice.reducer;
