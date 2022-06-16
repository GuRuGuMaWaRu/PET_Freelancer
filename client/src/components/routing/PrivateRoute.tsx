import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAppSelector } from "../../hooks/redux";
import Spinner from "../layout/Spinner";

interface IProps {
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}

const PrivateRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const loadingUser = useAppSelector(state => state.auth.loading);

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
