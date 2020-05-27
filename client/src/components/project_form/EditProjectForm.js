import React, { useEffect, useContext, Fragment } from "react";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import * as Yup from "yup";
import { Formik } from "formik";

import AddClient from "./AddClient";
import Spinner from "../layout/Spinner";
import ProjectContext from "../../context/project/projectContext";
import ClientContext from "../../context/client/clientContext";
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
} from "./formStyles";

const formSchema = Yup.object().shape({
  date: Yup.date().required("Required"),
  client: Yup.string().required("Required"),
  projectNr: Yup.string().required("Required"),
  currency: Yup.string(),
  payment: Yup.number().required("Required")
});

const EditProjectForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const projectContext = useContext(ProjectContext);
  const clientContext = useContext(ClientContext);
  const alertContext = useContext(AlertContext);

  const {
    currentProject,
    updateProject,
    clearCurrent,
    getCurrent
  } = projectContext;
  const { clients, loadingClients, getClients } = clientContext;
  const { addAlert } = alertContext;

  useEffect(() => {
    // console.log("---EditProjectForm: useEffect");
    if (loadingClients) {
      getClients();
    }
    if (id) {
      getCurrent(id);
    }

    return () => {
      // console.log("---EditProjectForm: useEffect - clear on exit");
      clearCurrent();
    };
    // eslint-disable-next-line
  }, []);

  // console.log("---EditProjectForm: rendering...");
  // console.log("---EditProjectForm, loadingClients:", loadingClients);
  // console.log("---EditProjectForm, currentProject:", currentProject);
  // console.log("---EditProjectForm, clients:", clients);

  if (loadingClients || (id && !currentProject)) {
    return <Spinner />;
  }

  const initialValues = {
    date: moment(currentProject.date).format("YYYY-MM-DD"),
    client: currentProject.client,
    projectNr: currentProject.projectNr,
    currency: currentProject.currency,
    payment: currentProject.payment
  };

  const handleCancel = () => {
    clearCurrent();
    history.push("/");
  };

  return (
    <Fragment>
      <StyledTitle>Edit Project</StyledTitle>
      <AddClient clients={clients} />
      {clients && (
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={async (values, actions) => {
            try {
              values.projectNr = values.projectNr.trim();

              // Get client name to display inside alert message
              const client = clients.find(
                client => client._id === values.client
              ).name;

              // Handle editing
              const editedFields = {};

              // Filter out only edited fields
              for (let field in values) {
                if (values[field] !== initialValues[field]) {
                  editedFields[field] = values[field];
                }
              }
              // console.log("editedFields:", editedFields);
              updateProject({ editedFields, _id: currentProject._id });
              addAlert({
                msg: `Edited project "${values.projectNr}" from ${client}`,
                type: "info"
              });

              actions.setSubmitting(false);
              history.push("/");
            } catch (err) {
              // console.log(err);
              actions.setSubmitting(false);
              actions.setStatus({ msg: "Something went wrong" });
            }
          }}
        >
          {({ status, isSubmitting }) => (
            <StyledForm>
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
                  Update Project
                </StyledSubmitButton>
              </StyledActionButtons>
            </StyledForm>
          )}
        </Formik>
      )}
    </Fragment>
  );
};

EditProjectForm.propTypes = {
  history: PropTypes.object.isRequired
};

export default EditProjectForm;
