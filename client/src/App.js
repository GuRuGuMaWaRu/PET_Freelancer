import React, { Fragment } from "react";
import axios from "axios";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./layout/Navbar";
import ProjectForm from "./pages/project_form/ProjectForm";
import ProjectList from "./pages/project_list/ProjectList";

const theme = {
  darkPrimary: "#E64A19",
  lightPrimary: "#FFCCBC",
  primary: "#FF5722",
  text: "#FFFFFF",
  accent: "#607D8B",
  primaryText: "#212121",
  secondaryText: "#757575",
  divider: "#BDBDBD",
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
`;

const StyledTitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.darkPrimary};
`;
const StyledH1 = styled.h1`
  padding: 0.8rem 0;
  margin: 0;
`;
const StyledContainer = styled.div`
  margin: 1rem 10%;
`;

function App() {
  const [projects, setProjects] = React.useState(null);

  React.useEffect(() => {
    const getProjects = async () => {
      const { data: projects } = await axios.get("/projects");
      setProjects(projects);
    };

    getProjects();
  }, []);

  return (
    <Fragment>
      <GlobalStyle />
      <Router>
        <ThemeProvider theme={theme}>
          <StyledTitleBar>
            <StyledH1>Freelancer</StyledH1>
            <Navbar />
          </StyledTitleBar>
        </ThemeProvider>

        <StyledContainer>
          <Switch>
            <Route path="/add" component={ProjectForm}></Route>
            <Route exact path="/">
              <ProjectList projects={projects} />
            </Route>
          </Switch>
        </StyledContainer>
      </Router>
    </Fragment>
  );
}

export default App;
