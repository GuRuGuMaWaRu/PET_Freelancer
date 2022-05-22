import React, { Fragment, useState, useEffect, useCallback } from "react";

import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import {
  fetchProjects,
  togglePaid,
  selectAllProjects
} from "../../store/reducers/projectsSlice";
import setAuthToken from "../../utils/setAuthToken";
import calculateTotals from "../../utils/calculateTotals";
import Spinner from "../layout/Spinner";
import ProjectMemo from "./Project";
import FilterListMemo from "./FilterList";
import DeleteDialogue from "../layout/DeleteDialogue";
import { StyledModal } from "../styles/app.styles";

import { StyledTotalText, StyledNoProjectsMsg } from "../styles/project.styles";

const ProjectList = () => {
  const [modalProject, setModalProject] = useState(null);
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.filters);
  const projects = useAppSelector(selectAllProjects);
  const projectStatus = useAppSelector(state => state.projects.status);

  useEffect(() => {
    setAuthToken(localStorage.getItem("freelancer_token"));

    if (projectStatus === "idle") {
      dispatch(fetchProjects());
    }
  }, [projectStatus, dispatch]);

  const handleDelete = useCallback(
    id => {
      setModalProject(id);
    },
    [setModalProject]
  );

  const handlePayment = useCallback(
    ({ id, paidStatus }) => {
      dispatch(togglePaid({ id, paidStatus }));
    },
    [dispatch]
  );

  if (projectStatus === "loading") {
    return <Spinner />;
  }

  if (projectStatus === "idle" || !projects || projects.length === 0) {
    return (
      <StyledNoProjectsMsg>
        There are no projects, please add one.
      </StyledNoProjectsMsg>
    );
  }

  //--> Filter projects -- START
  let selectedFilters = [];

  Object.keys(filters).forEach(property => {
    const isAnySelected = filters[property].some(filter => filter.selected);

    if (isAnySelected) {
      selectedFilters.push(property);
    }
  });

  const displayedProjects = projects.filter(project => {
    return selectedFilters.every(property => {
      console.log(property);
      return filters[property].some(filter => {
        if (filter.selected) {
          if (property === "client") {
            return project[property].name === filter.status;
          }
          return project[property] === filter.status;
        }
        return false;
      });
    });
  });

  const renderedProjects = displayedProjects.map(project => {
    return (
      <ProjectMemo
        key={project._id}
        project={project}
        handleDelete={handleDelete}
        handlePayment={handlePayment}
      />
    );
  });
  //--> Filter projects -- END

  const totals = calculateTotals(displayedProjects);

  return (
    projects && (
      <Fragment>
        {modalProject && (
          <>
            <StyledModal onClick={() => setModalProject(null)}></StyledModal>
            <DeleteDialogue
              modalProject={modalProject}
              onCloseModal={() => setModalProject(null)}
            />
          </>
        )}
        <StyledTotalText>
          <div>
            Selected: <b>{displayedProjects.length}</b>
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
        <FilterListMemo />
        {renderedProjects}
      </Fragment>
    )
  );
};

export default ProjectList;
