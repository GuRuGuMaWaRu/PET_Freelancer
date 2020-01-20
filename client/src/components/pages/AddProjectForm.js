import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import styled from "styled-components";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Spinner from "../layout/Spinner";
import ProjectContext from "../../context/project/projectContext";
import AlertContext from "../../context/alert/alertContext";

const formSchema = Yup.object().shape({
  date: Yup.date().required("Required"),
  client: Yup.string(),
  newClient: Yup.string(),
  projectNr: Yup.string().required("Required"),
  currency: Yup.string(),
  payment: Yup.number()
});

const StyledForm = styled(Form)`
  padding: 1rem 2rem;
`;
const StyledTitle = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  padding-top: 1rem;
  margin-top: 0;
`;
const StyledFormGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 0.5rem;
`;
const StyledLabel = styled.label`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 0.5rem;
`;
const StyledField = styled(Field)`
  padding: 0.2rem;
`;
const StyledErrorMessage = styled(ErrorMessage)`
  grid-column-start: 2;
  margin-top: 0.4rem;
  color: ${props => props.theme.darkPrimary};
`;
const StyledActionButtons = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem auto 0;
`;
const StyledButton = styled.button`
  display: block;
  padding: 0.6rem 1.5rem;
  border: none;
  color: ${props => props.theme.text};
  cursor: pointer;
  transition: 0.2s color;
  &:hover {
    color: ${props => props.theme.lightPrimary};
  }
`;
const StyledSubmitButton = styled(StyledButton)`
  background-color: ${props => props.theme.mediumseagreen};
`;

const AddProjectForm = ({ history }) => {
  const projectContext = useContext(ProjectContext);
  const alertContext = useContext(AlertContext);

  const { clients, loadingClients, createProject, getClients } = projectContext;
  const { showAlert } = alertContext;

  useEffect(() => {
    console.log("---ProjectForm: useEffect");
    if (loadingClients) {
      getClients();
    }
    // eslint-disable-next-line
  }, []);

  console.log("---ProjectForm: rendering...");
  console.log("---ProjectForm, loadingClients:", loadingClients);
  console.log("---ProjectForm, clients:", clients);

  if (loadingClients) {
    return <Spinner />;
  }

  const initialValues = {
    date: moment().format("YYYY-MM-DD"),
    client: "",
    newClient: "",
    projectNr: "",
    currency: "USD",
    payment: ""
  };

  return (
    clients && (
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={async (values, actions) => {
          try {
            values.projectNr = values.projectNr.trim();

            // Get client name to display inside alert message
            let client;
            if (values.newClient.length > 0) {
              client = values.newClient.trim();
            } else {
              client = clients.find(client => client._id === values.client)
                .name;
            }

            createProject(values);
            showAlert({
              msg: `Added new project "${values.projectNr}" from ${client}`,
              type: "info"
            });

            actions.setSubmitting(false);
            history.push("/");
          } catch (err) {
            console.log(err);
            actions.setSubmitting(false);
            actions.setStatus({ msg: "Something went wrong" });
          }
        }}
        render={({ errors, status, touched, isSubmitting }) => (
          <StyledForm>
            <StyledTitle>Add Project</StyledTitle>
            <StyledFormGroup>
              <StyledLabel htmlFor="date">* Date:</StyledLabel>
              <StyledField type="date" name="date" />
              <StyledErrorMessage name="date" component="div" />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel htmlFor="client">* Client:</StyledLabel>
              <StyledField name="client" component="select">
                <option value="">--- Choose client ---</option>
                {clients &&
                  clients.map((client, i) => (
                    <option key={client._id} value={client._id}>
                      {client.name}
                    </option>
                  ))}
              </StyledField>
              <StyledErrorMessage name="client" component="div" />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel htmlFor="newClient">New client:</StyledLabel>
              <StyledField type="text" name="newClient" />
              <StyledErrorMessage name="newClient" component="div" />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel htmlFor="projectNr">* Project Nr:</StyledLabel>
              <StyledField type="text" name="projectNr" />
              <StyledErrorMessage name="projectNr" component="div" />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel htmlFor="currency">Currency:</StyledLabel>
              <StyledField name="currency" component="select">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </StyledField>
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel htmlFor="payment">Payment:</StyledLabel>
              <StyledField type="number" name="payment" placeholder="0" />
            </StyledFormGroup>
            {status && status.msg && <div>{status.msg}</div>}
            <StyledActionButtons>
              <StyledSubmitButton type="submit" disabled={isSubmitting}>
                Add
              </StyledSubmitButton>
            </StyledActionButtons>
          </StyledForm>
        )}
      />
    )
  );
};

AddProjectForm.propTypes = {
  history: PropTypes.object.isRequired
};

export default AddProjectForm;
