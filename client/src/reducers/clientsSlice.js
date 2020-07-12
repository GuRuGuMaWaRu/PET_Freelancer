import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchClients = createAsyncThunk("clients/fetchAll", async () => {
  const res = await axios.get("/api/v1/clients");
  return res.data.data.data;
});

export const clientsAdapter = createEntityAdapter({
  selectId: client => client._id
});

const initialState = clientsAdapter.getInitialState({ loading: false });

export const slice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchClients.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      clientsAdapter.upsertMany(state, action.payload);
      state.loading = false;
    });
  }
});

export const { selectAll: selectAllClients } = clientsAdapter.getSelectors(
  state => state.clients
);

export default slice.reducer;
