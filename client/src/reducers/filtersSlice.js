import { createSlice } from "@reduxjs/toolkit";

import { fetchClients, createClient } from "./clientsSlice";

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
    builder.addCase(createClient.fulfilled, (state, action) => {
      state.client.push({
        propName: "client",
        filterName: action.payload.name,
        status: action.payload.name,
        selected: false
      });
      state.client = state.client.sort((a, b) =>
        a.filterName.localeCompare(b.filterName)
      );
    });
  }
});

export const { toggleFilter } = slice.actions;

export default slice.reducer;
