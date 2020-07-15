import React, { Fragment, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import Spinner from "../layout/Spinner";
import Project from "./Project";
import FilterList from "./FilterList";

import { fetchClients } from "../../reducers/clientsSlice";
import {
  fetchProjects,
  togglePaid,
  selectAllProjects
} from "../../reducers/projectsSlice";
import ProjectContext from "../../context/project/projectContext";
import setAuthToken from "../../utils/setAuthToken";
import calculateTotals from "../../utils/calculateTotals";

import { StyledTotalText, StyledNoProjectsMsg } from "../styles/project.styles";

const ProjectList = () => {
  const dispatch = useDispatch();
  const filterableProps = useSelector(state => state.filters);
  const projects = useSelector(selectAllProjects);
  const projectsLoading = useSelector(state => state.projects.loading);

  const projectContext = useContext(ProjectContext);
  const { setDelete } = projectContext;

  useEffect(() => {
    console.log("---ProjectList: useEffect");

    setAuthToken(localStorage.getItem("freelancer_token"));

    dispatch(fetchProjects());

    dispatch(fetchClients());
    // eslint-disable-next-line
  }, []);

  console.log("---ProjectList: rendering...");
  if (projectsLoading) {
    setTimeout(() => {
      return <Spinner />;
    }, 1000);
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

  const totals = calculateTotals(renderedProjects);

  return (
    projects && (
      <Fragment>
        <StyledTotalText>
          <div>
            Selected: <b>{renderedProjects.length}</b>
          </div>
          <div>
            This month: <b>${totals.thisMonth}</b>
          </div>
          <div>
            This year: <b>${totals.thisYear}</b>
          </div>
          <div>
            Last year: <b>${totals.lastYear}</b>
          </div>
          <div>
            Total: <b>${totals.superTotal}</b>
          </div>
        </StyledTotalText>
        <FilterList />
        {renderedProjects.map(project => (
          <Project
            key={project._id}
            project={project}
            handleDelete={() => setDelete(project._id)}
            handlePayment={() =>
              dispatch(
                togglePaid({ id: project._id, paidStatus: project.paid })
              )
            }
          />
        ))}
      </Fragment>
    )
  );
};

export default ProjectList;
