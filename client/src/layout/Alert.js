import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledAlert = styled.div`
  text-align: center;
  padding: 1rem;
  border: 14px solid ${props => props.theme.lightPrimary};
  border-radius: 8px;
  margin-bottom: 1rem;
  background-color: #fff;
`;

const Alert = ({ message }) => {
  return <StyledAlert>{message}</StyledAlert>;
};

Alert.propTypes = {
  message: PropTypes.string.isRequired
};

export default Alert;
