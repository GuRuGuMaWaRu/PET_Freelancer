import styled from "styled-components";
import { Form, Field, ErrorMessage } from "formik";

export const StyledForm = styled(Form)`
  padding: 1rem 2rem;
  ${"" /* margin: 0 20%; */}
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
  color: ${props => props.theme.primary};
`;
export const StyledStatusMessage = styled.div`
  grid-column-start: 2;
  margin-top: 0.4rem;
  color: ${props => props.theme.primary};
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
export const StyledCancelButton = styled(StyledButton)`
  margin-right: 1rem;
  background-color: ${props => props.theme.secondaryText};
`;
export const StyledAddClientGroup = styled.div`
  display: flex;
  width: 300px;
`;
export const StyledAddClientButton = styled.button`
  flex: 2;
  border: none;
  margin-left: 0.7rem;
  background-color: #d3c9c9;
  cursor: pointer;
  transition: 0.2s background-color;
  &:hover {
    background-color: #bcafaf;
  }
`;
