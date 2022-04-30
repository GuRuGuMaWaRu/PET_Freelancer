import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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

import Navbar from "../layout/Navbar";
import Login from "../authorization/Login";
import Registration from "../authorization/Registration";
import ProjectForm from "../project_form/ProjectForm";
import ProjectList from "../projects/ProjectList";
import NotFound from "../pages/NotFound";
import Notification from "../layout/Notification";
import DeleteDialogue from "../layout/DeleteDialogue";
import PrivateRoute from "../routing/PrivateRoute";
import AuthRoute from "../routing/AuthRoute";
import setAuthToken from "../../utils/setAuthToken";

import { getUser } from "../../reducers/authSlice";
import { closeModal } from "../../reducers/projectsSlice";

import {
  StyledModal,
  StyledTitleBar,
  StyledH1,
  StyledContainer
} from "../styles/app.styles";

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
  const dispatch = useDispatch();
  const selectedId = useSelector(state => state.projects.selectedId);

  useEffect(() => {
    if (localStorage.freelancer_token) {
      setAuthToken(localStorage.freelancer_token);
      dispatch(getUser());
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <Notification />
      {selectedId && (
        <>
          <StyledModal onClick={() => dispatch(closeModal())}></StyledModal>
          <DeleteDialogue />
        </>
      )}
      <StyledTitleBar>
        <StyledH1>Freelancer</StyledH1>
        <Navbar />
      </StyledTitleBar>
      <StyledContainer>
        <Switch>
          <PrivateRoute exact path="/" component={ProjectList} />
          <PrivateRoute path="/add" component={ProjectForm} />
          <PrivateRoute path="/project/:id" component={ProjectForm} />
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
