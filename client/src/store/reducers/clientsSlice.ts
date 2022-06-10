import axios from "axios";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from "@reduxjs/toolkit";

import type { IClient } from "../../models/IClient";
import {getErrorMessage} from '../../utils/getErrorMessage';
import { logoutUser } from "./authSlice";
import { RootState } from '../store'

export const clientsAdapter = createEntityAdapter<IClient>({
  selectId: client => client._id,
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const initialState = clientsAdapter.getInitialState();

export const fetchClients = createAsyncThunk<
  IClient[], // Return type
  undefined, // Arguments
  { rejectValue: string } // Extra arguments
>(
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

export const createClient = createAsyncThunk<
  IClient, // Return type
  IClient, // Arguments
  { rejectValue: string } // Extra arguments
>(
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

export const { selectAll: selectAllClients } = clientsAdapter.getSelectors<RootState>(
  state => state.clients
);

export default slice.reducer;
