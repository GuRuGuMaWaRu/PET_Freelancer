/** @jsxImportSource @emotion/react */
import { NavLink, Outlet, useLocation } from "react-router-dom";

import * as colors from "../styles/colors";
import * as mq from "../styles/media-queries";
import { useAuth } from "../context";
import { Button } from "../components";

function TopBar() {
  const { user, logout } = useAuth();

  return (
    <div
      css={{
        gridColumn: "5 / 5",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridGap: "20px",
        alignItems: "center",
        marginRight: "10px",
        [mq.medium]: {
          gridColumn: "5",
        },
      }}
    >
      <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
        Hi, {user?.name}
      </div>
      <Button variant="secondary" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}

const navLinks = [
  { to: "/", name: "Main" },
  { to: "/projects", name: "Projects" },
  { to: "/clients", name: "Clients" },
];

function Nav() {
  const { pathname } = useLocation();

  return (
    <nav
      css={{
        gridColumn: "1 / 1",
        gridRow: "2 / 2",
        [mq.medium]: {
          gridColumn: "1 / span 4",
          gridRow: "1",
          marginLeft: "10px",
          alignSelf: "center",
        },
      }}
    >
      <ul
        css={{
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          listStyle: "none",
          padding: 0,
          margin: 0,
          [mq.medium]: {
            position: "relative",
            alignItems: "center",
            flexDirection: "row",
          },
        }}
      >
        {navLinks.map(({ to, name }) => (
          <li key={name}>
            <NavLink
              to={to}
              css={{
                opacity: pathname === to ? 1 : 0.5,
                lineHeight: 0,
                color: colors.text,
                fontSize: "1.4rem",
                fontFamily: "Silkscreen, cursive",
                display: "block",
                padding: "20px 15px",
                borderLeft: `5px solid ${
                  pathname === to ? colors.text : "transparent"
                }`,
                margin: "10px 0",
                [mq.medium]: {
                  display: "inline",
                  padding: "10px 15px",
                  fontSize: "1.2rem",
                  borderLeft: 0,
                },
              }}
              end={to === "/" ? true : false}
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Root() {
  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gridTemplateRows: "80px 90%",
        gridGap: "10px",
        color: colors.text,
        maxWidth: "1200px",
        width: "100%",
        height: "100vh",
        margin: "0 auto",
      }}
    >
      <TopBar />
      <Nav />
      <main
        css={{
          gridColumn: "2 / span 4",
          [mq.medium]: {
            gridColumn: "1 / span 5",
          },
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export { Root };
