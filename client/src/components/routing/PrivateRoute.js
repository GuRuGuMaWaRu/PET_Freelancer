import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loadingUser } = authContext;

  console.log("isAuthenticated:", isAuthenticated);
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loadingUser ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} {...rest} />
        )
      }
    />
  );
};

export default PrivateRoute;
