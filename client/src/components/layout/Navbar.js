import React, { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import AuthContext from "../../context/auth/authContext";

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
`;
const StyledNavLink = styled(NavLink)`
  margin: 0 1.2rem;
  color: ${props => props.theme.lightPrimary};
  text-decoration: none;
`;
const StyledLink = styled.a`
  margin: 0 1.2rem;
  color: ${props => props.theme.lightPrimary};
  text-decoration: none;
  cursor: pointer;
`;

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loadingUser, logoutUser } = authContext;

  const handleLogout = () => logoutUser();

  const authLinks = (
    <Fragment>
      <StyledNavLink
        exact
        to="/"
        activeStyle={{
          fontWeight: "bold",
          color: "#fff"
        }}
      >
        Projects
      </StyledNavLink>
      <StyledNavLink
        to="/add"
        activeStyle={{
          fontWeight: "bold",
          color: "#fff"
        }}
      >
        Add Project
      </StyledNavLink>
      <StyledLink onClick={handleLogout}>Logout</StyledLink>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <StyledNavLink
        to="/login"
        activeStyle={{
          fontWeight: "bold",
          color: "#fff"
        }}
      >
        Login
      </StyledNavLink>
      <StyledNavLink
        to="/registration"
        activeStyle={{
          fontWeight: "bold",
          color: "#fff"
        }}
      >
        Register
      </StyledNavLink>
    </Fragment>
  );

  if (!isAuthenticated && loadingUser) {
    return null;
  }

  return (
    <StyledNav>
      {!isAuthenticated && !loadingUser ? guestLinks : authLinks}
    </StyledNav>
  );
};

export default Navbar;
