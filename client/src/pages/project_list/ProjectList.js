import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import moment from "moment";

const StyledProject = styled.div`
  margin-bottom: 1rem;
`;

const ProjectList = ({ projects }) => {
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

ProjectList.propTypes = {
  projects: PropTypes.array
};

export default ProjectList;
