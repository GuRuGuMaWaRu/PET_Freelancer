import React, { useContext } from "react";
import { TransitionGroup, Transition } from "react-transition-group";

import Alert from "./Alert";
import AlertContext from "../../context/alert/alertContext";
// import AuthContext from "../../context/auth/authContext";
import { StyledAlertList } from "../styles/alert.styles";

const duration = 500;

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  // const authContext = useContext(AuthContext);

  const { alerts, removeAlert } = alertContext;
  // const { error, hideError } = authContext;
  const handleRemoveAlert = id => removeAlert(id);

  return (
    <TransitionGroup component={StyledAlertList}>
      {alerts.map(alert => (
        <Transition key={alert.id} timeout={duration}>
          {state => (
            <Alert
              alert={alert}
              state={state}
              duration={duration}
              removeAlert={handleRemoveAlert}
            />
          )}
        </Transition>
      ))}
    </TransitionGroup>
  );
};

export default Alerts;
