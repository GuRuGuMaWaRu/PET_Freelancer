import React, { useReducer } from "react";
import axios from "axios";

import ProjectContext from "./projectContext";
import projectReducer from "./projectReducer";
import { GET_PROJECTS_SUCCESS, GET_PROJECTS_FAILURE } from "../types";

const ProjectState = props => {
  const initialState = {
    projects: null,
    current: null,
    loading: true
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

  return (
    <ProjectContext.Provider
      value={{ projects: state.projects, current: state.projects, getProjects }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
