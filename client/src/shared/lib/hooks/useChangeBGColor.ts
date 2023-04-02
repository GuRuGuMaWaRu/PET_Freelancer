import React from "react";
import { useLocation } from "react-router-dom";

import { colors } from "../../const";

function getBgColor(pathname: string) {
  if (pathname.startsWith("/projects")) {
    return colors.greenLight1;
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
