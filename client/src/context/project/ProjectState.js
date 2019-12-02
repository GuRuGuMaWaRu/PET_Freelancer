import React, { useReducer } from "react";
import axios from "axios";

import ProjectContext from "./projectContext";
import projectReducer from "./projectReducer";
import {
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE
} from "../types";

const ProjectState = props => {
  const initialState = {
    projects: null,
    current: null
  };

  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Get all projects
  const getProjects = async () => {
    try {
      const { data: projects } = await axios.get("/projects");
      dispatch({ type: GET_PROJECTS_SUCCESS, payload: projects });
    } catch (err) {
      console.log("Error:", err.message);
      dispatch({ type: GET_PROJECTS_FAILURE, payload: err.message });
    }
  };

  // Create project
  const createProject = async data => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/projects", data, config);
      dispatch({ type: CREATE_PROJECT_SUCCESS, payload: res.data });
    } catch (err) {
      console.log("Error:", err.message);
      dispatch({ type: CREATE_PROJECT_FAILURE, payload: err.message });
    }
  };

  // Delete project
  const deleteProject = async id => {
    try {
      await axios.delete(`/projects/${id}`);
      dispatch({ type: DELETE_PROJECT_SUCCESS, payload: id });
    } catch (err) {
      console.log("Error:", err.message);
      dispatch({ type: DELETE_PROJECT_FAILURE, payload: err.message });
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        current: state.current,
        getProjects,
        createProject,
        deleteProject
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
