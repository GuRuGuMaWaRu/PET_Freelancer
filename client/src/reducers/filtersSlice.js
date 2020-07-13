import { createSlice } from "@reduxjs/toolkit";

import { fetchClients } from "./clientsSlice";

const initialState = {
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
};

export const slice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleFilter(state, action) {
      const { filterName, propName } = action.payload;
      state[propName].forEach(filter => {
        if (filter.filterName === filterName) {
          filter.selected = !filter.selected;
        }
      });
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.client = action.payload.map(client => ({
        propName: "client",
        filterName: client.name,
        status: client.name,
        selected: false
      }));
    });
  }
});

export const { toggleFilter } = slice.actions;

export default slice.reducer;
