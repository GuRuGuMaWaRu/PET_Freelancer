import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";

import "./bootstrap";
import reportWebVitals from "./reportWebVitals";
import { AppProviders } from "./context";
import { App } from "./app";
import { FullPageError } from "./shared";

if (process.env.NODE_ENV === "development") {
  const { server } = require("./test/server/dev-server");
  console.log("development");
  server.start();
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={FullPageError}>
      <AppProviders>
        <App />
      </AppProviders>
    </ErrorBoundary>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
