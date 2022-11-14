/** @jsxImportSource @emotion/react */
import { NavLink, Outlet } from "react-router-dom";

import * as colors from "../styles/colors";
import { useAuth } from "../context";
import { Button } from "../components";

function TopBar() {
  const { user, logout } = useAuth();

  return (
    <div
      css={{
        position: "absolute",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridGap: "10px",
        alignItems: "center",
        top: "10px",
        right: "10px",
      }}
    >
      <div>Hi, {user?.name}</div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}

function Nav() {
  return (
    <div css={{ position: "relative" }}>
      <nav css={{ position: "sticky" }}>
        <ul
          css={{
            listStyle: "none",
            padding: 0,
            marginTop: 0,
          }}
        >
          <li>
            <NavLink to="/">Main</NavLink>
          </li>
          <li>
            <NavLink to="projects">Projects</NavLink>
          </li>
          <li>
            <NavLink to="clients">Clients</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function Root() {
  return (
    <div
      css={{
        height: "100vh",
        backgroundColor: colors.base,
        color: colors.text,
      }}
    >
      <TopBar />
      <div css={{ paddingTop: "50px" }}>
        <Nav />
        <Outlet />
      </div>
    </div>
  );
}

export { Root };
