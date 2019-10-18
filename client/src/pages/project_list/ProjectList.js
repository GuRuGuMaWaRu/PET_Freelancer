import React from "react";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";

const StyledProject = styled.div`
  margin-bottom: 1rem;
`;

const ProjectList = () => {
  const [projects, setProjects] = React.useState(null);

  React.useEffect(() => {
    const getProjects = async () => {
      const { data: projects } = await axios.get("/projects");
      setProjects(projects);
    };

    getProjects();
  }, []);

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
