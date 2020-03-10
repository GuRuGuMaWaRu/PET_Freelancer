// import uuidv1 from "uuid/v1";
import { SHOW_ALERT, CLOSE_ALERT, ERROR } from "../types";

export default (state, action) => {
  switch (action.type) {
    case ERROR:
    case SHOW_ALERT:
      return {
        ...state,
        alertShowing: true,
        alert: action.payload
      };
    case CLOSE_ALERT:
      return {
        ...state,
        alertShowing: false,
        alert: null
      };
    default:
      return state;
  }
};
