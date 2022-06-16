import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { IUser } from "../../types";
import { getErrorMessage } from '../../utils';

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

export const getUser = createAsyncThunk<
  IUser, // Return type
  undefined, // Arguments
  { rejectValue: string } // Extra arguments
>(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/v1/users/getUser");
      localStorage.setItem("freelancer_token", res.data.token);

      return res.data.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const loginUser = createAsyncThunk<
  undefined, // Return type
  { email: string, password: string }, // Arguments
  { rejectValue: string } // Extra arguments
>(
  "auth/loginUser",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/v1/users/login", values);
      localStorage.setItem("freelancer_token", res.data.token);
    } catch (err) {
      const message = getErrorMessage(err);

      if (message === "Request failed with status code 400") {
        return rejectWithValue("Wrong credentials");
      }

      return rejectWithValue("Bad request");
    }
  }
);

export const registerUser = createAsyncThunk<
  undefined, // Return type
  { name: string, email: string, password1: string, password2: string }, // Arguments
  { rejectValue: string } // Extra arguments
>(
  "auth/registerUser",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/v1/users/signup", values);
      localStorage.setItem("freelancer_token", res.data.token);
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser(state: IState) {
      localStorage.setItem("freelancer_token", '');
      state.isAuthenticated = false;
      state.currentUser = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
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
