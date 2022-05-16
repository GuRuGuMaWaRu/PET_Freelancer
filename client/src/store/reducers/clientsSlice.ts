import type { PayloadAction } from '@reduxjs/toolkit';
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from "@reduxjs/toolkit";
import axios from "axios";
import {getErrorMessage} from '../../utils/getErrorMessage';

import { logoutUser } from "./authSlice";

interface IClient {
  _id: string;
  name: string;
}

export const clientsAdapter = createEntityAdapter<IClient>({
  selectId: client => client._id,
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const initialState = clientsAdapter.getInitialState();

export const fetchClients = createAsyncThunk(
  "clients/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<{ status: string, results: number, data: IClient[] }>("/api/v1/clients");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const createClient = createAsyncThunk(
  "clients/createOne",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post<{status: string, data: IClient}>("/api/v1/clients", { name: data });

      return res.data.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const slice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchClients.fulfilled, clientsAdapter.setAll);
    builder.addCase(createClient.fulfilled, clientsAdapter.addOne);
    builder.addCase(logoutUser, state => {
      console.log('logging out');
      clientsAdapter.removeAll(state);
    });
  }
});

export const { selectAll: selectAllClients } = clientsAdapter.getSelectors(
  state => state.clients
);

export default slice.reducer;
