import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import ProjectState from "./context/project/ProjectState";
import AlertState from "./context/alert/AlertState";

ReactDOM.render(
  <ProjectState>
    <AlertState>
      <App />
    </AlertState>
  </ProjectState>,
  document.getElementById("root")
);
