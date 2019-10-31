import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledDialogue = styled.div`
  z-index: 100;
`;

const DeleteDialogue = () => {
  return (
    <StyledDialogue>
      <h1>Delete this motherfucker!</h1>
    </StyledDialogue>
  );
};

export default DeleteDialogue;
