import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TransitionGroup, Transition } from "react-transition-group";

import Alert from "./Alert";
// import AlertContext from "../../context/alert/alertContext";
import { removeAlert, selectAllAlerts } from "../../reducers/alertsSlice";
// import AuthContext from "../../context/auth/authContext";
import { StyledAlertList } from "../styles/alert.styles";

const duration = 500;

const Alerts = () => {
  const alerts = useSelector(selectAllAlerts);
  const dispatch = useDispatch();
  // const alertContext = useContext(AlertContext);
  // const authContext = useContext(AuthContext);

  // const { alerts, removeAlert } = alertContext;
  // const { error, hideError } = authContext;
  // const handleRemoveAlert = id => dispatch(removeAlert(id));

  return (
    <TransitionGroup component={StyledAlertList}>
      {alerts.map(alert => (
        <Transition key={alert.id} timeout={duration}>
          {state => (
            <Alert
              alert={alert}
              state={state}
              duration={duration}
              removeAlert={() => dispatch(removeAlert(alert.id))}
            />
          )}
        </Transition>
      ))}
    </TransitionGroup>
  );
};

export default Alerts;
