import React, { useReducer } from "react";
import axios from "axios";

import AuthContext from "./authContext";
import authReducer from "./authReducer";
import { REGISTER, AUTH_ERROR } from "../types";

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
      const res = await axios.post("/api/v1/users/signup", values, {
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

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        currentUser: state.currentUser,
        loadingUser: state.loadingUser,
        error: state.error,
        registerUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
