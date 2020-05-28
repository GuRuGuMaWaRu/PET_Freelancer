import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import {
  StyledProject,
  StyledProjectDetails,
  StyledDeleteIcon,
  StyledLink,
  StyledEditIcon,
  StyledProjectControls
} from "../styles/project.styles";

const Project = ({ project, handleDelete }) => {
  return (
    <StyledProject>
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
          onClick={handleDelete}
          icon="trash-alt"
        ></StyledDeleteIcon>
        <StyledLink to={`/project/${project._id}`}>
          <StyledEditIcon icon="pen"></StyledEditIcon>
        </StyledLink>
      </StyledProjectControls>
    </StyledProject>
  );
};

Project.propTypes = {
  project: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default Project;
