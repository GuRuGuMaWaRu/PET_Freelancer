import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const StyledProject = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: dotted 2px ${props => props.theme.divider};
`;

export const StyledProjectDetails = styled.div`
  margin-left: 2rem;
`;

export const StyledProjectControls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-self: flex-end;
  align-items: center;
`;

export const StyledPaymentControl = styled.button`
  margin-right: 1.4rem;
  cursor: pointer;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 1.4rem;
  color: ${props => props.theme.secondaryText};
  cursor: pointer;
  transition: 0.2s color;
`;

export const StyledDeleteIcon = styled(StyledIcon)`
  &:hover {
    color: ${props => props.theme.darkPrimary};
  }
`;

export const StyledEditIcon = styled(StyledIcon)`
  &:hover {
    color: ${props => props.theme.mediumseagreen};
  }
`;

export const StyledLink = styled(Link)`
  display: flex;
`;

export const StyledNoProjectsMsg = styled.h3`
  text-align: center;
  padding-top: 2rem;
  margin-top: 0;
`;
