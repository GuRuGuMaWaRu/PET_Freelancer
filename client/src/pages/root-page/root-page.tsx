/** @jsxImportSource @emotion/react */
import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import { TopBar } from "../../shared/ui";
import { colors, mq } from "../../shared/const";

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
                color: colors.white,
                fontSize: "1.4rem",
                fontFamily: "Silkscreen, cursive",
                display: "block",
                padding: "20px 15px",
                borderLeft: `5px solid ${
                  pathname === to ? colors.white : "transparent"
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

const getBgColor = (pathname: string) => {
  if (pathname.startsWith("/projects")) {
    return colors.greenLight1;
  }
  if (pathname.startsWith("/clients")) {
    return colors.clientsPageBg;
  }

  return colors.dashboardPageBg;
};

function Root() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    document.body.style.backgroundColor = getBgColor(pathname);
  }, [pathname]);

  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gridTemplateRows: "80px 90%",
        gridGap: "10px",
        color: colors.white,
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
          position: "relative",
          gridColumn: "2 / span 4",
          margin: "1rem 20px",
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
