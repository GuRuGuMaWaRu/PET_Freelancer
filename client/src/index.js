import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";

import theme from "./components/styles/theme";
import GlobalStyles from "./components/styles/global.styles";
import store from "./store";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const render = () => {
  const App = require("./components/app/App").default;

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
  module.hot.accept("./components/app/App", render);
}
