import React from "react";
import ReactDOM from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import { ThemeProvider } from "styled-components";

import rootReducer from "./reducers/rootReducer";

import theme from "./components/styles/theme";
import GlobalStyles from "./components/styles/global.styles";

import App from "./components/app/App";
import ProjectState from "./context/project/ProjectState";
import ClientState from "./context/client/ClientState";
import AlertState from "./context/alert/AlertState";
import AuthState from "./context/auth/AuthState";

const store = configureStore({
  reducer: rootReducer
});

ReactDOM.render(
  <AuthState>
    <ProjectState>
      <ClientState>
        <AlertState>
          <GlobalStyles />
          <ThemeProvider theme={theme}>
            <App store={store} />
          </ThemeProvider>
        </AlertState>
      </ClientState>
    </ProjectState>
  </AuthState>,
  document.getElementById("root")
);
