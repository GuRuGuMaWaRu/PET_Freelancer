import React, { useReducer } from "react";
import ProjectContext from "./projectContext";
import projectReducer from "./projectReducer";

const ProjectState = props => {
  const initialState = {
    projects: [],
    current: null
  };

  const [state, dispatch] = useReducer(projectReducer, initialState);

  return (
    <ProjectContext.Provider
      value={{ projects: state.projects, current: state.projects }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
