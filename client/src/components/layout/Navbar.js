import React, { Fragment, useContext } from "react";

import ProjectContext from "../../context/project/projectContext";
import AuthContext from "../../context/auth/authContext";

import { StyledNav, StyledNavLink, StyledLink } from "../styles/navbar.styles";

const Navbar = () => {
  const projectContext = useContext(ProjectContext);
  const authContext = useContext(AuthContext);

  const { clearProjectData } = projectContext;
  const { isAuthenticated, loadingUser, logoutUser } = authContext;

  const handleLogout = () => {
    clearProjectData();
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
