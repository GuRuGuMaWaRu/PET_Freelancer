import React, { Fragment } from "react";

import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { logoutUser } from "../../store/reducers/authSlice";
import { StyledNav, StyledNavLink, StyledLink } from "../styles/navbar.styles";

const activeStyle = {
  fontWeight: "bold",
  color: "#fff"
};

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const authLinks = (
    <Fragment>
      <StyledNavLink exact to="/" activeStyle={activeStyle}>
        Projects
      </StyledNavLink>
      <StyledNavLink to="/add" activeStyle={activeStyle}>
        Add Project
      </StyledNavLink>
      <StyledLink onClick={handleLogout}>Logout</StyledLink>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <StyledNavLink to="/login" activeStyle={activeStyle}>
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

  if (!isAuthenticated) {
    return <StyledNav>{guestLinks}</StyledNav>;
  }

  return <StyledNav>{authLinks}</StyledNav>;
};

export default Navbar;
