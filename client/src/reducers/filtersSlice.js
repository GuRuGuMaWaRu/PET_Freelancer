import { createSlice } from "@reduxjs/toolkit";

import { fetchClients, createClient } from "./clientsSlice";
import { logoutUser } from "./authSlice";

const cancelCategory = category => {
  category.forEach(filter => (filter.selected = false));
};

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
    },
    cancelAllFilters(state) {
      state.paid.forEach(filter => {
        filter.selected = false;
      });
      state.currency.forEach(filter => {
        filter.selected = false;
      });
      state.client.forEach(filter => {
        filter.selected = false;
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
    builder.addCase(logoutUser, state => {
      state.client = [];
    });
  }
});

export const { toggleFilter, cancelAllFilters } = slice.actions;

export default slice.reducer;
