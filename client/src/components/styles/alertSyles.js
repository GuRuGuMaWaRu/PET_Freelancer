import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const StyledAlertList = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 80%;
  top: 80px;
`;

export const StyledAlert = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 1rem;
  border: 8px solid ${props => props.theme.lightPrimary};
  border-radius: 8px;
  background-color: #fff;
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
`;

export const StyledTypeIcon = styled(FontAwesomeIcon)`
  font-size: 2rem;
  color: ${props => props.theme.lightPrimary};
`;

export const StyledCloseIcon = styled(FontAwesomeIcon)`
  font-size: 1.4rem;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: ${props => props.theme.primary};
  }
`;
