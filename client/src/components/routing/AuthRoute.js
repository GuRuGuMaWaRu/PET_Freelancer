import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAppSelector } from "../../hooks/redux";

const AuthRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default AuthRoute;
