import { colors } from "shared/const";

const getColorBasedOnPath = (path: string) => {
  switch (path) {
    case "/":
      return colors.dashboardPageBg;
    case "/projects":
      return colors.projectsPageBg;
    case "/clients":
      return colors.clientsPageBg;
    default:
      return colors.dashboardPageBg;
  }
};

export { getColorBasedOnPath };
