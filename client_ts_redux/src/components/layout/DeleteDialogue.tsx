import React from "react";

import { useAppDispatch } from "../../hooks/redux";
import { deleteProject } from "../../store/reducers/projectsSlice";
import {
  StyledActions,
  StyledButton,
  StyledHeading,
  StyledDialogue,
  StyledYesButton
} from "../styles/deleteDialogue.styles";

interface IProps {
  modalProject: string;
  onCloseModal: () => void;
}

const DeleteDialogue: React.FC<IProps> = ({ modalProject, onCloseModal }) => {
  const dispatch = useAppDispatch();

  const onDeleteProject = () => {
    dispatch(deleteProject(modalProject));
    onCloseModal();
  };

  return (
    <StyledDialogue>
      <StyledHeading>Delete this project?</StyledHeading>
      <StyledActions>
        <StyledYesButton onClick={onDeleteProject}>Yes</StyledYesButton>
        <StyledButton onClick={onCloseModal}>No</StyledButton>
      </StyledActions>
    </StyledDialogue>
  );
};

export default DeleteDialogue;
