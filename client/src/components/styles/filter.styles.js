import styled from "styled-components";

export const StyledFilterList = styled.div`
  display: flex;
  justify-content: start;
  padding: 1rem 2rem 0;
`;

export const StyledFilterItem = styled.div`
  padding: 0.3rem 0.7rem;
  border: ${props => `1px solid ${props.theme.secondaryText}`};
  border-radius: 0.8rem;
  cursor: pointer;
  transition: color 0.1s ease-in-out, 0.1s background-color ease-in-out;
  &:hover {
    background-color: ${props => props.theme.secondaryText};
    color: ${props => props.theme.text};
  }
`;
