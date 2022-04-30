import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const setNotificationColor = props => {
  switch (props.msgtype) {
    case "create":
      return props.theme.notificationCreate;
    case "delete":
      return props.theme.notificationDelete;
    case "error":
    case "fail":
      return props.theme.notificationError;
    default:
      return "#fff";
  }
};

export const StyledAlert = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  text-align: center;
  border-radius: 8px 8px 0 0;
  background-color: ${props => props.theme.notificationBg};
  color: ${props => props.theme.text};
  font-size: 1rem;
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
  & div {
    margin-right: 2rem;
    border-radius: 8px 0 0 0;
    background-color: ${setNotificationColor};
  }
  & p {
    margin: 0.5rem;
    span {
      color: ${setNotificationColor};
    }
  }
  z-index: 20;
`;

export const StyledTypeIcon = styled(FontAwesomeIcon)`
  font-size: 3.2rem;
  color: ${props => props.theme.notificationBg};
  margin: 0.8rem 1.2rem 0.8rem 1.2rem;
`;

export const StyledCloseIcon = styled(FontAwesomeIcon)`
  font-size: 1.6rem;
  cursor: pointer;
  margin: 0 1.5rem 0 2.7rem;
  transition: color 0.2s;
  &:hover {
    color: ${props => props.theme.primary};
  }
`;
