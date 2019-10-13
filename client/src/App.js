import React, { Fragment } from "react";
import axios from "axios";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import moment from "moment";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const theme = {
  darkPrimary: "#E64A19",
  lightPrimary: "#FFCCBC",
  primary: "#FF5722",
  text: "#FFFFFF",
  accent: "#607D8B",
  primaryText: "#212121",
  secondaryText: "#757575",
  divider: "#BDBDBD",
  mediumseagreen: "mediumseagreen"
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
  }
  h1, h2, h3, h4, li {
    font-family: 'Quattrocento', serif;
  }
  input,
  button,
  textarea,
  select {
    font: inherit
  }
`;

const StyledTitle = styled.h1`
  text-align: center;
  padding: 0.8rem 0;
  margin-top: 0;
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.darkPrimary};
`;
const StyledProject = styled.div`
  margin-bottom: 1rem;
`;

const formSchema = Yup.object().shape({
  date: Yup.date().required("Required"),
  client: Yup.string().required("Required"),
  newClient: Yup.string(),
  projectNr: Yup.string().required("Required"),
  currency: Yup.string().required("Required"),
  payment: Yup.number().required("Required")
});

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
    <Fragment>
      <GlobalStyle />
      <Router>
        <ThemeProvider theme={theme}>
          <StyledTitle>Freelancer</StyledTitle>
        </ThemeProvider>

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
            render={() =>
              clients && (
                <Formik
                  initialValues={{
                    date: moment().format("YYYY-MM-DD"),
                    client: clients[0],
                    newClient: "",
                    projectNr: "",
                    currency: "USD",
                    payment: 0
                  }}
                  validationSchema={formSchema}
                  onSubmit={async (values, actions) => {
                    try {
                      console.log(values);
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
                            clients.map((client, i) => (
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
                        <Field name="currency" component="select">
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                        </Field>
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
              )
            }
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
                      Payment: {project.payment} {project.currency}
                      <br />
                      Date: {moment(project.date).format("YYYY-MM-DD")}
                    </StyledProject>
                  ))}
                </div>
              )
            }
          ></Route>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
