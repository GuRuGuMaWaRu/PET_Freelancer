import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { HIDE_ALERT, SHOW_ALERT } from "../types";

const AlertState = props => {
  const initialState = {
    alerts: null
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Show alert
  const showAlert = alert => {
    dispatch({ type: SHOW_ALERT, payload: alert });
  };
  // Hide alert
  const hideAlert = () => {
    dispatch({ type: HIDE_ALERT });
  };

  return (
    <AlertContext.Provider value={{ alerts: state.alerts }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
