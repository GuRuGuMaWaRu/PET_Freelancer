import uuid from "uuid";
import { ADD_ALERT, REMOVE_ALERT, ERROR } from "../types";

export default (state, action) => {
  switch (action.type) {
    case ERROR:
    case ADD_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, { id: uuid(), ...action.payload }]
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter(alert => alert.id !== action.payload)
      };
    default:
      return state;
  }
};
