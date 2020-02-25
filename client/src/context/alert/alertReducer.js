// import uuidv1 from "uuid/v1";
import { SHOW_ALERT, CLOSE_ALERT, ERROR } from "../types";

export default (state, action) => {
  switch (action.type) {
    case ERROR:
    case SHOW_ALERT:
      return {
        ...state,
        alert: action.payload
      };
    case CLOSE_ALERT:
      return {
        ...state,
        alert: null
      };
    default:
      return state;
  }
};
