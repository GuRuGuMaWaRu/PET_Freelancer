import React, { Fragment, useEffect, useContext } from "react";

import Spinner from "../layout/Spinner";
import Project from "./Project";
import FilterList from "./FilterList";

import ProjectContext from "../../context/project/projectContext";
import setAuthToken from "../../utils/setAuthToken";

import { StyledTotalText, StyledNoProjectsMsg } from "../styles/project.styles";

const ProjectList = () => {
  const projectContext = useContext(ProjectContext);
  const {
    projects,
    projectSummary,
    filters,
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

  let renderedProjects = [...projects];

  //--> Filter projects
  filters.forEach(filter => {
    if (filter.name === "unpaid" && filter.selected) {
      renderedProjects = renderedProjects.filter(project => !project.paid);
    }
    if (filter.name === "paid" && filter.selected) {
      renderedProjects = renderedProjects.filter(project => project.paid);
    }
  });

  return (
    projects && (
      <Fragment>
        <StyledTotalText>
          <div>
            Selected: <b>{renderedProjects.length}</b>
          </div>
          <div>
            This month: <b>${projectSummary.thisMonth}</b>
          </div>
          <div>
            This year: <b>${projectSummary.thisYear}</b>
          </div>
          <div>
            Last year: <b>${projectSummary.lastYear}</b>
          </div>
        </StyledTotalText>
        <FilterList />
        {renderedProjects.map(project => (
          <Project
            key={project._id}
            project={project}
            handleDelete={() => setDelete(project._id)}
            handlePayment={() => togglePaid(project._id, project.paid)}
          />
        ))}
      </Fragment>
    )
  );
};

export default ProjectList;
