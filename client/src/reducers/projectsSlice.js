import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjects = createAsyncThunk(
  "projects/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/v1/projects`);
      const projects = res.data.data.data;

      const processedProjects = projects.map(project => {
        return { ...project, client: project.client.name };
      });

      return processedProjects;
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

      const res = await axios.patch(`/api/v1/projects/${id}`, {
        paid: !paidStatus
      });
      return { id, paidStatus };
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

export const projectsAdapter = createEntityAdapter({
  selectId: project => project._id
});

const initialState = projectsAdapter.getInitialState({
  loading: false,
  selectedId: null
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
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchProjects.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      projectsAdapter.addMany(state, action.payload);
      state.loading = false;
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
  }
});

export const { setSelectedId, closeModal } = slice.actions;

export const { selectAll: selectAllProjects } = projectsAdapter.getSelectors(
  state => state.projects
);

export default slice.reducer;
