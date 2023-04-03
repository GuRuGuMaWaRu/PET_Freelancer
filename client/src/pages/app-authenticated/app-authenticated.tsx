import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { FullPageSpinner } from "../../shared/ui";
import { ErrorPage } from "../error-page/error-page";
import { Root } from "../root-page/root-page";
import { NotFound } from "../404/not-found";
import { Dashboard, dashboardLoader } from "../dashboard/dashboard";
import {
  Projects,
  projectsLoader,
  projectsAddAction,
  projectsDeleteAction,
  projectsEditAction,
  Clients,
} from "../../routes";
import { queryClient } from "../../context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>There's an error</div>,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Dashboard />,
            loader: dashboardLoader(queryClient),
          },
          {
            path: "projects",
            element: <Projects />,
            loader: projectsLoader(queryClient),
          },
          {
            path: "projects/add",
            action: projectsAddAction(queryClient),
          },
          {
            path: "projects/:projectId/delete",
            action: projectsDeleteAction(queryClient),
          },
          {
            path: "projects/:projectId/update",
            action: projectsEditAction(queryClient),
          },
          {
            path: "clients",
            element: <Clients />,
          },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
]);

function AppAuthenticated() {
  return (
    <RouterProvider router={router} fallbackElement={<FullPageSpinner />} />
  );
}

export default AppAuthenticated;
