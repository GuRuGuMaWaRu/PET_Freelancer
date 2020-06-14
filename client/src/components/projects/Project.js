import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import {
  StyledProject,
  StyledProjectDetails,
  StyledDeleteIcon,
  StyledLink,
  StyledProjectControls,
  StyledEditIcon,
  StyledPaymentControl
} from "../styles/project.styles";

const Project = ({ project, handleDelete, handlePayment }) => {
  return (
    <StyledProject paid={project.paid}>
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
        <StyledPaymentControl onClick={handlePayment}>
          {project.paid ? "PAID" : "UNPAID"}
        </StyledPaymentControl>
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
  handleDelete: PropTypes.func.isRequired,
  handlePayment: PropTypes.func.isRequired
};

export default Project;
