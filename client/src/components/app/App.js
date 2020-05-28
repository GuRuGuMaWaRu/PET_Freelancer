import React, { Fragment, useEffect, useContext } from "react";
// import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPen,
  faTrashAlt,
  faInfoCircle,
  faExclamationCircle,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

import Navbar from "../layout/Navbar";
import Login from "../authorization/Login";
import Registration from "../authorization/Registration";
import AddProjectForm from "../project_form/AddProjectForm";
import EditProjectForm from "../project_form/EditProjectForm";
import ProjectList from "../pages/ProjectList";
import NotFound from "../pages/NotFound";
import Alerts from "../layout/Alerts";
import DeleteDialogue from "../layout/DeleteDialogue";
import PrivateRoute from "../routing/PrivateRoute";
import AuthRoute from "../routing/AuthRoute";
import setAuthToken from "../../utils/setAuthToken";

import ProjectContext from "../../context/project/projectContext";
import AuthContext from "../../context/auth/authContext";

// import theme from "../styles/theme";
// import GlobalStyles from "../styles/globalStyles";

import {
  StyledModal,
  StyledTitleBar,
  StyledH1,
  StyledContainer
} from "../styles/appStyles";

library.add(
  faPen,
  faTrashAlt,
  faInfoCircle,
  faExclamationCircle,
  faTimesCircle
);

const App = () => {
  const projectContext = useContext(ProjectContext);
  const authContext = useContext(AuthContext);

  const { deleteId, closeModal } = projectContext;
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
      {/* <GlobalStyles /> */}
      <Router>
        {/* <ThemeProvider theme={theme}> */}
        {deleteId && (
          <StyledModal onClick={closeModal}>
            <DeleteDialogue />
          </StyledModal>
        )}
        <StyledTitleBar>
          <StyledH1>Freelancer</StyledH1>
          <Navbar />
        </StyledTitleBar>
        <StyledContainer>
          <Alerts />
          <Switch>
            <PrivateRoute exact path="/" component={ProjectList} />
            <PrivateRoute path="/add" component={AddProjectForm} />
            <PrivateRoute path="/project/:id" component={EditProjectForm} />
            <AuthRoute path="/login" component={Login} />
            <AuthRoute path="/registration" component={Registration} />
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </StyledContainer>
        {/* </ThemeProvider> */}
      </Router>
    </Fragment>
  );
};

export default App;
