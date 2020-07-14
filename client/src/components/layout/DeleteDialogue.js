import React, { useContext } from "react";

import ProjectContext from "../../context/project/projectContext";

import {
  StyledActions,
  StyledButton,
  StyledDialogue,
  StyledHeading,
  StyledYesButton
} from "../styles/deleteDialogue.styles";

const DeleteDialogue = () => {
  const handlePropagation = e => {
    e.stopPropagation();
  };

  const projectContext = useContext(ProjectContext);

  const { deleteId, deleteProject, closeModal } = projectContext;

  const handleDelete = async () => {
    deleteProject(deleteId);
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
