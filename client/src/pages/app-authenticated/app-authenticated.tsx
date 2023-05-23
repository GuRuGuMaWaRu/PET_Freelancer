import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { routes } from "../routes";
import { FullPageSpinner } from "shared/ui";

const router = createBrowserRouter(routes);

function AppAuthenticated() {
  return (
    <RouterProvider router={router} fallbackElement={<FullPageSpinner />} />
  );
}

export default AppAuthenticated;
