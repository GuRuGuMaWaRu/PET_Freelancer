import { createSlice } from "@reduxjs/toolkit";

import { createClient } from "./clientsSlice";
import { updateProject, createProject, deleteProject } from "./projectsSlice";

const initialState = {
  message: null,
  show: false
};

export const slice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    removeNotification(state, _) {
      state.message = null;
      state.show = false;
    }
  },
  extraReducers: builder => {
    builder.addCase(createClient.fulfilled, (state, action) => {
      state.show = true;
      state.message = {
        type: "info",
        subType: "create client",
        data: [action.payload.name]
      };
    });
    builder.addCase(updateProject.fulfilled, (state, action) => {
      const { projectNr, client } = action.payload;
      state.show = true;
      state.message = {
        type: "info",
        subType: "update project",
        data: [projectNr, client]
      };
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      const { projectNr, client } = action.payload;
      state.show = true;
      state.message = {
        type: "info",
        subType: "create project",
        data: [projectNr, client]
      };
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.show = true;
      state.message = {
        type: "info",
        subType: "delete project",
        data: []
      };
    });
  }
});

export const { removeNotification } = slice.actions;

export default slice.reducer;
