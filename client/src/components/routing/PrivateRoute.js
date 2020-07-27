import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import Spinner from "../layout/Spinner";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const loadingUser = useSelector(state => state.auth.loading);

  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && loadingUser ? (
          <Spinner />
        ) : !isAuthenticated && !loadingUser ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} {...rest} />
        )
      }
    />
  );
};

export default PrivateRoute;
