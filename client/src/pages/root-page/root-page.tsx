/** @jsxImportSource @emotion/react */
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import { TopBar, NavBar } from "../../widgets";
import { colors, mq } from "../../shared/const";

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
      <NavBar />
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
