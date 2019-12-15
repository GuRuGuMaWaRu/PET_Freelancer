import {
  REGISTER,
  LOGIN,
  LOGOUT,
  GET_USER,
  SET_LOADING,
  AUTH_ERROR
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload,
        loadingUser: false
      };
    case REGISTER:
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        loadingUser: false
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        loadingUser: false
      };
    case SET_LOADING:
      return {
        ...state,
        loadingUser: action.payload
      };
    case AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        loadingUser: false
      };
    default:
      return state;
  }
};
