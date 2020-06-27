import { createSlice } from "@reduxjs/toolkit";

const clientsSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
    loadingClients: false,
    filterableProps: {
      paid: [
        { propName: "paid", filterName: "paid", status: true, selected: false },
        {
          propName: "paid",
          filterName: "unpaid",
          status: false,
          selected: false
        }
      ],
      currency: [
        {
          propName: "currency",
          filterName: "usd",
          status: "USD",
          selected: false
        },
        {
          propName: "currency",
          filterName: "eur",
          status: "EUR",
          selected: false
        }
      ],
      client: []
    }
  },
  reducers: {
    getClients(state, action) {},
    createClient(state, action) {},
    clearClientData(state, action) {},
    toggleFilter(state, action) {}
  }
});

export const {
  getClients,
  createClient,
  clearClientData
} = clientsSlice.actions;

export default clientsSlice.reducer;
