import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import AuthContext from "../../context/auth/authContext";

const formSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required")
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
const StyledErrorMessage = styled(ErrorMessage)`
  grid-column-start: 2;
  margin-top: 0.4rem;
  color: ${props => props.theme.darkPrimary};
`;
const StyledActionButtons = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem auto 0;
`;
const StyledButton = styled.button`
  display: block;
  padding: 0.6rem 1.5rem;
  border: none;
  color: ${props => props.theme.text};
  cursor: pointer;
  transition: 0.2s color;
  &:hover {
    color: ${props => props.theme.lightPrimary};
  }
`;
const StyledSubmitButton = styled(StyledButton)`
  background-color: ${props => props.theme.mediumseagreen};
`;

const Registration = ({ history }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loginUser } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

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

export default Registration;
