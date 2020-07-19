import React, { Fragment, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPen,
  faTrashAlt,
  faInfoCircle,
  faExclamationCircle,
  faTimesCircle,
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

import { closeModal } from "../../reducers/projectsSlice";
import AuthContext from "../../context/auth/authContext";

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
  faCheck
);

const App = () => {
  const dispatch = useDispatch();
  const selectedId = useSelector(state => state.projects.selectedId);

  const authContext = useContext(AuthContext);

  const { getUser, setLoadingUser } = authContext;

  useEffect(() => {
    console.log("---App: useEffect");
    // place token into axios headers
    if (localStorage.freelancer_token) {
      console.log("---App: with token");
      // setLoadingUser(true);
      setAuthToken(localStorage.freelancer_token);
      getUser();
    } else {
      console.log("---App: without token");
      setLoadingUser(false);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Router>
        {selectedId && (
          <StyledModal onClick={() => dispatch(closeModal())}>
            <DeleteDialogue />
          </StyledModal>
        )}
        <StyledTitleBar>
          <StyledH1>Freelancer</StyledH1>
          <Navbar />
        </StyledTitleBar>
        <StyledContainer>
          <Notification />
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
    </Fragment>
  );
};

export default App;
