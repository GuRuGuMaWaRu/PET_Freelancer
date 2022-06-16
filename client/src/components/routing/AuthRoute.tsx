import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAppSelector } from "../../hooks/redux";

interface IProps {
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}

const AuthRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
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
