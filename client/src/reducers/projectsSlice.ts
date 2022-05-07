import type { PayloadAction } from '@reduxjs/toolkit';
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";
import { getErrorMessage } from '../utils/getErrorMessage';

import { logoutUser } from "./authSlice";

export interface IProject {
  _id: string;
  payment: number;
  currency: string;
  paid: boolean;
  date: string;
  client: { _id: string, name: string };
  projectNr: string;
  comments: string;
}

interface IState {
  projectsLoading: boolean;
  selectedId: string | null;
}

export const projectsAdapter = createEntityAdapter<IProject>({
  selectId: project => project._id,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = projectsAdapter.getInitialState<IState>({
  projectsLoading: true,
  selectedId: null,
});

export const fetchProjects = createAsyncThunk(
  "projects/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<{ status: string, results: number, data: IProject[] }>(`/api/v1/projects`);

      return res.data.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateOne",
  async (payload, { rejectWithValue }) => {
    const { id, editedFields } = payload;

    try {
      const res = await axios.patch(`/api/v1/projects/${id}`, editedFields);

      return res.data.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createOne",
  async (data, { rejectWithValue }) => {
    const { newProject, clientName } = data;
    
    try {
      const res = await axios.post("/api/v1/projects", newProject);

      const createdProject = res.data.data;

      const returnProject = {
        _id: createdProject._id,
        payment: createdProject.payment,
        currency: createdProject.currency,
        projectNr: createdProject.projectNr,
        client: clientName,
        date: createdProject.date,
        comments: createdProject.comments
      };

      return returnProject;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteOne",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/v1/projects/${id}`);

      return id;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const togglePaid = createAsyncThunk(
  "projects/togglePaid",
  async (params, { rejectWithValue }) => {
    try {
      const { id, paidStatus } = params;

      await axios.patch(`/api/v1/projects/${id}`, {
        paid: !paidStatus
      });

      return { id, paidStatus };
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setSelectedId(state, action: PayloadAction<string>) {
      state.selectedId = action.payload;
    },
    closeModal(state) {
      state.selectedId = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProjects.pending, (state, _) => {
      state.projectsLoading = true;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action: PayloadAction<IProject[]>) => {
      projectsAdapter.addMany(state, action.payload);
      state.projectsLoading = false;
    });
    builder.addCase(updateProject.fulfilled, (state, action: PayloadAction<IProject>) => {
      const { _id, ...updatedProject } = action.payload;

      projectsAdapter.updateOne(state, {
        id: _id,
        changes: updatedProject
      });
    });
    builder.addCase(createProject.fulfilled, (state, action: PayloadAction<IProject>) => {
      projectsAdapter.addOne(state, action.payload);
    });
    builder.addCase(togglePaid.fulfilled, (state, action) => {
      const { id, paidStatus } = action.payload;

      projectsAdapter.updateOne(state, {
        id,
        changes: { paid: !paidStatus }
      });
    });
    builder.addCase(deleteProject.fulfilled, (state, action: PayloadAction<string>) => {
      projectsAdapter.removeOne(state, action.payload);
      state.selectedId = null;
    });
    builder.addCase(logoutUser, state => {
      projectsAdapter.removeAll(state);
    });
  }
});

export const {
  setSelectedId,
  closeModal,
} = projectsSlice.actions;

export const { 
  selectAll: selectAllProjects,
  selectById: selectProjectById
} = projectsAdapter.getSelectors(
  state => state.projects
);

export default projectsSlice.reducer;
