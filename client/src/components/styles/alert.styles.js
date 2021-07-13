import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const StyledAlert = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  text-align: center;
  padding: 0.4rem;
  border-radius: 8px 8px 0 0;
  background-color: #000000b8;
  color: ${props => props.theme.text};
  font-size: 0.8rem;
  opacity: ${({ state }) => {
    switch (state) {
      case "entering":
        return 0;
      case "entered":
        return 1;
      case "exiting":
        return 1;
      case "exited":
        return 0;
      default:
        return 0;
    }
  }};
  transform: ${({ state }) => {
    switch (state) {
      case "entering":
        return "translateY(20px) translateX(-50%)";
      case "entered":
        return "translateY(0) translateX(-50%)";
      case "exiting":
        return "translateY(0) translateX(-50%)";
      case "exited":
        return "translateY(20px) translateX(-50%)";
      default:
        return "translateY(20px) translateX(-50%)";
    }
  }};
  transition: ${({ duration }) =>
    `opacity ${duration}ms, transform ${duration}ms`};
  & p {
    margin: 0.5rem;
    span {
      color: tomato;
    }
  }
  z-index: 20;
`;

export const StyledTypeIcon = styled(FontAwesomeIcon)`
  font-size: 1.8rem;
  color: ${props => props.theme.lightPrimary};
  margin: 0 0.7rem 0 0.35rem;
`;

export const StyledCloseIcon = styled(FontAwesomeIcon)`
  font-size: 1.2rem;
  cursor: pointer;
  margin: 0 0.35rem 0 0.7rem;
  transition: color 0.2s;
  &:hover {
    color: ${props => props.theme.primary};
  }
`;
