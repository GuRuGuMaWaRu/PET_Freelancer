import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";

import { registerUser } from "../../reducers/authSlice";
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
  name: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  password1: Yup.string().required("Required"),
  password2: Yup.string().required("Required")
});

const Registration = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password1: "",
        password2: ""
      }}
      validationSchema={formSchema}
      onSubmit={async (values, actions) => {
        try {
          dispatch(registerUser(values));
          actions.setSubmitting(false);
        } catch (err) {
          // looks like this is never called even if there was an error in registerUser
          // No matter, I can set notifications inside reducers
          // But it would be satisfying to make this work as well - after all it SHOULD work
          actions.setSubmitting(false);
          actions.setStatus({ msg: "Something went wrong" });
        }
      }}
    >
      {({ status, isSubmitting }) => (
        <StyledForm>
          <StyledTitle>Registration</StyledTitle>
          <StyledFormGroup>
            <StyledLabel htmlFor="name">Name:</StyledLabel>
            <StyledField type="text" name="name" />
            <StyledErrorMessage name="name" component="div" />
          </StyledFormGroup>
          <StyledFormGroup>
            <StyledLabel htmlFor="email">Email:</StyledLabel>
            <StyledField type="email" name="email" />
            <StyledErrorMessage name="email" component="div" />
          </StyledFormGroup>
          <StyledFormGroup>
            <StyledLabel htmlFor="password1">Password:</StyledLabel>
            <StyledField type="password" name="password1" />
            <StyledErrorMessage name="password1" component="div" />
          </StyledFormGroup>
          <StyledFormGroup>
            <StyledLabel htmlFor="password2">Repeat password:</StyledLabel>
            <StyledField type="password" name="password2" />
            <StyledErrorMessage name="password2" component="div" />
          </StyledFormGroup>
          {status && status.msg && <div>{status.msg}</div>}
          <StyledActionButtons>
            <StyledSubmitButton type="submit" disabled={isSubmitting}>
              Register
            </StyledSubmitButton>
          </StyledActionButtons>
        </StyledForm>
      )}
    </Formik>
  );
};

Registration.propTypes = {
  history: PropTypes.object.isRequired
};

export default Registration;
