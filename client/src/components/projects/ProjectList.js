import React, { Fragment, useEffect, useContext } from "react";

import Spinner from "../layout/Spinner";
import Project from "./Project";
import FilterList from "./FilterList";

import ProjectContext from "../../context/project/projectContext";
import ClientContext from "../../context/client/clientContext";
import setAuthToken from "../../utils/setAuthToken";

import { StyledTotalText, StyledNoProjectsMsg } from "../styles/project.styles";

const ProjectList = () => {
  const projectContext = useContext(ProjectContext);
  const clientContext = useContext(ClientContext);
  const {
    projects,
    loadingProjects,
    getProjects,
    setDelete,
    togglePaid
  } = projectContext;
  const { loadingClients, getClients, filterableProps } = clientContext;

  useEffect(() => {
    console.log("---ProjectList: useEffect");
    if (loadingProjects) {
      console.log("---ProjectList: useEffect: loadingProjects");
      setAuthToken(localStorage.getItem("freelancer_token"));
      getProjects();
    }
    if (loadingClients) {
      getClients();
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

  //--> Filter projects -- START
  let selectedFilterableProps = {};

  Object.keys(filterableProps).forEach(property => {
    const selectedFilters = filterableProps[property].some(
      filter => filter.selected
    );

    if (selectedFilters) {
      selectedFilterableProps[property] = [...filterableProps[property]];
    }
  });

  const renderedProjects = projects.filter(project => {
    return Object.keys(selectedFilterableProps).every(property => {
      return selectedFilterableProps[property].some(filter => {
        if (filter.selected) {
          return project[property] === filter.status;
        }
        return false;
      });
    });
  });
  //--> Filter projects -- END

  return (
    projects && (
      <Fragment>
        <FilterList />
        <StyledTotalText>Selected: {renderedProjects.length}</StyledTotalText>
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
