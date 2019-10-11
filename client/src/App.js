import React, { Fragment } from "react";
import axios from "axios";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

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
    <Router>
      <StyledTitle>Freelancer</StyledTitle>

      <nav>
        <ul>
          <li>
            <NavLink
              exact
              to="/"
              activeStyle={{
                fontWeight: "bold",
                color: "red"
              }}
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add"
              activeStyle={{
                fontWeight: "bold",
                color: "red"
              }}
            >
              Add Project
            </NavLink>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route
          path="/add"
          render={() => (
            <Formik
              initialValues={{
                date: Date.now()
              }}
              onSubmit={async (values, actions) => {
                await axios.post("/projects", values);
                actions.setSubmitting(false);
              }}
              render={({ errors, status, touched, isSubmitting }) => (
                <Form>
                  <Field type="date" name="date" />
                  <ErrorMessage name="date" component="div" />
                  <button type="submit" disabled={isSubmitting}>
                    Add
                  </button>
                </Form>
              )}
            />
          )}
        ></Route>
        <Route
          exact
          path="/"
          render={() =>
            projects && (
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
            )
          }
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;
