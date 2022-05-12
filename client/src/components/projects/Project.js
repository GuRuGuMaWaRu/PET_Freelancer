import React from "react";
import truncate from "lodash.truncate";

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
        Date:{" "}
        {new Date(project.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric"
        })}
        <br />
        {project.comments && `Comments: ${truncate(project.comments)}`}
      </StyledProjectDetails>
      <StyledProjectControls>
        <StyledPaymentControl
          onClick={() =>
            handlePayment({ id: project._id, paidStatus: project.paid })
          }
        >
          {project.paid ? "PAID" : "UNPAID"}
        </StyledPaymentControl>
        <StyledDeleteIcon
          onClick={() => handleDelete(project._id)}
          icon="trash-alt"
        ></StyledDeleteIcon>
        <StyledLink to={`/project/${project._id}`}>
          <StyledEditIcon icon="pen"></StyledEditIcon>
        </StyledLink>
      </StyledProjectControls>
    </StyledProject>
  );
};

export default React.memo(Project);
