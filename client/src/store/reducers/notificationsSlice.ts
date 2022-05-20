import { createSlice } from "@reduxjs/toolkit";

import { createClient } from "./clientsSlice";
import { updateProject, createProject, deleteProject } from "./projectsSlice";
import { getUser, loginUser, registerUser } from "./authSlice";

enum NotificationType {
  Create = "create",
  Error = "error",
  Delete = "delete"
}

interface IState {
  message: {
    type: NotificationType;
    subType: string;
    data: string | string[];
  } | null;
  show: boolean;
}

const initialState: IState = {
  message: null,
  show: false
};

export const slice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    removeNotification(state: IState) {
      state.show = false;
    }
  },
  extraReducers: builder => {
    builder.addCase(createClient.fulfilled, (state, action) => {
      state.show = true;
      state.message = {
        type: NotificationType.Create,
        subType: "create client",
        data: [action.payload.name]
      };
    });
    builder.addCase(updateProject.fulfilled, (state, action) => {
      const { projectNr, client } = action.payload;

      state.show = true;
      state.message = {
        type: NotificationType.Create,
        subType: "update project",
        data: [projectNr, client.name]
      };
    });
    builder.addCase(updateProject.rejected, state => {
      state.show = true;
      state.message = {
        type: NotificationType.Error,
        subType: "error",
        data: "Could not update project"
      };
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      const {
        projectNr,
        client: { name: clientName }
      } = action.payload;

      state.show = true;
      state.message = {
        type: NotificationType.Create,
        subType: "create project",
        data: [projectNr, clientName]
      };
    });
    builder.addCase(createProject.rejected, state => {
      state.show = true;
      state.message = {
        type: NotificationType.Error,
        subType: "error",
        data: "Could not create project"
      };
    });
    builder.addCase(deleteProject.fulfilled, state => {
      state.show = true;
      state.message = {
        type: NotificationType.Delete,
        subType: "delete project",
        data: []
      };
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.show = true;
      state.message = {
        type: NotificationType.Error,
        subType: "error",
        data: action.payload || "Could not get user"
      };
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.show = true;
      state.message = {
        type: NotificationType.Error,
        subType: "error",
        data: action.payload || "Could not login"
      };
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.show = true;
      state.message = {
        type: NotificationType.Error,
        subType: "error",
        data: action.payload || "Could not register"
      };
    });
  }
});

export const { removeNotification } = slice.actions;

export default slice.reducer;
