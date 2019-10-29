import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import Spinner from "../../layout/Spinner";

const StyledProject = styled.div`
  padding-bottom: 1rem;
  border-bottom: dotted 2px ${props => props.theme.divider};
  margin-bottom: 1rem;
  &:first-child {
    padding-top: 1rem;
  }
`;

const ProjectList = () => {
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
            Client: {project.client.name}
            <br />
            Project Nr: {project.projectNr}
            <br />
            Payment: {project.payment} {project.currency}
            <br />
            Date: {moment(project.date).format("YYYY-MM-DD")}
          </StyledProject>
        ))}
      </div>
    )
  );
};

export default ProjectList;
