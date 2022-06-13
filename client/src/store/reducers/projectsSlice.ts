import axios from "axios";
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk
} from "@reduxjs/toolkit";

import type { IProject, IReturnProject, IFormProject } from "../../models/IProject";
import { getErrorMessage } from '../../utils/getErrorMessage';
import { logoutUser } from "./authSlice";
import { RootState } from '../store';

interface IState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

interface FetchProjectsResponse {
  status: string;
  results: number;
  data: IProject[];
}
interface UpdateProjectResponse {
  status: string;
  data: IProject;
}
interface CreateProjectResponse {
  status: string;
  data: IReturnProject;
}

export const projectsAdapter = createEntityAdapter<IProject>({
  selectId: project => project._id,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = projectsAdapter.getInitialState<IState>({
  status: 'idle',
});

export const fetchProjects = createAsyncThunk<
  IProject[], // Return type
  undefined, // Arguments
  { rejectValue: string } // Extra arguments
>(
  "projects/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<FetchProjectsResponse>(`/api/v1/projects`);

      return res.data.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const updateProject = createAsyncThunk<
  IProject, // Return type
  { id: string & Partial<IProject> }, // Arguments
  { rejectValue: string } // Extra arguments
>(
  "projects/updateOne",
  async (payload, { rejectWithValue }) => {
    const { id, ...editedFields } = payload;

    try {
      const res = await axios.patch<UpdateProjectResponse>(`/api/v1/projects/${id}`, editedFields);
      console.log(res.data.data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const createProject = createAsyncThunk<
  IProject, 
  { newProject: IFormProject, clientName: string },
  { rejectValue: string }
  >("projects/createOne",
  async (data, { rejectWithValue }) => {
    const { newProject, clientName } = data;
    
    try {
      const res = await axios.post<CreateProjectResponse>("/api/v1/projects", newProject);

      const createdProject = res.data.data;
      console.log(createdProject)
      const returnProject: IProject = {
        _id: createdProject._id,
        payment: createdProject.payment,
        currency: createdProject.currency,
        projectNr: createdProject.projectNr,
        client: { _id: createdProject.client, name: clientName },
        date: createdProject.date,
        comments: createdProject.comments,
        paid: false,
      };

      return returnProject;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const deleteProject = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
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

export const togglePaid = createAsyncThunk<
  { id: string, paidStatus: boolean },
  { id: string, paidStatus: boolean },
  { rejectValue: string }
>(
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
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProjects.pending, (state, _) => {
      state.status = 'loading';
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.status = 'succeeded';
      projectsAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchProjects.rejected, (state) => {
      state.status = 'failed';
    })
    builder.addCase(updateProject.fulfilled, (state, action) => {
      const { _id, ...updatedProps } = action.payload;

      // const existingProject = state.entities[_id];

      // if (existingProject) {
      //   for (const prop in updatedProps) {
      //     existingProject[prop] = updatedProps[prop];
      //   }
      // }
      projectsAdapter.updateOne(state, {
        id: _id,
        changes: updatedProps
      });
    });
    builder.addCase(createProject.fulfilled, projectsAdapter.addOne);
    builder.addCase(togglePaid.fulfilled, (state, action) => {
      const { id, paidStatus } = action.payload;

      const existingProject = state.entities[id];

      if (existingProject) {
        existingProject.paid = !paidStatus;
      }
      // projectsAdapter.updateOne(state, {
      //   id,
      //   changes: { paid: !paidStatus }
      // });
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      projectsAdapter.removeOne(state, action.payload);
    });
    builder.addCase(logoutUser, state => {
      projectsAdapter.removeAll(state);
      state.status = 'idle';
    });
  }
});

export const { 
  selectAll: selectAllProjects,
  selectById: selectProjectById,
  selectIds: selectProjectIds,
} = projectsAdapter.getSelectors<RootState>(
  state => state.projects
);

export default projectsSlice.reducer;
