import styled from "styled-components";

export const StyledDialogue = styled.div`
  position: relative;
  padding: 2rem 3rem;
  background-color: ${props => props.theme.container};
  z-index: 100;
`;

export const StyledHeading = styled.h2`
  margin-top: 0;
`;

export const StyledActions = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const StyledButton = styled.button`
  display: block;
  padding: 0.6rem 1.5rem;
  margin: 2rem auto 0;
  border: none;
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.accent};
  cursor: pointer;
  transition: 0.2s color;
  &:hover {
    color: ${props => props.theme.lightPrimary};
  }
`;

export const StyledYesButton = styled(StyledButton)`
  background-color: ${props => props.theme.primary};
`;
