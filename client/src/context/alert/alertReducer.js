import { HIDE_ALERT, SHOW_ALERT } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, action.payload]
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
