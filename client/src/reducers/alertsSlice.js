import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import uuid from "uuid";

import { createClient } from "./clientsSlice";

export const alertsAdapter = createEntityAdapter();

const initialState = alertsAdapter.getInitialState();

export const slice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    addAlert(state, action) {
      alertsAdapter.addOne(state, { id: uuid(), ...action.payload });
    },
    removeAlert(state, action) {
      alertsAdapter.removeOne(state, action.payload);
    }
  },
  extraReducers: builder => {
    builder.addCase(createClient.fulfilled, (state, action) => {
      alertsAdapter.addOne(state, {
        id: uuid(),
        type: "info",
        msg: `Created client: ${action.payload.name}`
      });
    });
  }
});

export const { addAlert, removeAlert } = slice.actions;

export const { selectAll: selectAllAlerts } = alertsAdapter.getSelectors(
  state => state.alerts
);

export default slice.reducer;
