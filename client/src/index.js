import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";

import theme from "./components/styles/theme";
import GlobalStyles from "./components/styles/global.styles";

import App from "./components/app/App";
import ProjectState from "./context/project/ProjectState";
import ClientState from "./context/client/ClientState";
import AlertState from "./context/alert/AlertState";
import AuthState from "./context/auth/AuthState";

ReactDOM.render(
  <AuthState>
    <ProjectState>
      <ClientState>
        <AlertState>
          <GlobalStyles />
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </AlertState>
      </ClientState>
    </ProjectState>
  </AuthState>,
  document.getElementById("root")
);
