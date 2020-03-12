import React, { useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import {
  TransitionGroup,
  Transition,
  CSSTransition
} from "react-transition-group";

import AlertContext from "../../context/alert/alertContext";
// import AuthContext from "../../context/auth/authContext";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StyledAlert = styled.div`
  position: absolute;
  width: 80%;
  top: ${({ state }) => {
    switch (state) {
      case "entering":
        return "80px";
      case "entered":
        return "80px";
      case "exiting":
        return "-150px";
      case "exited":
        return "-150px";
      default:
        return "-150px";
    }
  }};
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 1rem;
  border: 8px solid ${props => props.theme.lightPrimary};
  border-radius: 8px;
  margin-bottom: 4px;
  background-color: #fff;
  transition: ${({ duration }) => `top ${duration}ms ease-in-out`};
`;
const StyledTypeIcon = styled.i`
  font-size: 2rem;
  color: ${props => props.theme.lightPrimary};
`;
const StyledCloseIcon = styled.i`
  font-size: 1.4rem;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const duration = 300;

const Alert = () => {
  const alertContext = useContext(AlertContext);
  // const authContext = useContext(AuthContext);

  const { alerts, alertShowing, removeAlert } = alertContext;
  // const { error, hideError } = authContext;

  return (
    <Transition in={alertShowing} timeout={duration}>
      {state => {
        //=== need to run this command only when alert is showing
        if (alertShowing) setTimeout(removeAlert, 4000);

        return (
          <StyledAlert state={state} duration={duration}>
            {alert && alert.type === "info" ? (
              <StyledTypeIcon className="fas fa-info-circle"></StyledTypeIcon>
            ) : (
              <StyledTypeIcon className="fas fa-exclamation-circle"></StyledTypeIcon>
            )}
            <p>{(alert && alert.msg) || ""}</p>
            <StyledCloseIcon
              onClick={removeAlert}
              state={state}
              duration={duration}
              className="far fa-times-circle"
            ></StyledCloseIcon>
          </StyledAlert>
        );
      }}
    </Transition>
  );
};

export default Alert;
