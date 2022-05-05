import React from "react";

import { useAppSelector, useAppDispatch } from "../../hooks";
import { closeModal, deleteProject } from "../../reducers/projectsSlice";
import {
  StyledActions,
  StyledButton,
  StyledHeading,
  StyledDialogue,
  StyledYesButton
} from "../styles/deleteDialogue.styles";

const DeleteDialogue = () => {
  const selectedId = useAppSelector(state => state.projects.selectedId);
  const dispatch = useAppDispatch();

  return (
    <StyledDialogue>
      <StyledHeading>Delete this project?</StyledHeading>
      <StyledActions>
        <StyledYesButton onClick={() => dispatch(deleteProject(selectedId))}>
          Yes
        </StyledYesButton>
        <StyledButton onClick={() => dispatch(closeModal())}>No</StyledButton>
      </StyledActions>
    </StyledDialogue>
  );
};

export default DeleteDialogue;
