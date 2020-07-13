import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";

import { createClient } from "../../reducers/clientsSlice";

import {
  StyledForm,
  StyledFormGroup,
  StyledLabel,
  StyledField,
  StyledErrorMessage,
  StyledAddClientGroup,
  StyledAddClientButton,
  StyledStatusMessage
} from "../styles/form.styles";

const formSchema = Yup.object().shape({
  client: Yup.string().required("Required")
});

const AddClient = ({ clients }) => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ client: "" }}
      validationSchema={formSchema}
      onSubmit={async (values, actions) => {
        try {
          const newClient = values.client.trim();

          if (
            clients.some(
              client => client.name.toLowerCase() === newClient.toLowerCase()
            )
          ) {
            throw "There is already a client with this name";
          }

          dispatch(createClient(newClient));
          values.client = "";
          actions.setSubmitting(false);
        } catch (err) {
          actions.setSubmitting(false);
          actions.setStatus({ msg: err });
          setTimeout(() => actions.setStatus({ msg: "" }), 2000);
        }
      }}
    >
      {({ status, isSubmitting }) => (
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
            <StyledStatusMessage status={status}>
              {status && status.msg}
            </StyledStatusMessage>
          </StyledFormGroup>
        </StyledForm>
      )}
    </Formik>
  );
};

AddClient.propTypes = {
  clients: PropTypes.array.isRequired
};

export default AddClient;
