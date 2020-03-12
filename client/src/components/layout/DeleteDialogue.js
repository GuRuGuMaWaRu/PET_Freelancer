import React, { useContext } from "react";
import styled from "styled-components";

import ProjectContext from "../../context/project/projectContext";
import AlertContext from "../../context/alert/alertContext";

const StyledDialogue = styled.div`
  position: relative;
  padding: 2rem 3rem;
  background-color: ${props => props.theme.container};
  z-index: 100;
`;
const StyledHeading = styled.h2`
  margin-top: 0;
`;
const StyledActions = styled.div`
  display: flex;
  justify-content: space-around;
`;
const StyledButton = styled.button`
  display: block;
  padding: 0.6rem 1.5rem;
  margin: 2rem auto 0;
  border: none;
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.accent};
  cursor: pointer;
  transition: 0.2s color;
  &:hover {
    color: ${props => props.theme.lightPrimary};
  }
`;
const StyledYesButton = styled(StyledButton)`
  background-color: ${props => props.theme.primary};
`;

const DeleteDialogue = () => {
  const handlePropagation = e => {
    e.stopPropagation();
  };

  const projectContext = useContext(ProjectContext);
  const alertContext = useContext(AlertContext);

  const { deleteId, deleteProject, closeModal } = projectContext;
  const { addAlert } = alertContext;

  const handleDelete = async () => {
    deleteProject(deleteId);
    addAlert({
      msg: "Deleted a project",
      type: "info"
    });
  };

  return (
    <StyledDialogue onClick={handlePropagation}>
      <StyledHeading>Delete this project?</StyledHeading>
      <StyledActions>
        <StyledYesButton onClick={handleDelete}>Yes</StyledYesButton>
        <StyledButton onClick={closeModal}>No</StyledButton>
      </StyledActions>
    </StyledDialogue>
  );
};

export default DeleteDialogue;
