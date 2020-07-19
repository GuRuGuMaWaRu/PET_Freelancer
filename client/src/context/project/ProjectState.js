import React, { useReducer } from "react";

import ProjectContext from "./projectContext";
import projectReducer from "./projectReducer";
import { SET_CURRENT_PROJECT_ID, CLEAR_PROJECT_DATA } from "../types";

const ProjectState = props => {
  const initialState = {
    currentProject: null
  };

  const [state, dispatch] = useReducer(projectReducer, initialState);

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
        setCurrent,
        clearProjectData
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
