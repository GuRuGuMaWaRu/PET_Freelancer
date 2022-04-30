import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { closeModal, deleteProject } from "../../reducers/projectsSlice";
import {
  StyledActions,
  StyledButton,
  StyledDialogue,
  StyledHeading,
  StyledYesButton
} from "../styles/deleteDialogue.styles";

const DeleteDialogue = () => {
  const selectedId = useSelector(state => state.projects.selectedId);
  const dispatch = useDispatch();

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
