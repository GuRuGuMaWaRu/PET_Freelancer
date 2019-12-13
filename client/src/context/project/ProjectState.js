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
  GET_CURRENT_SUCCESS,
  CLEAR_CURRENT_PROJECT,
  SET_DELETED,
  CLOSE_MODAL,
  GET_CLIENTS_SUCCESS,
  ERROR
} from "../types";

const ProjectState = props => {
  const initialState = {
    projects: null,
    currentProject: null,
    deleteId: null,
    clients: null,
    loadingProjects: true,
    loadingClients: true
  };

  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Get all projects
  const getProjects = async () => {
    try {
      const { data: projects } = await axios.get("/projects");
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
    const config = {
      headers: { "Content-Type": "application/json" }
    };
    try {
      const res = await axios.post("/projects", data, config);
      dispatch({ type: CREATE_PROJECT_SUCCESS, payload: res.data });
    } catch (err) {
      console.log("Error:", err.message);
      dispatch({ type: ERROR, payload: { msg: err.message, type: "error" } });
    }
  };
  // Update project
  const updateProject = async project => {
    const config = {
      headers: { "Content-Type": "application/json" }
    };

    try {
      const { data: updatedProject } = await axios.patch(
        `/projects/${project._id}`,
        project,
        config
      );
      dispatch({ type: UPDATE_PROJECT_SUCCESS, payload: updatedProject });
    } catch (err) {
      console.log("Error:", err.message);
      dispatch({ type: ERROR, payload: { msg: err.message, type: "error" } });
    }
  };
  // Delete project
  const deleteProject = async id => {
    try {
      await axios.delete(`/projects/${id}`);
      dispatch({ type: DELETE_PROJECT_SUCCESS, payload: id });
    } catch (err) {
      console.log("Error:", err.message);
      dispatch({ type: ERROR, payload: { msg: err.message, type: "error" } });
    }
  };
  // Get current project
  const getCurrent = async id => {
    try {
      const { data: project } = await axios.get(`/projects/${id}`);
      dispatch({ type: GET_CURRENT_SUCCESS, payload: project });
    } catch (err) {
      console.error("Error:", err.message);
      dispatch({ type: ERROR, payload: { msg: err.message, type: "error" } });
    }
  };
  // Clear current project
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT_PROJECT });
  };
  // Set project to be deleted
  const setDelete = id => {
    dispatch({ type: SET_DELETED, payload: id });
  };
  // Close modal
  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };
  // Get clients
  const getClients = async () => {
    try {
      const { data: clients } = await axios.get("/clients");
      dispatch({ type: GET_CLIENTS_SUCCESS, payload: clients });
    } catch (err) {
      console.error("Error:", err.message);
      dispatch({ type: ERROR, payload: { msg: err.message, type: "error" } });
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        currentProject: state.currentProject,
        deleteId: state.deleteId,
        clients: state.clients,
        loadingProjects: state.loadingProjects,
        loadingClients: state.loadingClients,
        getProjects,
        createProject,
        deleteProject,
        updateProject,
        getCurrent,
        clearCurrent,
        setDelete,
        closeModal,
        getClients
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
