import React, { Fragment } from "react";
import axios from "axios";
import styled from "styled-components/macro";
import "./App.css";

const StyledTitle = styled.h1`
  text-align: center;
`;

function App() {
  const [projects, setProjects] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("/projects")
      .then(res => {
        setProjects(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    projects && (
      <Fragment>
        <StyledTitle>Freelancer</StyledTitle>
        <div>
          {projects.map(project => (
            <div key={project._id}>{project.projectNr}</div>
          ))}
        </div>
      </Fragment>
    )
  );
}

export default App;
