import React, { Fragment, useEffect, useContext } from "react";

import Spinner from "../layout/Spinner";
import Project from "./Project";
import ProjectContext from "../../context/project/projectContext";
import setAuthToken from "../../utils/setAuthToken";

import { StyledNoProjectsMsg } from "../styles/project.styles";

const ProjectList = () => {
  const projectContext = useContext(ProjectContext);
  const {
    projects,
    loadingProjects,
    getProjects,
    setDelete,
    togglePaid
  } = projectContext;

  useEffect(() => {
    console.log("---ProjectList: useEffect");
    if (loadingProjects) {
      console.log("---ProjectList: useEffect: loadingProjects");
      setAuthToken(localStorage.getItem("freelancer_token"));
      getProjects();
    }
    // eslint-disable-next-line
  }, []);

  console.log("---ProjectList: rendering...");
  // console.log("---ProjectList, loadingProjects:", loadingProjects);
  // console.log("---ProjectList, projects:", projects);
  if (loadingProjects) {
    return <Spinner />;
  }

  if (!projects || projects.length === 0) {
    return (
      <StyledNoProjectsMsg>
        There are no projects, please add one.
      </StyledNoProjectsMsg>
    );
  }
  return (
    projects && (
      <Fragment>
        {projects.map(project => (
          <Project
            key={project._id}
            project={project}
            handleDelete={() => setDelete(project._id)}
            handlePayment={() => togglePaid(project._id)}
          />
        ))}
      </Fragment>
    )
  );
};

export default ProjectList;
