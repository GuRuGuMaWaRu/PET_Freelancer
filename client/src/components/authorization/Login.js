import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";

import { loginUser } from "../../reducers/authSlice";
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
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required")
});

const Login = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={formSchema}
      onSubmit={async (values, actions) => {
        try {
          dispatch(loginUser(values));

          actions.setSubmitting(false);
        } catch (err) {
          actions.setSubmitting(false);
          actions.setStatus({ msg: "Something went wrong" });
        }
      }}
    >
      {({ status, isSubmitting }) => (
        <StyledForm>
          <StyledTitle>Login</StyledTitle>
          <StyledFormGroup>
            <StyledLabel htmlFor="email">Email:</StyledLabel>
            <StyledField type="email" name="email" />
            <StyledErrorMessage name="email" component="div" />
          </StyledFormGroup>
          <StyledFormGroup>
            <StyledLabel htmlFor="password">Password:</StyledLabel>
            <StyledField type="password" name="password" />
            <StyledErrorMessage name="password" component="div" />
          </StyledFormGroup>
          {status && status.msg && <div>{status.msg}</div>}
          <StyledActionButtons>
            <StyledSubmitButton type="submit" disabled={isSubmitting}>
              Login
            </StyledSubmitButton>
          </StyledActionButtons>
        </StyledForm>
      )}
    </Formik>
  );
};

export default Login;
