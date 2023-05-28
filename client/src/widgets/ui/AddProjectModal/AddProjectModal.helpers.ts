import { colors } from "shared/const";

const getColorBasedOnPath = (path: string) => {
  switch (path) {
    case "/":
      return colors.dashboardModalBg;
    case "/projects":
      return colors.greenLight2;
    default:
      return colors.dashboardModalBg;
  }
};

export { getColorBasedOnPath };
