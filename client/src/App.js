import React, { Fragment, useState } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./layout/Navbar";
import ProjectForm from "./pages/ProjectForm";
import ProjectList from "./pages/ProjectList";
import Alert from "./layout/Alert";
import DeleteDialogue from "./layout/DeleteDialogue";

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

const App = () => {
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [deleteProject, setDeleteProject] = useState(null);
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(false);

  const showAlert = message => {
    setAlertMessage(message);
    setAlert(true);
  };

  const hideAlert = () => {
    setAlert(false);
  };

  const handleModal = () => {
    setDeleteProject(null);
  };

  return (
    <Fragment>
      <GlobalStyle />
      <Router>
        <ThemeProvider theme={theme}>
          {deleteProject && (
            <StyledModal onClick={handleModal}>
              <DeleteDialogue
                setLoading={setLoading}
                setProjects={setProjects}
                deleteProject={deleteProject}
                closeModal={handleModal}
              />
            </StyledModal>
          )}
          <StyledTitleBar>
            <StyledH1>Freelancer</StyledH1>
            <Navbar />
          </StyledTitleBar>
          <StyledContainer>
            {alert && <Alert message={alertMessage} hideAlert={hideAlert} />}
            <Switch>
              <Route
                path="/add"
                render={props => (
                  <ProjectForm
                    {...props}
                    showAlert={showAlert}
                    hideAlert={hideAlert}
                  />
                )}
              ></Route>
              <Route exact path="/">
                <ProjectList
                  loading={loading}
                  setLoading={setLoading}
                  projects={projects}
                  setProjects={setProjects}
                  setDeleteProject={setDeleteProject}
                />
              </Route>
            </Switch>
          </StyledContainer>
        </ThemeProvider>
      </Router>
    </Fragment>
  );
};

export default App;
