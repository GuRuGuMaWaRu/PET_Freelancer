import { REGISTER } from "../types";

export default (state, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload
      };
    default:
      return state;
  }
};
