import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";

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
  return (
    <Formik
      initialValues={{ client: "" }}
      validationSchema={formSchema}
      onSubmit={async (values, actions) => {
        try {
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
                Add
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
