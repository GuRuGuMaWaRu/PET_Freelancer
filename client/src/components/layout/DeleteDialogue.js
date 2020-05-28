import React, { useContext } from "react";

import ProjectContext from "../../context/project/projectContext";
import AlertContext from "../../context/alert/alertContext";

import {
  StyledActions,
  StyledButton,
  StyledDialogue,
  StyledHeading,
  StyledYesButton
} from "../styles/deleteDialogueStyles";

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
