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

export const projectsAdapter = createEntityAdapter({
  selectId: project => project._id
});

const initialState = projectsAdapter.getInitialState({ loading: false });

export const slice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProjects.pending, (state, _) => {
      state.loading = true;
    });

    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      console.log(action.payload);
      projectsAdapter.addMany(state, action.payload);
      state.loading = false;
    });
  }
});

export const { selectAll: selectAllProjects } = projectsAdapter.getSelectors(
  state => state.projects
);

export default slice.reducer;
