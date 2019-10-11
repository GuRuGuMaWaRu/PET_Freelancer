import React, { Fragment } from "react";
import axios from "axios";
import styled from "styled-components";
import "./App.css";

const StyledTitle = styled.h1`
  text-align: center;
`;
const StyledProject = styled.div`
  margin-bottom: 1rem;
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
            <StyledProject key={project._id}>
              Client: {project.client.name}
              <br />
              Project Nr: {project.projectNr}
              <br />
              Payment: {project.payment}
              <br />
              Date: {project.date}
            </StyledProject>
          ))}
        </div>
      </Fragment>
    )
  );
}

export default App;
