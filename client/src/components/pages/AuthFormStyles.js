import styled from "styled-components";
import { Form, Field, ErrorMessage } from "formik";

export const StyledForm = styled(Form)`
  padding: 1rem 2rem;
`;
export const StyledTitle = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  padding-top: 1rem;
  margin-top: 0;
`;
export const StyledFormGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 0.5rem;
`;
export const StyledLabel = styled.label`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 0.5rem;
`;
export const StyledField = styled(Field)`
  max-width: 300px;
  padding: 0.2rem;
`;
export const StyledErrorMessage = styled(ErrorMessage)`
  grid-column-start: 2;
  margin-top: 0.4rem;
  color: ${props => props.theme.darkPrimary};
`;
export const StyledActionButtons = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem auto 0;
`;
export const StyledButton = styled.button`
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
export const StyledSubmitButton = styled(StyledButton)`
  background-color: ${props => props.theme.mediumseagreen};
`;
