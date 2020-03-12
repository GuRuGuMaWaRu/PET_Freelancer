import uuid from "uuid";
import { ADD_ALERT, REMOVE_ALERT, ERROR } from "../types";

export default (state, action) => {
  switch (action.type) {
    case ERROR:
    case ADD_ALERT:
      return {
        ...state,
        alertShowing: true,
        alert: action.payload
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alertShowing: false
      };
    default:
      return state;
  }
};
