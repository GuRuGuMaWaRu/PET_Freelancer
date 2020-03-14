import React, { useReducer } from "react";
import axios from "axios";
import moment from "moment";

import ProjectContext from "./projectContext";
import projectReducer from "./projectReducer";
import {
  GET_PROJECTS_SUCCESS,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_SUCCESS,
  UPDATE_PROJECT_SUCCESS,
  SET_CURRENT_PROJECT_ID,
  GET_CURRENT_SUCCESS,
  CLEAR_CURRENT_PROJECT,
  SET_DELETED,
  CLOSE_MODAL,
  GET_CLIENTS_SUCCESS,
  CLEAR_PROJECT_DATA,
  ERROR
} from "../types";

const ProjectState = props => {
  const initialState = {
    projects: null,
    currentId: null,
    currentProject: null,
    deleteId: null,
    clients: null,
    loadingProjects: true,
    loadingClients: true
  };

  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Get all projects
  const getProjects = async () => {
    console.log("ProjectState --- getProjects");
    try {
      const res = await axios.get("/api/v1/projects");
      const projects = res.data.data.projects;
      const projectsByMonth = projects.reduce((final, project, i) => {
        const month = moment(project.date).month();
        if (final[month]) {
          final[month] += project.payment;
        } else {
          final[month] = project.payment;
        }
        return final;
      }, {});
      console.log(projectsByMonth);
      dispatch({ type: GET_PROJECTS_SUCCESS, payload: projects });
    } catch (err) {
      console.log("Error:", err.message);
      dispatch({ type: ERROR, payload: { msg: err.message, type: "error" } });
    }
  };

  // Create project
  const createProject = async data => {
    console.log("ProjectState --- createProject");

    // handle default 0 (zero) payment value
    if (!data.payment) {
      data.payment = 0;
    }

    try {
      const res = await axios.post("/api/v1/projects", data);
      const { newProject, newClient } = res.data.data;
      dispatch({
        type: CREATE_PROJECT_SUCCESS,
        payload: { newProject, newClient }
      });
    } catch (err) {
      console.log("Error:", err.message);
      dispatch({ type: ERROR, payload: { msg: err.message, type: "error" } });
    }
  };

  // Update project
  const updateProject = async project => {
    console.log("ProjectState --- updateProject");

    try {
      const res = await axios.patch(`/api/v1/projects/${project._id}`, project);
      const { updatedProject, newClient } = res.data.data;

      dispatch({
        type: UPDATE_PROJECT_SUCCESS,
        payload: { updatedProject, newClient }
      });
    } catch (err) {
      console.log("Error:", err.message);
      dispatch({ type: ERROR, payload: { msg: err.message, type: "error" } });
    }
  };

  // Delete project
  const deleteProject = async id => {
    console.log("ProjectState --- deleteProject");
    try {
      await axios.delete(`/api/v1/projects/${id}`);
      dispatch({ type: DELETE_PROJECT_SUCCESS, payload: id });
    } catch (err) {
      console.log("Error:", err.message);
      dispatch({ type: ERROR, payload: { msg: err.message, type: "error" } });
    }
  };

  // Set current project ID
  const setCurrent = id => {
    console.log("ProjectState --- setCurrent");
    dispatch({
      type: SET_CURRENT_PROJECT_ID,
      payload: id
    });
  };

  // Get current project
  const getCurrent = async id => {
    console.log("ProjectState --- getCurrent");
    try {
      const res = await axios.get(`/api/v1/projects/${id}`);
      const project = res.res.data.project;
      dispatch({ type: GET_CURRENT_SUCCESS, payload: project });
    } catch (err) {
      console.error("Error:", err.message);
      dispatch({ type: ERROR, payload: { msg: err.message, type: "error" } });
    }
  };

  // Clear current project
  const clearCurrent = () => {
    console.log("ProjectState --- clearCurrent");
    dispatch({ type: CLEAR_CURRENT_PROJECT });
  };

  // Set project to be deleted
  const setDelete = id => {
    console.log("ProjectState --- setDelete");
    dispatch({ type: SET_DELETED, payload: id });
  };

  // Close modal
  const closeModal = () => {
    console.log("ProjectState --- closeModal");
    dispatch({ type: CLOSE_MODAL });
  };

  // Get clients
  const getClients = async () => {
    console.log("ProjectState --- getClients");
    try {
      const res = await axios.get("/api/v1/clients");
      const clients = res.data.data.clients;
      dispatch({ type: GET_CLIENTS_SUCCESS, payload: clients });
    } catch (err) {
      console.error("Error:", err.message);
      dispatch({ type: ERROR, payload: { msg: err.message, type: "error" } });
    }
  };

  // Clear project data
  const clearProjectData = () => {
    console.log("ProjectState --- clearProjectData");
    dispatch({ type: CLEAR_PROJECT_DATA });
  };

  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        currentId: state.currentId,
        currentProject: state.currentProject,
        deleteId: state.deleteId,
        clients: state.clients,
        loadingProjects: state.loadingProjects,
        loadingClients: state.loadingClients,
        getProjects,
        createProject,
        deleteProject,
        updateProject,
        setCurrent,
        getCurrent,
        clearCurrent,
        setDelete,
        closeModal,
        getClients,
        clearProjectData
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
