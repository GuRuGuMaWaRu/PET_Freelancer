import styled from "styled-components";

export const StyledDialogue = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 10rem;
  background-color: ${props => props.theme.container};
  border-radius: 9px;

  padding: 3rem 4rem;
  box-shadow: 0 4rem 6rem rgba(0, 0, 0, 0.25);
  z-index: 1000;
  transition: all 0.5s;
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
