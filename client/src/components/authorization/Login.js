import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";

import { useAppDispatch } from "../../hooks";
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
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={formSchema}
      onSubmit={(values, actions) => {
        dispatch(loginUser(values));
        actions.setSubmitting(false);
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
          {status?.msg && <div>{status.msg}</div>}
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
