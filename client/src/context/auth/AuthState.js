import React, { useReducer } from "react";
import axios from "axios";

import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
  REGISTER,
  LOGIN,
  LOGOUT,
  GET_USER,
  SET_LOADING,
  AUTH_ERROR
} from "../types";

const AuthState = props => {
  const initialState = {
    isAuthenticated: false,
    currentUser: null,
    loadingUser: false
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Register
  const registerUser = async values => {
    try {
      const res = await axios.post("/users", values, {
        headers: { "Content-Type": "application/json" }
      });

      localStorage.setItem("token", res.data.token);
      dispatch({ type: REGISTER });
    } catch (err) {
      console.log("Error:", err.message);
      dispatch({
        type: AUTH_ERROR,
        payload: { msg: err.message, type: "error" }
      });
    }
  };

  // Login
  const loginUser = async values => {
    try {
      const res = await axios.post("/auth", values, {
        headers: { "Content-Type": "application/json" }
      });

      localStorage.setItem("token", res.data.token);
      dispatch({ type: LOGIN });
    } catch (err) {
      console.log("Error:", err.message);
      dispatch({
        type: AUTH_ERROR,
        payload: { msg: err.message, type: "error" }
      });
    }
  };

  // Logout
  const logoutUser = async () => {
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT });
  };

  // Get user
  const getUser = async () => {
    console.log("AuthState --- getUser");
    try {
      const res = await axios.get("/auth", {
        headers: { "Content-Type": "application/json" }
      });

      localStorage.setItem("token", res.data.token);
      dispatch({ type: GET_USER, payload: res.data });
    } catch (err) {
      console.log("Error:", err.message);
      dispatch({
        type: AUTH_ERROR,
        payload: { msg: err.message, type: "error" }
      });
    }
  };

  // Set loadinfUser
  const setLoadingUser = loadingState => {
    dispatch({
      type: SET_LOADING,
      payload: loadingState
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        currentUser: state.currentUser,
        loadingUser: state.loadingUser,
        registerUser,
        loginUser,
        logoutUser,
        getUser,
        setLoadingUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
