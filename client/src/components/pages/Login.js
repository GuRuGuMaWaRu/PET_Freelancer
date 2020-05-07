import React, { useContext } from "react";
import * as Yup from "yup";
import { Formik } from "formik";

import AuthContext from "../../context/auth/authContext";
import {
  StyledForm,
  StyledTitle,
  StyledFormGroup,
  StyledLabel,
  StyledField,
  StyledErrorMessage,
  StyledActionButtons,
  StyledSubmitButton
} from "./AuthFormStyles";

const formSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required")
});

const Login = () => {
  const authContext = useContext(AuthContext);
  const { loginUser } = authContext;

  console.log("---Login: rendering...");
  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={formSchema}
      onSubmit={async (values, actions) => {
        try {
          loginUser(values);

          actions.setSubmitting(false);
        } catch (err) {
          console.log(err);
          actions.setSubmitting(false);
          actions.setStatus({ msg: "Something went wrong" });
        }
      }}
      render={({ errors, status, touched, isSubmitting }) => (
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
    />
  );
};

export default Login;
