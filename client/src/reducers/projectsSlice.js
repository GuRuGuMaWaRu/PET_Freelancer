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
      return res.data.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const projectsAdapter = createEntityAdapter({ loading: false });

const initialState = projectsAdapter.getInitialState();

export const slice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProjects.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      projectsAdapter.addMany(action.payload);
      state.loading = false;
    });
  }
});

export const { selectAll: selectAllProjects } = projectsAdapter.getSelectors(
  state => state.projects
);

export default slice.reducer;
