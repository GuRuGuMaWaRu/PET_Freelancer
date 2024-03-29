import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";

import { logoutUser } from "./authSlice";

export const fetchProjects = createAsyncThunk(
  "projects/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/v1/projects`);
      const projects = res.data.data;

      const processedProjects = projects.map(project => {
        return { ...project, client: project.client.name };
      });

      return processedProjects;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchProject = createAsyncThunk(
  "project/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/v1/projects/${id}`);

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateOne",
  async (payload, { rejectWithValue }) => {
    const { id, editedFields } = payload;

    try {
      const res = await axios.patch(`/api/v1/projects/${id}`, editedFields);

      const updatedProject = res.data.data;

      const returnProject = {
        _id: updatedProject._id,
        payment: updatedProject.payment,
        currency: updatedProject.currency,
        projectNr: updatedProject.projectNr,
        client: updatedProject.client.name,
        date: updatedProject.date,
        comments: updatedProject.comments
      };

      return returnProject;
    } catch (err) {
      return rejectWithValue(err.message);
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
      return rejectWithValue(err.message);
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
      return rejectWithValue(err.message);
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
      return rejectWithValue(err.message);
    }
  }
);

export const projectsAdapter = createEntityAdapter({
  selectId: project => project._id,
  sortComparer: (a, b) => new Date(b.date) - new Date(a.date)
});

const initialState = projectsAdapter.getInitialState({
  projectsLoading: true,
  projectLoading: false,
  selectedId: null,
  selectedProject: null
});

export const slice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setSelectedId(state, action) {
      state.selectedId = action.payload;
    },
    closeModal(state, _) {
      state.selectedId = null;
    },
    clearSelectedProject(state, _) {
      state.selectedProject = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchProjects.pending, (state, _) => {
      state.projectsLoading = true;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      projectsAdapter.addMany(state, action.payload);
      state.projectsLoading = false;
    });
    builder.addCase(fetchProject.pending, (state, _) => {
      state.projectLoading = true;
    });
    builder.addCase(fetchProject.fulfilled, (state, action) => {
      state.selectedProject = action.payload;
      state.projectLoading = false;
    });
    builder.addCase(updateProject.fulfilled, (state, action) => {
      const { _id, ...updatedProject } = action.payload;

      projectsAdapter.updateOne(state, {
        id: _id,
        changes: updatedProject
      });
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      projectsAdapter.addOne(state, action.payload);
    });
    builder.addCase(togglePaid.fulfilled, (state, action) => {
      const { id, paidStatus } = action.payload;

      projectsAdapter.updateOne(state, {
        id,
        changes: { paid: !paidStatus }
      });
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
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
  clearSelectedProject
} = slice.actions;

export const { selectAll: selectAllProjects } = projectsAdapter.getSelectors(
  state => state.projects
);

export default slice.reducer;
