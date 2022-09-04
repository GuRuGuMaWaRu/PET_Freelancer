import React, { Fragment } from "react";

import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { logoutUser } from "../../store/reducers/authSlice";
import { StyledNav, StyledNavLink, StyledLink } from "../styles/navbar.styles";

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const authStatus = useAppSelector(state => state.auth.status);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const authLinks = (
    <Fragment>
      <StyledNavLink to="/projects">Projects</StyledNavLink>
      <StyledNavLink to="/add">Add Project</StyledNavLink>
      <StyledLink onClick={handleLogout}>Logout</StyledLink>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <StyledNavLink to="/login">Login</StyledNavLink>
      <StyledNavLink to="/registration">Register</StyledNavLink>
    </Fragment>
  );

  if (authStatus === "loading") return null;

  if (!user) {
    return <StyledNav>{guestLinks}</StyledNav>;
  }

  return <StyledNav>{authLinks}</StyledNav>;
};

export default Navbar;
