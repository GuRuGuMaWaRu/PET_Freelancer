import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IStyledFilterItemProps {
  native?: boolean;
  selected: boolean;
}

export const StyledCancelAllBtn = styled.div`
  padding: 0.2rem 0.6rem;
  border: ${props => `1px solid ${props.theme.text}`};
  border-radius: 0.8rem;
  margin: 0.2rem;
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.primary};
  cursor: pointer;
  transition: color 0.1s ease-in-out, 0.1s background-color ease-in-out;
  &:hover {
    background-color: ${props => props.theme.darkPrimary};
  }
`;

export const StyledFilterList = styled.div`
  ${"" /* display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  grid-gap: 5px;
  grid-auto-flow: dense; */}
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 1rem 2rem 1rem;
`;

export const StyledFilterItem = styled.div<IStyledFilterItemProps>`
  padding: 0.2rem 0.6rem;
  border: ${props =>
    `1px solid ${
      props.native ? props.theme.nativeSelector : props.theme.secondaryText
    }`};
  border-radius: 0.8rem;
  margin: .2rem;
  background-color: ${props =>
    props.selected
      ? props.native
        ? props.theme.nativeSelector
        : props.theme.secondaryText
      : "inherit"}
  color: ${props =>
    props.selected
      ? props.theme.text
      : props.native
      ? props.theme.nativeSelector
      : "inherit"};
  cursor: pointer;
  transition: color 0.1s ease-in-out, 0.1s background-color ease-in-out;
  &:hover {
    background-color: ${props =>
      props.native ? props.theme.nativeSelector : props.theme.secondaryText};
    color: ${props => props.theme.text};
  }
`;

export const StyledMarkIcon = styled(FontAwesomeIcon)`
  margin-right: 0.3rem;
`;

export const StyledBtnIcon = styled(FontAwesomeIcon)`
  margin-right: 0.3rem;
`;
