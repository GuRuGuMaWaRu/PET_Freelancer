import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import Spinner from "../../layout/Spinner";

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

const StyledDeleteIcon = styled.i`
  font-size: 1.2rem;
  padding: 0.5rem;
  margin-right: 2rem;
  color: ${props => props.theme.secondaryText};
  cursor: pointer;
  transition: 0.2s color;
  &:hover {
    color: ${props => props.theme.darkPrimary};
  }
`;

const ProjectList = ({ setDeleteProject }) => {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(false);

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

  if (loading) {
    return <Spinner />;
  }

  return (
    projects && (
      <div>
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
            <StyledDeleteIcon
              onClick={() => setDeleteProject(project._id)}
              className="far fa-trash-alt"
            ></StyledDeleteIcon>
          </StyledProject>
        ))}
      </div>
    )
  );
};

ProjectList.propTypes = {
  setDeleteProject: PropTypes.func.isRequired
};

export default ProjectList;
