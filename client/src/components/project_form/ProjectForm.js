import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";

import AddClient from "./AddClient";
import Spinner from "../layout/Spinner";
import { fetchClients, selectAllClients } from "../../reducers/clientsSlice";
import {
  fetchProject,
  updateProject,
  createProject,
  clearSelectedProject
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
    client: selectedProject?.client ?? "",
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

const ProjectForm = () => {
  const history = useHistory();
  const { id } = useParams();

  const clients = useSelector(selectAllClients);
  const clientsLoading = useSelector(state => state.clients.loading);
  const projectLoading = useSelector(state => state.projects.projectLoading);
  const selectedProject = useSelector(state => state.projects.selectedProject);
  const dispatch = useDispatch();

  useEffect(() => {
    if (clients.length === 0) {
      dispatch(fetchClients());
    }

    if (id) {
      dispatch(fetchProject(id));
    }

    return () => {
      dispatch(clearSelectedProject());
    };
    // eslint-disable-next-line
  }, []);

  if (clientsLoading || projectLoading) {
    return <Spinner />;
  }

  /* "Add Project" form values */
  const initialValues = getInitialValues(selectedProject);

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <Fragment>
      <StyledTitle>
        {selectedProject ? "Edit Project" : "New Project"}
      </StyledTitle>
      <AddClient clients={clients} />
      {clients && (
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={(values, actions) => {
            const newProject = {
              ...values,
              payment: values.payment ?? 0,
              projectNr: values.projectNr.trim(),
              comments: values.comments.trim()
            };

            if (selectedProject) {
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
              <StyledFormGroup>
                <StyledLabel htmlFor="comments">Comments:</StyledLabel>
                <StyledField
                  name="comments"
                  component="textarea"
                  placeholder=""
                />
              </StyledFormGroup>
              {status && status.msg && <div>{status.msg}</div>}
              <StyledActionButtons>
                {selectedProject && (
                  <StyledCancelButton type="button" onClick={handleCancel}>
                    Cancel
                  </StyledCancelButton>
                )}
                <StyledSubmitButton type="submit" disabled={isSubmitting}>
                  {selectedProject ? "Update Project" : "Add Project"}
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
