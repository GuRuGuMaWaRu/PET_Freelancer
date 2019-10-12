import React from "react";
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
  const [clients, setClients] = React.useState(null);

  React.useEffect(() => {
    const getProjects = async () => {
      const { data: projects } = await axios.get("/projects");
      setProjects(projects);
    };
    const getClients = async () => {
      const { data: clients } = await axios.get("/clients");
      setClients(clients);
    };

    getProjects();
    getClients();
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
                date: Date.now(),
                client: "",
                newClient: "",
                projectNr: "",
                currency: "USD",
                payment: 0
              }}
              onSubmit={async (values, actions) => {
                try {
                  await axios.post("/projects", values);
                  actions.setSubmitting(false);
                } catch (err) {
                  actions.setSubmitting(false);
                  actions.setStatus({ msg: "Something went wrong" });
                }
              }}
              render={({ errors, status, touched, isSubmitting }) => (
                <Form>
                  <div>
                    <label htmlFor="date">Date:</label>
                    <Field type="date" name="date" />
                    <ErrorMessage name="date" component="div" />
                  </div>
                  <div>
                    <label htmlFor="client">Client:</label>
                    <Field name="client" component="select">
                      {clients &&
                        clients.map(client => (
                          <option key={client._id} value={client._id}>
                            {client.name}
                          </option>
                        ))}
                    </Field>
                    <ErrorMessage name="client" component="div" />
                  </div>
                  <div>
                    <label htmlFor="newClient">New client:</label>
                    <Field type="text" name="newClient" />
                    <ErrorMessage name="newClient" component="div" />
                  </div>
                  <div>
                    <label htmlFor="projectNr">Project Nr:</label>
                    <Field type="text" name="projectNr" />
                    <ErrorMessage name="projectNr" component="div" />
                  </div>
                  <div>
                    <label htmlFor="currency">Currency:</label>
                    <Field type="text" name="currency" />
                    <ErrorMessage name="currency" component="div" />
                  </div>
                  <div>
                    <label htmlFor="payment">Payment:</label>
                    <Field type="number" name="payment" />
                    <ErrorMessage name="payment" component="div" />
                  </div>
                  {status && status.msg && <div>{status.msg}</div>}
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
