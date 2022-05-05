import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from "@reduxjs/toolkit";

import { createClient } from "./clientsSlice";
import { updateProject, createProject, deleteProject } from "./projectsSlice";
import { getUser, loginUser, registerUser } from "./authSlice";

enum Type {
  Create = "create",
  Error = "error",
  Delete = "delete",
}

interface IState {
  message: {
    type: Type;
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
    removeNotification(state, _) {
      state.show = false;
    }
  },
  extraReducers: builder => {
    builder.addCase(createClient.fulfilled, (state, action: PayloadAction<{name: string}>) => {
      state.show = true;
      state.message = {
        type: Type.Create,
        subType: "create client",
        data: [action.payload.name]
      };
    });
    builder.addCase(updateProject.fulfilled, (state, action: PayloadAction<{projectNr: string, client: string}>) => {
      const { projectNr, client } = action.payload;

      state.show = true;
      state.message = {
        type: Type.Create,
        subType: "update project",
        data: [projectNr, client]
      };
    });
    builder.addCase(updateProject.rejected, (state) => {
      state.show = true;
      state.message = {
        type: Type.Error,
        subType: "error",
        data: "Could not update project"
      };
    });
    builder.addCase(createProject.fulfilled, (state, action: PayloadAction<{projectNr: string, client: string}>) => {
      const { projectNr, client } = action.payload;

      state.show = true;
      state.message = {
        type: Type.Create,
        subType: "create project",
        data: [projectNr, client]
      };
    });
    builder.addCase(createProject.rejected, (state) => {
      state.show = true;
      state.message = {
        type: Type.Error,
        subType: "error",
        data: "Could not create project"
      };
    });
    builder.addCase(deleteProject.fulfilled, (state) => {
      state.show = true;
      state.message = {
        type: Type.Delete,
        subType: "delete project",
        data: []
      };
    });
    builder.addCase(getUser.rejected, (state, action: PayloadAction<{message: string, status: string}>) => {
      const { message, status } = action.payload;

      
      state.show = true;
      state.message = {
        type: status,
        subType: "error",
        data: message
      };
    });
    builder.addCase(loginUser.rejected, (state, action: PayloadAction<{message: string, status: string}>) => {
      const { message, status } = action.payload;

      state.show = true;
      state.message = {
        type: status,
        subType: "error",
        data: message
      };
    });
    builder.addCase(registerUser.rejected, (state, action: PayloadAction<{message: string, status: string}>) => {
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
