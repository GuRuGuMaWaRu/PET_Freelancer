import React, { Fragment, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Spinner from "../layout/Spinner";
import Project from "./Project";
import ProjectContext from "../../context/project/projectContext";
import setAuthToken from "../../utils/setAuthToken";

const StyledNoProjectsMsg = styled.h3`
  text-align: center;
  padding-top: 2rem;
  margin-top: 0;
`;
const StyledProject = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: dotted 2px ${props => props.theme.divider};
`;
const StyledProjectDetails = styled.div`
  margin-left: 2rem;
`;
const StyledProjectControls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-self: flex-end;
`;
const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 1.4rem;
  color: ${props => props.theme.secondaryText};
  cursor: pointer;
  transition: 0.2s color;
`;
const StyledDeleteIcon = styled(StyledIcon)`
  &:hover {
    color: ${props => props.theme.darkPrimary};
  }
`;
const StyledEditIcon = styled(StyledIcon)`
  &:hover {
    color: ${props => props.theme.mediumseagreen};
  }
`;

const ProjectList = () => {
  const history = useHistory();
  const projectContext = useContext(ProjectContext);
  const {
    projects,
    loadingProjects,
    getProjects,
    setCurrent,
    setDelete
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

  const handleSetEditProject = id => {
    setCurrent(id);
    history.push("/edit");
  };

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
          />
        ))}
      </Fragment>
    )
  );
};

export default ProjectList;
