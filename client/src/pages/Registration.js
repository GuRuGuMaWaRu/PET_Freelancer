import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import styled from "styled-components";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const formSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  password1: Yup.string().required("Required"),
  password2: Yup.string().required("Required")
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
          const res = await axios.post("/users", values, {
            headers: { "Content-Type": "application/json" }
          });

          localStorage.setItem("token", res.data.token);
          actions.setSubmitting(false);
        } catch (err) {
          console.log(err);
          actions.setSubmitting(false);
          actions.setStatus({ msg: "Something went wrong" });
        }
      }}
      render={({ errors, status, touched, isSubmitting }) => (
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
    />
  );
};

Registration.propTypes = {
  history: PropTypes.object.isRequired
};

export default Registration;
