import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";

import theme from "./components/styles/theme";
import GlobalStyles from "./components/styles/global.styles";

import ProjectState from "./context/project/ProjectState";
import AlertState from "./context/alert/AlertState";
import AuthState from "./context/auth/AuthState";
import store from "./store";

const render = () => {
  const App = require("./components/app/App").default;

  ReactDOM.render(
    <Provider store={store}>
      <AuthState>
        <ProjectState>
          <AlertState>
            <GlobalStyles />
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </AlertState>
        </ProjectState>
      </AuthState>
    </Provider>,
    document.getElementById("root")
  );
};

render();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./components/app/App", render);
}
