import React, { useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import {
  TransitionGroup,
  Transition,
  CSSTransition
} from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AlertContext from "../../context/alert/alertContext";
// import AuthContext from "../../context/auth/authContext";

const AlertList = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 80%;
  top: 80px;
`;
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
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const duration = 500;

const Alert = () => {
  const alertContext = useContext(AlertContext);
  // const authContext = useContext(AuthContext);

  const { alerts, removeAlert } = alertContext;
  // const { error, hideError } = authContext;

  return (
    <TransitionGroup component={AlertList}>
      {alerts.map(({ id, msg, type }) => (
        <Transition key={id} timeout={duration}>
          {state => (
            <StyledAlert state={state} duration={duration}>
              {type === "info" ? (
                <StyledTypeIcon icon="info-circle"></StyledTypeIcon>
              ) : (
                <StyledTypeIcon icon="exclamation-circle"></StyledTypeIcon>
              )}
              <p>{msg}</p>
              <StyledCloseIcon
                onClick={() => removeAlert(id)}
                state={state}
                duration={duration}
                icon="times-circle"
              ></StyledCloseIcon>
            </StyledAlert>
          )}
        </Transition>
      ))}
    </TransitionGroup>
  );

  return (
    <Transition in={alerts.length > 1} timeout={duration}>
      {state => {
        //=== need to run this command only when alert is showing
        {
          /* if (alertShowing) setTimeout(removeAlert, 4000); */
        }

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
