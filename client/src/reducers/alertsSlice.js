import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import uuid from "uuid";

import { createClient } from "./clientsSlice";
import { updateProject, deleteProject } from "./projectsSlice";

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
    builder.addCase(updateProject.fulfilled, (state, action) => {
      const { projectNr, client } = action.payload;
      alertsAdapter.addOne(state, {
        id: uuid(),
        type: "info",
        msg: `Updated project ${projectNr} from ${client}`
      });
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      alertsAdapter.addOne(state, {
        id: uuid(),
        type: "info",
        msg: `Deleted a project`
      });
    });
  }
});

export const { addAlert, removeAlert } = slice.actions;

export const { selectAll: selectAllAlerts } = alertsAdapter.getSelectors(
  state => state.alerts
);

export default slice.reducer;
