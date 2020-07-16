import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TransitionGroup, Transition } from "react-transition-group";

import Alert from "./Alert";
import { removeAlert, selectAllAlerts } from "../../reducers/alertsSlice";
import { StyledAlertList } from "../styles/alert.styles";

const duration = 200;

const Alerts = () => {
  const alerts = useSelector(selectAllAlerts);
  const dispatch = useDispatch();

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
