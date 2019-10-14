import React, { Fragment } from "react";
import axios from "axios";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import moment from "moment";

import Navbar from "./layout/Navbar";
import ProjectForm from "./pages/project_form/ProjectForm";

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
const StyledMain = styled.div`
  margin: 1rem 10%;
`;
const StyledProject = styled.div`
  margin-bottom: 1rem;
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

        <StyledMain>
          <Switch>
            <Route path="/add" component={ProjectForm}></Route>
            <Route
              exact
              path="/"
              render={() =>
                projects && (
                  <div>
                    {projects.map(project => (
                      <StyledProject key={project._id}>
                        Client: {project.client.name}
                        <br />
                        Project Nr: {project.projectNr}
                        <br />
                        Payment: {project.payment} {project.currency}
                        <br />
                        Date: {moment(project.date).format("YYYY-MM-DD")}
                      </StyledProject>
                    ))}
                  </div>
                )
              }
            ></Route>
          </Switch>
        </StyledMain>
      </Router>
    </Fragment>
  );
}

export default App;
