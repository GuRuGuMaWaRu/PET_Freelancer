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
  CLEAR_PROJECT_DATA,
  TOGGLE_PAID,
  ERROR
} from "../types";

const ProjectState = props => {
  const initialState = {
    projects: null,
    currentProject: null,
    deleteId: null,
    loadingProjects: true
  };

  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Get all projects
  const getProjects = async () => {
    console.log("ProjectState --- getProjects");
    try {
      const res = await axios.get("/api/v1/projects");
      console.log("ProjectState --- getProjects:", res);
      const projects = res.data.data.data;
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
        client: { name: client },
        date: newProject.date
      };

      dispatch({
        type: CREATE_PROJECT_SUCCESS,
        payload: returnProject
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
      console.log("ProjectState --- getCurrent:", res);

      const project = res.data.data.data;
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

  // Clear project data
  const clearProjectData = () => {
    console.log("ProjectState --- clearProjectData");
    dispatch({ type: CLEAR_PROJECT_DATA });
  };

  // Mark project as paid / unpaid
  const togglePaid = id => {
    console.log("ProjectState --- togglePaid");
    dispatch({ type: TOGGLE_PAID, payload: id });
  };

  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        currentProject: state.currentProject,
        deleteId: state.deleteId,
        loadingProjects: state.loadingProjects,
        getProjects,
        createProject,
        deleteProject,
        updateProject,
        setCurrent,
        getCurrent,
        clearCurrent,
        setDelete,
        closeModal,
        clearProjectData,
        togglePaid
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
