import React, { useEffect, useContext } from "react";
import styled from "styled-components";

import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const StyledAlert = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 1rem;
  border: 8px solid ${props => props.theme.lightPrimary};
  border-radius: 8px;
  margin-bottom: 4px;
  background-color: #fff;
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

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { alert, closeAlert } = alertContext;
  const { error, hideError } = authContext;

  useEffect(() => {
    console.log("Alerts---useEffect");
    let timer = setTimeout(() => console.log("bam!"), 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (error) {
    return (
      <StyledAlert>
        <StyledTypeIcon className="fas fa-exclamation-circle"></StyledTypeIcon>
        <p>{error.msg}</p>
        <StyledCloseIcon
          onClick={hideError}
          className="far fa-times-circle"
        ></StyledCloseIcon>
      </StyledAlert>
    );
  }

  if (alert) {
    console.log("alert:", alert);
    return (
      <StyledAlert>
        {alert.type === "info" ? (
          <StyledTypeIcon className="fas fa-info-circle"></StyledTypeIcon>
        ) : (
          <StyledTypeIcon className="fas fa-exclamation-circle"></StyledTypeIcon>
        )}
        <p>{alert.msg}</p>
        <StyledCloseIcon
          onClick={closeAlert}
          className="far fa-times-circle"
        ></StyledCloseIcon>
      </StyledAlert>
    );
  }

  return null;
};

export default Alerts;
