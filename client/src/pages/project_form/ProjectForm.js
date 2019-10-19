import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment";
import styled from "styled-components";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Spinner from "../../layout/Spinner";

const formSchema = Yup.object().shape({
  date: Yup.date().required("Required"),
  client: Yup.string(),
  newClient: Yup.string(),
  projectNr: Yup.string().required("Required"),
  currency: Yup.string().required("Required"),
  payment: Yup.number().required("Required")
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
const StyledSubmitButton = styled.button`
  display: block;
  margin: 1rem auto 0;
`;

const ProjectForm = ({ history, showAlert }) => {
  const [clients, setClients] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const getClients = async () => {
      const { data: clients } = await axios.get("/clients");
      setClients(clients);
      setLoading(false);
    };

    getClients();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    clients && (
      <Formik
        initialValues={{
          date: moment().format("YYYY-MM-DD"),
          client: "",
          newClient: "",
          projectNr: "",
          currency: "USD",
          payment: ""
        }}
        validationSchema={formSchema}
        onSubmit={async (values, actions) => {
          try {
            values.newClient = values.newClient.trim();
            values.projectNr = values.projectNr.trim();
            await axios.post("/projects", values);
            actions.setSubmitting(false);
            showAlert(
              `Added new project (${values.projectNr}) from ${
                clients.filter(client => client._id === values.client)[0].name
              }`
            );
            history.push("/");
          } catch (err) {
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
              <ErrorMessage name="date" component="div" />
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
              <ErrorMessage name="client" component="div" />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel htmlFor="newClient">New client:</StyledLabel>
              <StyledField type="text" name="newClient" />
              <ErrorMessage name="newClient" component="div" />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel htmlFor="projectNr">* Project Nr:</StyledLabel>
              <StyledField type="text" name="projectNr" />
              <ErrorMessage name="projectNr" component="div" />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel htmlFor="currency">Currency:</StyledLabel>
              <StyledField name="currency" component="select">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </StyledField>
              <ErrorMessage name="currency" component="div" />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel htmlFor="payment">* Payment:</StyledLabel>
              <StyledField type="number" name="payment" />
              <ErrorMessage name="payment" component="div" />
            </StyledFormGroup>
            {status && status.msg && <div>{status.msg}</div>}
            <StyledSubmitButton type="submit" disabled={isSubmitting}>
              Add
            </StyledSubmitButton>
          </StyledForm>
        )}
      />
    )
  );
};

ProjectForm.propTypes = {
  showAlert: PropTypes.func.isRequired
};

export default ProjectForm;
