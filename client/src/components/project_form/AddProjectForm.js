import React, { useEffect, useContext, Fragment } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import * as Yup from "yup";
import { Formik } from "formik";

import AddClient from "./AddClient";
import Spinner from "../layout/Spinner";
import ProjectContext from "../../context/project/projectContext";
import { fetchClients, selectAllClients } from "../../reducers/clientsSlice";
import {
  StyledForm,
  StyledTitle,
  StyledFormGroup,
  StyledLabel,
  StyledField,
  StyledErrorMessage,
  StyledActionButtons,
  StyledSubmitButton
} from "../styles/form.styles";

const formSchema = Yup.object().shape({
  date: Yup.date().required("Required"),
  client: Yup.string().required("Required"),
  projectNr: Yup.string().required("Required"),
  currency: Yup.string(),
  payment: Yup.number().required("Required")
});

const AddProjectForm = ({ history }) => {
  const clients = useSelector(selectAllClients);
  const clientsLoading = useSelector(state => state.clients.loading);
  const dispatch = useDispatch();

  const projectContext = useContext(ProjectContext);

  const { createProject } = projectContext;

  useEffect(() => {
    if (clients.length === 0) {
      dispatch(fetchClients());
    }
    // eslint-disable-next-line
  }, []);

  if (clientsLoading) {
    setTimeout(() => {
      return <Spinner />;
    }, 1000);
  }

  const initialValues = {
    date: moment().format("YYYY-MM-DD"),
    client: "",
    projectNr: "",
    currency: "USD",
    payment: 0
  };

  return (
    <Fragment>
      <StyledTitle>New Project</StyledTitle>
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

              createProject(values, client);
              // addAlert({
              //   msg: `Added new project "${values.projectNr}" from ${client}`,
              //   type: "info"
              // });

              actions.setSubmitting(false);
              history.push("/");
            } catch (err) {
              console.log(err);
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
                <StyledSubmitButton type="submit" disabled={isSubmitting}>
                  Add Project
                </StyledSubmitButton>
              </StyledActionButtons>
            </StyledForm>
          )}
        </Formik>
      )}
    </Fragment>
  );
};

AddProjectForm.propTypes = {
  history: PropTypes.object.isRequired
};

export default AddProjectForm;
