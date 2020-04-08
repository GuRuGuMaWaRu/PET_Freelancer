import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";
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
  StyledSubmitButton,
  StyledCancelButton
} from "./FormStyles";

const formSchema = Yup.object().shape({
  date: Yup.date().required("Required"),
  client: Yup.string(),
  newClient: Yup.string(),
  projectNr: Yup.string().required("Required"),
  currency: Yup.string(),
  payment: Yup.number()
});

const EditProjectForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const projectContext = useContext(ProjectContext);
  const alertContext = useContext(AlertContext);

  const {
    clients,
    loadingClients,
    currentProject,
    updateProject,
    clearCurrent,
    getCurrent,
    getClients
  } = projectContext;
  const { addAlert } = alertContext;

  useEffect(() => {
    console.log("---EditProjectForm: useEffect");
    if (loadingClients) {
      getClients();
    }
    if (id) {
      getCurrent(id);
    }

    return () => {
      console.log("---EditProjectForm: useEffect - clear on exit");
      clearCurrent();
    };
    // eslint-disable-next-line
  }, []);

  console.log("---EditProjectForm: rendering...");
  console.log("---EditProjectForm, loadingClients:", loadingClients);
  console.log("---EditProjectForm, currentProject:", currentProject);
  console.log("---EditProjectForm, clients:", clients);

  if (loadingClients || (id && !currentProject)) {
    return <Spinner />;
  }

  const initialValues = {
    date: moment(currentProject.date).format("YYYY-MM-DD"),
    client: currentProject.client,
    newClient: "",
    projectNr: currentProject.projectNr,
    currency: currentProject.currency,
    payment: currentProject.payment
  };

  const handleCancel = () => {
    clearCurrent();
    history.push("/");
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

            // Handle editing
            const editedFields = {};

            // Filter out only edited fields
            for (let field in values) {
              if (values[field] !== initialValues[field]) {
                editedFields[field] = values[field];
              }
            }

            updateProject({ ...editedFields, _id: currentProject._id });
            addAlert({
              msg: `Edited project "${values.projectNr}" from ${client}`,
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
            <StyledTitle>
              {currentProject ? "Edit Project" : "Add Project"}
            </StyledTitle>
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
              <StyledCancelButton type="button" onClick={handleCancel}>
                Cancel
              </StyledCancelButton>

              <StyledSubmitButton type="submit" disabled={isSubmitting}>
                Update
              </StyledSubmitButton>
            </StyledActionButtons>
          </StyledForm>
        )}
      />
    )
  );
};

EditProjectForm.propTypes = {
  history: PropTypes.object.isRequired
};

export default EditProjectForm;
