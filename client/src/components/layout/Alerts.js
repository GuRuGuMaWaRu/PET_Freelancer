import React, { Fragment, useContext } from "react";
import styled from "styled-components";

import AlertContext from "../../context/alert/alertContext";

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

  const { alerts, hideAlert } = alertContext;

  const alertList = alerts.map(alert => (
    <StyledAlert key={alert.id}>
      {alert.type === "info" ? (
        <StyledTypeIcon className="fas fa-info-circle"></StyledTypeIcon>
      ) : (
        <StyledTypeIcon className="fas fa-exclamation-circle"></StyledTypeIcon>
      )}
      <p>{alert.msg}</p>
      <StyledCloseIcon
        onClick={() => hideAlert(alert.id)}
        className="far fa-times-circle"
      ></StyledCloseIcon>
    </StyledAlert>
  ));

  return <Fragment>{alertList}</Fragment>;
};

export default Alerts;
