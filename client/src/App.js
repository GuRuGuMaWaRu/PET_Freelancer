import React, { Fragment, useEffect, useContext } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import Navbar from "./components/layout/Navbar";
import Login from "./components/pages/Login";
import Registration from "./components/pages/Registration";
import AddProjectForm from "./components/pages/AddProjectForm";
import EditProjectForm from "./components/pages/EditProjectForm";
import ProjectList from "./components/pages/ProjectList";
import NotFound from "./components/pages/NotFound";
import Alert from "./components/layout/Alert";
import DeleteDialogue from "./components/layout/DeleteDialogue";
import PrivateRoute from "./components/routing/PrivateRoute";
import AuthRoute from "./components/routing/AuthRoute";
import setAuthToken from "./utils/setAuthToken";

import ProjectContext from "./context/project/projectContext";
import AuthContext from "./context/auth/authContext";

const theme = {
  darkPrimary: "#E64A19",
  lightPrimary: "#FFCCBC",
  primary: "#FF5722",
  text: "#FFFFFF",
  accent: "#607D8B",
  primaryText: "#212121",
  secondaryText: "#757575",
  divider: "#BDBDBD",
  container: "#eee",
  modal_bg_color: "hsla(200, 40%, 10%, 0.4)",
  mediumseagreen: "mediumseagreen"
};
const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    min-height: 100vh;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
  }
  h1, h2, h3, h4, li {
    font-family: 'Quattrocento', serif;
  }
  input,
  button,
  textarea,
  select {
    font: inherit
  }
  #root {
    min-height: 100vh;
    background-color: #fff;
  }
`;

const StyledModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  opacity: 1;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${props => props.theme.modal_bg_color};
  transition: opacity 0.4s, z-index 0.4s;
`;
const StyledTitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px; /* helps with container 100% height */
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.darkPrimary};
`;
const StyledH1 = styled.h1`
  padding: 0.8rem 0;
  margin: 0;
`;
const StyledContainer = styled.div`
  min-height: calc(
    100vh - 80px
  ); /* set 100% height considering header 80px height */
  margin: 0 10%;
  color: {$props => props.theme.primaryText};
  background-color: ${props => props.theme.container};
`;

library.add(faPen, faTrashAlt);

const App = () => {
  const projectContext = useContext(ProjectContext);
  const authContext = useContext(AuthContext);

  const { deleteId, closeModal } = projectContext;
  const { error, getUser, setLoadingUser } = authContext;

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
      <GlobalStyle />
      <Router>
        <ThemeProvider theme={theme}>
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
            <Alert />
            <Switch>
              <PrivateRoute exact path="/" component={ProjectList} />
              <PrivateRoute path="/add" component={AddProjectForm} />
              <PrivateRoute path="/edit" component={EditProjectForm} />
              <AuthRoute path="/login" component={Login} />
              <AuthRoute path="/registration" component={Registration} />
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </StyledContainer>
        </ThemeProvider>
      </Router>
    </Fragment>
  );
};

export default App;
