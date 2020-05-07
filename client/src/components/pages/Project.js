import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledProject = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: dotted 2px ${props => props.theme.divider};
`;
const StyledProjectDetails = styled.div`
  margin-left: 2rem;
`;
const StyledProjectControls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-self: flex-end;
`;
const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 1.4rem;
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
const StyledLink = styled(Link)`
  display: flex;
`;

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
