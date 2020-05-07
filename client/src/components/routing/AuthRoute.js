import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";

const AuthRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  console.log("---AuthRoute: isAuthenticated:", isAuthenticated);
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
