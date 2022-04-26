import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../../reducers/authSlice";
import { StyledNav, StyledNavLink, StyledLink } from "../styles/navbar.styles";

const activeStyle = {
  fontWeight: "bold",
  color: "#fff"
};

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const loadingUser = useSelector(state => state.auth.loading);

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
