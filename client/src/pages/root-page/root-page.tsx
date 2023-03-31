/** @jsxImportSource @emotion/react */
import { Outlet } from "react-router-dom";

import { TopBar, NavBar } from "../../widgets";
import { colors, mq } from "../../shared/const";
import { useChangeBGColor } from "../../shared/lib";

function Root() {
  useChangeBGColor();

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
