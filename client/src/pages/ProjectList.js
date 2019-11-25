import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import Spinner from "../layout/Spinner";

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

const ProjectList = ({
  loading,
  setLoading,
  projects,
  setProjects,
  setEditProject,
  setDeleteProject
}) => {
  useEffect(() => {
    const source = axios.CancelToken.source();

    setLoading(true);

    const getProjects = async () => {
      try {
        const { data: projects } = await axios.get("/projects", {
          cancelToken: source.token
        });
        setProjects(projects);
        setLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Error:", err.message);
        }
        setLoading(false);
      }
    };

    getProjects();

    return () => {
      source.cancel("cancelled request at ProjectList!");
    };
    // eslint-disable-next-line
  }, []);

  const handleSetEditProject = async id => {
    const data = await axios.get(`projects/${id}`);
    console.log(data);
  };

  if (loading) {
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
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  projects: PropTypes.array,
  setProjects: PropTypes.func.isRequired,
  setEditProject: PropTypes.func.isRequired,
  setDeleteProject: PropTypes.func.isRequired
};

export default ProjectList;
