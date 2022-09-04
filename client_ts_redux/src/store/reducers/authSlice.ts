import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { IUser } from "../../types";
import { getErrorMessage, setAuthToken } from '../../utils';

enum authLoadingStatus {
  loading = 'loading',
  fulfilled = 'fulfilled',
  failed = 'failed',
}

interface IAuthState {
  user: IUser | null;
  status: authLoadingStatus;
}

const initialState: IAuthState = {
  user: null,
  status: authLoadingStatus.loading,
};

export const getUser = createAsyncThunk<
  IUser | null, // Return type
  undefined, // Arguments
  { rejectValue: string } // Extra arguments
>(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('freelancer_token');
      setAuthToken(token);
      
      if (token) {
        const res = await axios.get("/api/v1/users/getUser");
        return res.data.data;
      }

      return null;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const loginUser = createAsyncThunk<
  IUser, // Return type
  { email: string, password: string }, // Arguments
  { rejectValue: string } // Extra arguments
>(
  "auth/loginUser",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/v1/users/login", values);
      localStorage.setItem("freelancer_token", res.data.token);
      setAuthToken(res.data.token);

      return res.data.data;
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
  IUser, // Return type
  { name: string, email: string, password1: string, password2: string }, // Arguments
  { rejectValue: string } // Extra arguments
>(
  "auth/registerUser",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/v1/users/signup", values);
      localStorage.setItem("freelancer_token", res.data.token);

      return res.data.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser(state: IAuthState) {
      localStorage.setItem("freelancer_token", '');
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = authLoadingStatus.fulfilled;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.status = authLoadingStatus.failed;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = authLoadingStatus.fulfilled; // TODO: shouldn't Suspense handle this?
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.status = authLoadingStatus.failed; // TODO: shouldn't Suspense handle this?
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = authLoadingStatus.fulfilled; // TODO: shouldn't Suspense handle this?
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.status = authLoadingStatus.failed; // TODO: shouldn't Suspense handle this?
    });
  }
});

export const { logoutUser } = slice.actions;

export default slice.reducer;
