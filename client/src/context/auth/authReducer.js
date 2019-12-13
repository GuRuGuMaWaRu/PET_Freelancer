import { REGISTER, LOGIN } from "../types";

export default (state, action) => {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload
      };
    default:
      return state;
  }
};
