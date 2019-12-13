import { REGISTER, LOGIN, LOGOUT } from "../types";

export default (state, action) => {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null
      };
    default:
      return state;
  }
};
