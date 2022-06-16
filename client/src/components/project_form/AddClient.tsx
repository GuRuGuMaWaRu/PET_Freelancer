import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik } from "formik";

import { useAppDispatch } from "../../hooks/redux";
import { createClient } from "../../store/reducers/clientsSlice";
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
import type { IClient } from "../../types";

const formSchema = Yup.object().shape({
  client: Yup.string().required("Required")
});

interface IProps {
  clients: IClient[];
}

const AddClient:React.FC<IProps> = ({ clients }) => {
  const dispatch = useAppDispatch();

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
            throw new Error("There is already a client with this name");
          }

          dispatch(createClient(newClient));
          values.client = "";
          actions.setSubmitting(false);
        } catch (err) {
          console.error(err);
          actions.setSubmitting(false);

          if (err instanceof Error) {
            actions.setStatus({ msg: err.message });
          }
          
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
            <StyledStatusMessage>{status && status.msg}</StyledStatusMessage>
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
