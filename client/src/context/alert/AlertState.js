import React, { useReducer } from "react";

import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { SHOW_ALERT, CLOSE_ALERT } from "../types";

const AlertState = props => {
  const initialState = {
    alert: null
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Show alert
  const showAlert = alert => {
    console.log("AlertState --- showAlert");
    console.log(alert);
    dispatch({ type: SHOW_ALERT, payload: alert });
  };

  // Close alert
  const closeAlert = () => {
    dispatch({ type: CLOSE_ALERT });
  };

  return (
    <AlertContext.Provider
      value={{ alert: state.alert, showAlert, closeAlert }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
