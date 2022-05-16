import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPen,
  faTrashAlt,
  faInfoCircle,
  faExclamationCircle,
  faTimesCircle,
  faTimes,
  faCheck
} from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useAppSelector } from "./hooks/redux";

import Navbar from "./components/layout/Navbar";
import Login from "./components/authorization/Login";
import Registration from "./components/authorization/Registration";
import ProjectForm from "./components/project_form/ProjectForm";
import ProjectList from "./components/projects/ProjectList";
import NotFound from "./components/pages/NotFound";
import Notification from "./components/layout/Notification";
import PrivateRoute from "./components/routing/PrivateRoute";
import AuthRoute from "./components/routing/AuthRoute";
import setAuthToken from "./utils/setAuthToken";

import { getUser } from "./store/reducers/authSlice";
import { fetchClients } from "./store/reducers/clientsSlice";

import {
  StyledTitleBar,
  StyledH1,
  StyledContainer
} from "./components/styles/app.styles";

library.add(
  faPen,
  faTrashAlt,
  faInfoCircle,
  faExclamationCircle,
  faTimesCircle,
  faTimes,
  faCheck
);

const App = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (localStorage.freelancer_token) {
      setAuthToken(localStorage.freelancer_token);
      dispatch(getUser());
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchClients());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <Router>
      <Notification />
      <StyledTitleBar>
        <StyledH1>Freelancer</StyledH1>
        <Navbar />
      </StyledTitleBar>
      <StyledContainer>
        <Switch>
          <PrivateRoute exact path="/" component={ProjectList} />
          <PrivateRoute path="/add" component={ProjectForm} />
          <PrivateRoute path="/project/:projectId" component={ProjectForm} />
          <AuthRoute path="/login" component={Login} />
          <AuthRoute path="/registration" component={Registration} />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </StyledContainer>
    </Router>
  );
};

export default App;
