import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import * as Yup from "yup";
import { Formik } from "formik";

import AddClient from "./AddClient";
import Spinner from "../layout/Spinner";
import { fetchClients, selectAllClients } from "../../reducers/clientsSlice";
import {
  fetchProject,
  updateProject,
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

const formSchema = Yup.object().shape({
  date: Yup.date().required("Required"),
  client: Yup.string().required("Required"),
  projectNr: Yup.string().required("Required"),
  currency: Yup.string(),
  payment: Yup.number().required("Required")
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

  /* Add Project Form values */
  let initialValues = {
    date: moment().format("YYYY-MM-DD"),
    client: "",
    projectNr: "",
    currency: "USD",
    payment: 0
  };

  /* Edit Project Form values */
  if (selectedProject) {
    initialValues = {
      date: moment(selectedProject.date).format("YYYY-MM-DD"),
      client: selectedProject.client,
      projectNr: selectedProject.projectNr,
      currency: selectedProject.currency,
      payment: selectedProject.payment
    };
  }

  const handleCancel = () => {
    dispatch(clearSelectedProject());
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

              if (selectedProject) {
                dispatch(
                  updateProject({ editedFields, _id: selectedProject._id })
                );
              } else {
              }

              actions.setSubmitting(false);
              history.push("/");
            } catch (err) {
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
