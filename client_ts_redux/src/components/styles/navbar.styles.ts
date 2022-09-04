import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
`;

export const StyledNavLink = styled(NavLink)`
  margin: 0 1.2rem;
  color: ${props => props.theme.lightPrimary};
  text-decoration: none;
  &.active {
    color: ${props => props.theme.text};
    font-weight: bold;
  }
`;

export const StyledLink = styled.a`
  margin: 0 1.2rem;
  color: ${props => props.theme.lightPrimary};
  text-decoration: none;
  cursor: pointer;
`;
