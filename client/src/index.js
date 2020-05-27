import React from "react";
import ReactDOM from "react-dom";

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
          <App />
        </AlertState>
      </ClientState>
    </ProjectState>
  </AuthState>,
  document.getElementById("root")
);
