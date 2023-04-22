import React from "react";
import { useLocation } from "react-router-dom";

import { getColorBasedOnPath } from "./AddProjectModal.helpers";

const useGetColorFromPath = () => {
  const { pathname } = useLocation();
  const [color, setColor] = React.useState<string>("");

  React.useEffect(() => {
    const color = getColorBasedOnPath(pathname);
    setColor(color);
  }, [pathname]);

  return color;
};

export { useGetColorFromPath };
