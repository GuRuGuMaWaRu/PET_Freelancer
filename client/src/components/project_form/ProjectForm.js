import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";

import AddClient from "./AddClient";
import { selectAllClients } from "../../reducers/clientsSlice";
import {
  updateProject,
  createProject,
  selectProjectById
} from "../../reducers/projectsSlice";
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
} from "../styles/form.styles";

const getInitialValues = selectedProject => {
  return {
    date: selectedProject
      ? new Date(selectedProject.date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    client: selectedProject?.client._id ?? "",
    projectNr: selectedProject?.projectNr ?? "",
    currency: selectedProject?.currency ?? "USD",
    payment: selectedProject?.payment ?? 0,
    comments: selectedProject?.comments ?? ""
  };
};

const formSchema = Yup.object().shape({
  date: Yup.date().required("Required"),
  client: Yup.string().required("Required"),
  projectNr: Yup.string().required("Required"),
  currency: Yup.string(),
  payment: Yup.number(),
  comments: Yup.string()
});

const ProjectForm = ({ match }) => {
  const history = useHistory();
  const { projectId } = match.params;

  const clients = useSelector(selectAllClients);
  const selectedProject = useSelector(state =>
    selectProjectById(state, projectId)
  );

  const dispatch = useDispatch();

  const initialValues = getInitialValues(selectedProject);

  const handleCancel = () => {
    history.push("/");
  };

  const clientOptions = clients.map(client => (
    <option key={client._id} value={client._id}>
      {client.name}
    </option>
  ));

  return (
    <Fragment>
      <StyledTitle>{projectId ? "Edit Project" : "New Project"}</StyledTitle>
      <AddClient clients={clients} />
      {clients && (
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          enableReinitialize
          onSubmit={(values, actions) => {
            const newProject = {
              ...values,
              payment: values.payment ?? 0,
              projectNr: values.projectNr.trim(),
              comments: values.comments.trim()
            };

            if (projectId) {
              const editedFields = {};

              // Filter out only edited fields
              for (let field in values) {
                if (values[field] !== initialValues[field]) {
                  editedFields[field] = values[field];
                }
              }

              dispatch(
                updateProject({ id: selectedProject._id, editedFields })
              );
            } else {
              const clientName = clients.find(
                client => client._id === values.client
              ).name;
              dispatch(createProject({ newProject, clientName }));
            }
            actions.setSubmitting(false);
            history.push("/");
          }}
        >
          {props => (
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
                  {clients && clientOptions}
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
              <StyledFormGroup>
                <StyledLabel htmlFor="comments">Comments:</StyledLabel>
                <StyledField
                  name="comments"
                  component="textarea"
                  placeholder=""
                />
              </StyledFormGroup>
              {props.status && props.status.msg && (
                <div>{props.status.msg}</div>
              )}
              <StyledActionButtons>
                {projectId && (
                  <StyledCancelButton type="button" onClick={handleCancel}>
                    Cancel
                  </StyledCancelButton>
                )}
                <StyledSubmitButton type="submit" disabled={props.isSubmitting}>
                  {projectId ? "Update Project" : "Add Project"}
                </StyledSubmitButton>
              </StyledActionButtons>
            </StyledForm>
          )}
        </Formik>
      )}
    </Fragment>
  );
};

export default ProjectForm;
