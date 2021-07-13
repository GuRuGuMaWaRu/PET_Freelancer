import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const StyledAlertList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledAlert = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  text-align: center;
  padding: .4rem;
  border-radius: 0 0 8px 8px;
  background-color: #000000b8;
  color: ${props => props.theme.text}
  font-size: .8rem;
  opacity: ${({ state }) => {
    switch (state) {
      case "entering":
        return 0;
      case "entered":
        return 1;
      case "exiting":
        return 0;
      case "exited":
        return 0;
      default:
        return 0;
    }
  }}
  transition: ${({ duration }) => `opacity ${duration}ms ease-in-out`};
  & p {
    margin: 0.5rem;
    span {
      color: tomato;
    }
  }
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
