import {
  REGISTER,
  LOGIN,
  LOGOUT,
  GET_USER,
  SET_LOADING,
  AUTH_ERROR,
  LOGIN_ERROR,
  HIDE_AUTH_ERROR,
  HIDE_LOGIN_ERROR
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload.user,
        loadingUser: false
      };
    case REGISTER:
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        loadingUser: false
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
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
        currentUser: null,
        loadingUser: false
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loadingUser: false,
        error: action.payload
      };
    case HIDE_AUTH_ERROR:
      return {
        ...state,
        error: null
      };
    case HIDE_LOGIN_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
