import React, { Fragment, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";

import Spinner from "../layout/Spinner";
import setAuthToken from "../../utils/setAuthToken";
import ProjectContext from "../../context/project/projectContext";

const StyledProject = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: dotted 2px ${props => props.theme.divider};
  margin-bottom: 1rem;
  &:first-child {
    padding-top: 1rem;
  }
`;

const StyledProjectDetails = styled.div`
  margin-left: 2rem;
`;
const StyledProjectControls = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledIcon = styled.i`
  font-size: 1.2rem;
  padding: 0.5rem;
  margin-right: 2rem;
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

const ProjectList = ({ setEditProject, setDeleteProject }) => {
  const history = useHistory();
  const projectContext = useContext(ProjectContext);
  const { projects, getProjects } = projectContext;

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    getProjects();
  }, []);

  const handleSetEditProject = async id => {
    const res = await axios.get(`/projects/${id}`);

    setEditProject(res.data);
    history.push("/add");
  };

  if (!projects) {
    return <Spinner />;
  }

  return (
    projects && (
      <Fragment>
        {projects.map(project => (
          <StyledProject key={project._id}>
            <StyledProjectDetails>
              Client: {project.client.name}
              <br />
              Project Nr: {project.projectNr}
              <br />
              Payment: {project.payment} {project.currency}
              <br />
              Date: {moment(project.date).format("YYYY-MM-DD")}
            </StyledProjectDetails>
            <StyledProjectControls>
              <StyledDeleteIcon
                onClick={() => setDeleteProject(project._id)}
                className="far fa-trash-alt"
              ></StyledDeleteIcon>
              <StyledEditIcon
                onClick={() => handleSetEditProject(project._id)}
                className="fas fa-pencil-alt"
              ></StyledEditIcon>
            </StyledProjectControls>
          </StyledProject>
        ))}
      </Fragment>
    )
  );
};

ProjectList.propTypes = {
  setEditProject: PropTypes.func.isRequired,
  setDeleteProject: PropTypes.func.isRequired
};

export default ProjectList;
