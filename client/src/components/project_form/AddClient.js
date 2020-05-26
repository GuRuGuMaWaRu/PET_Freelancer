import React, { useContext } from "react";
import * as Yup from "yup";
import { Formik } from "formik";

import ClientContext from "../../context/client/clientContext";

import {
  StyledForm,
  StyledFormGroup,
  StyledLabel,
  StyledField,
  StyledErrorMessage,
  StyledAddClientGroup,
  StyledAddClientButton
} from "./formStyles";

const formSchema = Yup.object().shape({
  client: Yup.string()
});

const AddClient = () => {
  const clientContext = useContext(ClientContext);

  const { createClient } = clientContext;

  return (
    <Formik
      initialValues={{ client: "" }}
      validationSchema={formSchema}
      onSubmit={async (values, actions) => {
        try {
          createClient(values);
          actions.setSubmitting(false);
        } catch (err) {
          console.log(err);
          actions.setSubmitting(false);
          actions.setStatus({ msg: "Something went wrong" });
        }
      }}
      render={({ errors, status, touched, isSubmitting }) => (
        <StyledForm>
          <StyledFormGroup>
            <StyledLabel htmlFor="client">New Client:</StyledLabel>
            <StyledAddClientGroup>
              <StyledField type="text" name="client" />
              <StyledAddClientButton type="submit" disabled={isSubmitting}>
                Add Client
              </StyledAddClientButton>
            </StyledAddClientGroup>
            <StyledErrorMessage name="client" component="div" />
          </StyledFormGroup>
        </StyledForm>
      )}
    />
  );
};

export default AddClient;
