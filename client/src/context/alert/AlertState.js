import React, { useReducer } from "react";

import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { ADD_ALERT, REMOVE_ALERT } from "../types";

const AlertState = props => {
  const initialState = {
    alertShowing: false,
    alerts: []
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Add alert
  const addAlert = alert => {
    console.log("AlertState --- addAlert");
    console.log(alert);
    dispatch({ type: ADD_ALERT, payload: alert });
  };

  // Remove alert
  const removeAlert = id => {
    console.log("AlertState --- removeAlert");
    dispatch({ type: REMOVE_ALERT });
  };

  return (
    <AlertContext.Provider
      value={{
        alertShowing: state.alertShowing,
        alerts: state.alerts,
        addAlert,
        removeAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
