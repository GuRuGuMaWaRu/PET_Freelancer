import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/App";
import ProjectState from "./context/project/ProjectState";
import AlertState from "./context/alert/AlertState";
import AuthState from "./context/auth/AuthState";

ReactDOM.render(
  <AuthState>
    <ProjectState>
      <AlertState>
        <App />
      </AlertState>
    </ProjectState>
  </AuthState>,
  document.getElementById("root")
);
