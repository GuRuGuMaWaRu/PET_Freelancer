import uuidv1 from "uuid/v1";
import { HIDE_ALERT, SHOW_ALERT, ERROR } from "../types";

export default (state, action) => {
  switch (action.type) {
    case ERROR:
    case SHOW_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, { ...action.payload, id: uuidv1() }]
      };
    case HIDE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter(alert => alert.id !== action.payload)
      };
    default:
      return state;
  }
};
