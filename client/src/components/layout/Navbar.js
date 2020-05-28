import React, { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import ProjectContext from "../../context/project/projectContext";
import ClientContext from "../../context/client/clientContext";
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
  const projectContext = useContext(ProjectContext);
  const clientContext = useContext(ClientContext);
  const authContext = useContext(AuthContext);

  const { clearProjectData } = projectContext;
  const { clearClientData } = clientContext;
  const { isAuthenticated, loadingUser, logoutUser } = authContext;

  const handleLogout = () => {
    clearProjectData();
    clearClientData();
    logoutUser();
  };

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
    return <StyledNav>{guestLinks}</StyledNav>;
  }

  return (
    <StyledNav>
      {!isAuthenticated && !loadingUser ? guestLinks : authLinks}
    </StyledNav>
  );
};

export default Navbar;
