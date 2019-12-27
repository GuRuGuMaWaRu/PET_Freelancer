import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import Spinner from "../layout/Spinner";
import AuthContext from "../../context/auth/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loadingUser } = authContext;

  console.log("---PrivateRoute: isAuthenticated:", isAuthenticated);
  console.log("---PrivateRoute: loadingUser:", loadingUser);
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
