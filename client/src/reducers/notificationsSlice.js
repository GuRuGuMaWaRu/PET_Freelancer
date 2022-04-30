import { createSlice } from "@reduxjs/toolkit";

import { createClient } from "./clientsSlice";
import { updateProject, createProject, deleteProject } from "./projectsSlice";
import { getUser, loginUser, registerUser } from "./authSlice";

const initialState = {
  message: null,
  show: false
};

export const slice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    removeNotification(state, _) {
      state.show = false;
    }
  },
  extraReducers: builder => {
    builder.addCase(createClient.fulfilled, (state, action) => {
      state.show = true;
      state.message = {
        type: "create",
        subType: "create client",
        data: [action.payload.name]
      };
    });
    builder.addCase(updateProject.fulfilled, (state, action) => {
      const { projectNr, client } = action.payload;

      state.show = true;
      state.message = {
        type: "create",
        subType: "update project",
        data: [projectNr, client]
      };
    });
    builder.addCase(updateProject.rejected, (state, action) => {
      state.show = true;
      state.message = {
        type: "error",
        subType: "error",
        data: "Could not update project"
      };
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      const { projectNr, client } = action.payload;

      state.show = true;
      state.message = {
        type: "create",
        subType: "create project",
        data: [projectNr, client]
      };
    });
    builder.addCase(createProject.rejected, (state, action) => {
      state.show = true;
      state.message = {
        type: "error",
        subType: "error",
        data: "Could not create project"
      };
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.show = true;
      state.message = {
        type: "delete",
        subType: "delete project",
        data: []
      };
    });
    builder.addCase(getUser.rejected, (state, action) => {
      const { message, status } = action.payload;

      state.show = true;
      state.message = {
        type: status,
        subType: "error",
        data: message
      };
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      const { message, status } = action.payload;

      state.show = true;
      state.message = {
        type: status,
        subType: "error",
        data: message
      };
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      const { message, status } = action.payload;

      state.show = true;
      state.message = {
        type: status,
        subType: "error",
        data: message
      };
    });
  }
});

export const { removeNotification } = slice.actions;

export default slice.reducer;
