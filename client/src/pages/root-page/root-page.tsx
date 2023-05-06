/** @jsxImportSource @emotion/react */
import { Outlet } from "react-router-dom";

import { SRootContainer, SMain } from "./root-page.styles";
import { TopBar, NavBar } from "widgets";
import { useChangeBGColor } from "shared/lib";

function Root() {
  useChangeBGColor();

  return (
    <SRootContainer>
      <TopBar />
      <NavBar />
      <SMain>
        <Outlet />
      </SMain>
    </SRootContainer>
  );
}

export { Root };
