import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { Transition } from "react-transition-group";

import AlertContext from "../../context/alert/alertContext";
// import AuthContext from "../../context/auth/authContext";

const StyledAlert = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 1rem;
  border: 8px solid ${props => props.theme.lightPrimary};
  border-radius: 8px;
  margin-bottom: 4px;
  background-color: #fff;
  opacity: ${({ state }) =>
    state === "entering" || state === "entered" ? 1 : 0};
  transition: ${({ duration }) => `opacity ${duration}ms ease-in-out`};
`;
const StyledTypeIcon = styled.i`
  font-size: 2rem;
  color: ${props => props.theme.lightPrimary};
`;
const StyledCloseIcon = styled.i`
  font-size: 1.4rem;
  cursor: pointer;
  transition: 0.2s all;
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const duration = 500;

const Alert = () => {
  const alertContext = useContext(AlertContext);
  // const authContext = useContext(AuthContext);

  const { alert, alertShowing, closeAlert } = alertContext;
  // const { error, hideError } = authContext;

  // useEffect(() => {
  //   console.log("Alert---useEffect");
  //   let timer;

  //   if (alertShowing) {
  //     timer = setTimeout(() => {
  //       // if (error) {
  //       //   hideError();
  //       // } else {
  //       //   closeAlert();
  //       // }
  //       closeAlert();
  //     }, 3000);

  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }

  //   // eslint-disable-next-line
  // }, []);

  // if (error) {
  //   return (
  //     <StyledAlert state={transitionState}>
  //       <StyledTypeIcon className="fas fa-exclamation-circle"></StyledTypeIcon>
  //       <p>{error.msg}</p>
  //       <StyledCloseIcon
  //         onClick={hideError}
  //         className="far fa-times-circle"
  //       ></StyledCloseIcon>
  //     </StyledAlert>
  //   );
  // }

  return (
    <Transition in={alertShowing} timeout={duration}>
      {state => {
        //=== need to run this command only when alert is showing
        if (alertShowing) setTimeout(closeAlert, 3000);

        return (
          <StyledAlert state={state} duration={duration}>
            {alert && alert.type === "info" ? (
              <StyledTypeIcon className="fas fa-info-circle"></StyledTypeIcon>
            ) : (
              <StyledTypeIcon className="fas fa-exclamation-circle"></StyledTypeIcon>
            )}
            <p>{(alert && alert.msg) || "Default message"}</p>
            <StyledCloseIcon
              onClick={closeAlert}
              className="far fa-times-circle"
            ></StyledCloseIcon>
          </StyledAlert>
        );
      }}
    </Transition>
  );
};

export default Alert;
