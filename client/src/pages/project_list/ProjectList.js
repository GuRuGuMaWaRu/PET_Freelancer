import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import Spinner from "../../layout/Spinner";

const StyledProject = styled.div`
  margin-bottom: 1rem;
`;

const ProjectList = () => {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const getProjects = async () => {
      const { data: projects } = await axios.get("/projects");
      setProjects(projects);
      setLoading(false);
    };

    getProjects();
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
