import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledAlert = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 1rem;
  border: 14px solid ${props => props.theme.lightPrimary};
  border-radius: 8px;
  margin-bottom: 1rem;
  background-color: #fff;
`;

const StyledCloseIcon = styled.i`
  font-size: 1.4rem;
  cursor: pointer;
  transition: 0.2s all;
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const Alert = ({ message, hideAlert }) => {
  return (
    <StyledAlert>
      <p>{message}</p>
      <StyledCloseIcon
        onClick={hideAlert}
        className="far fa-times-circle"
      ></StyledCloseIcon>
    </StyledAlert>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  hideAlert: PropTypes.func.isRequired
};

export default Alert;
