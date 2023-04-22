import { RouterProvider } from "react-router-dom";

import { router } from "./router";
import { FullPageSpinner } from "../../shared/ui";

function AppAuthenticated() {
  return (
    <RouterProvider router={router} fallbackElement={<FullPageSpinner />} />
  );
}

export default AppAuthenticated;
