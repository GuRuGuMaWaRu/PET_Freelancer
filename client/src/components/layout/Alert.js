import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledAlert = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 1rem;
  border: 8px solid ${props => props.theme.lightPrimary};
  border-radius: 8px;
  background-color: #fff;
  opacity: ${({ state }) => {
    switch (state) {
      case "entering":
        return 0;
      case "entered":
        return 1;
      case "exiting":
        return 0;
      case "exited":
        return 0;
      default:
        return 0;
    }
  }}
  transition: ${({ duration }) => `opacity ${duration}ms ease-in-out`};
`;
const StyledTypeIcon = styled(FontAwesomeIcon)`
  font-size: 2rem;
  color: ${props => props.theme.lightPrimary};
`;
const StyledCloseIcon = styled(FontAwesomeIcon)`
  font-size: 1.4rem;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const Alert = ({ alert, state, duration, removeAlert }) => {
  useEffect(() => {
    setTimeout(() => removeAlert(alert.id), 6000);
    // eslint-disable-next-line
  }, []);

  return (
    <StyledAlert state={state} duration={duration}>
      {alert.type === "info" ? (
        <StyledTypeIcon icon="info-circle"></StyledTypeIcon>
      ) : (
        <StyledTypeIcon icon="exclamation-circle"></StyledTypeIcon>
      )}
      <p>{alert.msg}</p>
      <StyledCloseIcon
        onClick={() => removeAlert(alert.id)}
        state={state}
        duration={duration}
        icon="times-circle"
      ></StyledCloseIcon>
    </StyledAlert>
  );
};

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
  state: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  removeAlert: PropTypes.func.isRequired
};

export default Alert;
