import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import * as Yup from "yup";
import { Formik } from "formik";

import Spinner from "../layout/Spinner";
import ProjectContext from "../../context/project/projectContext";
import AlertContext from "../../context/alert/alertContext";
import {
  StyledForm,
  StyledTitle,
  StyledFormGroup,
  StyledLabel,
  StyledField,
  StyledErrorMessage,
  StyledActionButtons,
  StyledSubmitButton
} from "./formStyles";

const formSchema = Yup.object().shape({
  date: Yup.date().required("Required"),
  client: Yup.string(),
  newClient: Yup.string(),
  projectNr: Yup.string().required("Required"),
  currency: Yup.string(),
  payment: Yup.number()
});

const AddProjectForm = ({ history }) => {
  const projectContext = useContext(ProjectContext);
  const alertContext = useContext(AlertContext);

  const { clients, loadingClients, createProject, getClients } = projectContext;
  const { addAlert } = alertContext;

  useEffect(() => {
    console.log("---AddProjectForm: useEffect");
    if (loadingClients) {
      getClients();
    }
    // eslint-disable-next-line
  }, []);

  console.log("---AddProjectForm: rendering...");
  console.log("---AddProjectForm, loadingClients:", loadingClients);
  console.log("---AddProjectForm, clients:", clients);

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
            addAlert({
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
