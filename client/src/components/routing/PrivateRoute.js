import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  isAuthenitcated,
  loading,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenitcated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} {...rest} loading={loading} />
        )
      }
    />
  );
};

export default PrivateRoute;
