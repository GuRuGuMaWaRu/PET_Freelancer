import React, { useReducer } from "react";
import axios from "axios";

import ProjectContext from "./projectContext";
import projectReducer from "./projectReducer";
import {
  CREATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_SUCCESS,
  SET_CURRENT_PROJECT_ID,
  GET_CURRENT_SUCCESS,
  CLEAR_CURRENT_PROJECT,
  CLEAR_PROJECT_DATA,
  ERROR
} from "../types";

const ProjectState = props => {
  const initialState = {
    projects: null,
    currentProject: null,
    loadingProjects: true
  };

  const [state, dispatch] = useReducer(projectReducer, initialState);

  const createProject = async (data, client) => {
    console.log("ProjectState --- createProject");

    try {
      const projectRes = await axios.post("/api/v1/projects", data);
      console.log("ProjectState --- createProject:", projectRes);

      const newProject = projectRes.data.data.data;

      const returnProject = {
        _id: newProject._id,
        payment: newProject.payment,
        currency: newProject.currency,
        projectNr: newProject.projectNr,
        client: client,
        date: newProject.date
      };

      console.log(returnProject);
      dispatch({
        type: CREATE_PROJECT_SUCCESS,
        payload: returnProject
      });
    } catch (err) {
      console.log("Error:", err.message);
      dispatch({ type: ERROR, payload: { msg: err.message, type: "error" } });
    }
  };

  const updateProject = async project => {
    console.log("ProjectState --- updateProject");

    try {
      const res = await axios.patch(
        `/api/v1/projects/${project._id}`,
        project.editedFields
      );
      console.log("ProjectState --- updateProject:", res);

      const updatedProject = res.data.data.data;
      console.log("updatedProject:", updatedProject);

      const returnProject = {
        _id: updatedProject._id,
        payment: updatedProject.payment,
        currency: updatedProject.currency,
        projectNr: updatedProject.projectNr,
        client: { name: updatedProject.client.name },
        date: updatedProject.date
      };

      dispatch({
        type: UPDATE_PROJECT_SUCCESS,
        payload: returnProject
      });
    } catch (err) {
      console.log("Error:", err.message);
      dispatch({ type: ERROR, payload: { msg: err.message, type: "error" } });
    }
  };

  const setCurrent = id => {
    console.log("ProjectState --- setCurrent");
    dispatch({
      type: SET_CURRENT_PROJECT_ID,
      payload: id
    });
  };

  const getCurrent = async id => {
    console.log("ProjectState --- getCurrent");
    try {
      const res = await axios.get(`/api/v1/projects/${id}`);
      console.log("ProjectState --- getCurrent:", res);

      const project = res.data.data.data;
      dispatch({ type: GET_CURRENT_SUCCESS, payload: project });
    } catch (err) {
      console.error("Error:", err.message);
      dispatch({ type: ERROR, payload: { msg: err.message, type: "error" } });
    }
  };

  const clearCurrent = () => {
    console.log("ProjectState --- clearCurrent");
    dispatch({ type: CLEAR_CURRENT_PROJECT });
  };

  const clearProjectData = () => {
    console.log("ProjectState --- clearProjectData");
    dispatch({ type: CLEAR_PROJECT_DATA });
  };

  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        currentProject: state.currentProject,
        projectSummary: state.projectSummary,
        loadingProjects: state.loadingProjects,
        createProject,
        updateProject,
        setCurrent,
        getCurrent,
        clearCurrent,
        clearProjectData
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
