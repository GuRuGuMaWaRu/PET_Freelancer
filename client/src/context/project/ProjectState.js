import React, { useReducer } from "react";
import axios from "axios";

import ProjectContext from "./projectContext";
import projectReducer from "./projectReducer";
import {
  CREATE_PROJECT_SUCCESS,
  SET_CURRENT_PROJECT_ID,
  CLEAR_PROJECT_DATA,
  ERROR
} from "../types";

const ProjectState = props => {
  const initialState = {
    currentProject: null
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

  const setCurrent = id => {
    console.log("ProjectState --- setCurrent");
    dispatch({
      type: SET_CURRENT_PROJECT_ID,
      payload: id
    });
  };

  const clearProjectData = () => {
    console.log("ProjectState --- clearProjectData");
    dispatch({ type: CLEAR_PROJECT_DATA });
  };

  return (
    <ProjectContext.Provider
      value={{
        projectSummary: state.projectSummary,
        createProject,
        setCurrent,
        clearProjectData
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
