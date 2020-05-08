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
  AUTH_ERROR,
  LOGIN_ERROR,
  HIDE_LOGIN_ERROR
} from "../types";

const AuthState = props => {
  const initialState = {
    isAuthenticated: false,
    currentUser: null,
    loadingUser: true,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Register
  const registerUser = async values => {
    console.log("AuthState --- registerUser");

    try {
      const res = await axios.post("/api/v1/users", values, {
        headers: { "Content-Type": "application/json" }
      });
      console.log("AuthState --- registerUser:", res);
      localStorage.setItem("freelancer_token", res.data.token);
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
    console.log("AuthState --- loginUser");

    try {
      const res = await axios.post("/api/v1/auth", values, {
        headers: { "Content-Type": "application/json" }
      });
      console.log("AuthState --- loginUser:", res);
      localStorage.setItem("freelancer_token", res.data.token);
      dispatch({ type: LOGIN });
    } catch (err) {
      let message = "";

      if (err.message === "Request failed with status code 400") {
        message = "Wrong credentials";
      } else {
        message = "Bad request";
      }
      // console.log("loginUser:", err);
      // console.log("Error:", err.message);
      dispatch({
        type: LOGIN_ERROR,
        payload: { msg: message, type: "error" }
      });
    }
  };

  // Logout
  const logoutUser = async () => {
    console.log("AuthState --- logoutUser");

    localStorage.removeItem("freelancer_token");
    dispatch({ type: LOGOUT });
  };

  // Get user
  const getUser = async () => {
    console.log("AuthState --- getUser");

    try {
      const res = await axios.get("/api/v1/auth", {
        headers: { "Content-Type": "application/json" }
      });
      console.log("AuthState --- getUser:", res);
      localStorage.setItem("freelancer_token", res.data.token);
      dispatch({ type: GET_USER, payload: res.data.data });
    } catch (err) {
      // localStorage.removeItem("freelancer_token");
      console.log("Error:", err.message);
      dispatch({
        type: AUTH_ERROR,
        payload: { msg: err.message, type: "error" }
      });
    }
  };

  // Set loadinfUser
  const setLoadingUser = loadingState => {
    console.log("AuthState --- setLoadingUser");

    dispatch({
      type: SET_LOADING,
      payload: loadingState
    });
  };

  // Hide error
  const hideError = () => {
    console.log("AuthState --- hideError");

    dispatch({
      type: HIDE_LOGIN_ERROR
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        currentUser: state.currentUser,
        loadingUser: state.loadingUser,
        error: state.error,
        registerUser,
        loginUser,
        logoutUser,
        getUser,
        setLoadingUser,
        hideError
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
