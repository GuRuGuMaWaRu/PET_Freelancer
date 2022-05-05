import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";

import theme from "./components/styles/theme";
import GlobalStyles from "./components/styles/global.styles";

import { store } from "./store";

const render = () => {
  const App = require("./App").default;

  ReactDOM.render(
    <Provider store={store}>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>,
    document.getElementById("root")
  );
};

render();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./App", render);
}
