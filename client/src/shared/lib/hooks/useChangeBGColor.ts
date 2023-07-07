import React from "react";
import { useLocation } from "react-router-dom";

import { colors } from "../../const";

// TODO: maybe I should move this hook closer to where it is used, after all it is hardly a Shared hook
function getBgColor(pathname: string) {
  if (pathname.startsWith("/projects")) {
    return colors.projectsPageBg;
  }
  if (pathname.startsWith("/clients")) {
    return colors.clientsPageBg;
  }

  return colors.dashboardPageBg;
}

function useChangeBGColor() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    document.body.style.backgroundColor = getBgColor(pathname);
  }, [pathname]);
}

export { getBgColor, useChangeBGColor };
