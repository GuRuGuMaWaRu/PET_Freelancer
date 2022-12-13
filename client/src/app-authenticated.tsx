import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { FullPageSpinner } from "./components";
import {
  Root,
  Dashboard,
  dashboardLoader,
  dashboardAction,
  Projects,
  Clients,
  NotFoundScreen,
} from "./routes";
import { queryClient } from "./context";

import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError() as { statusText: string; message: string };

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

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
          },
          {
            path: "projects/add",
            action: dashboardAction,
          },
          {
            path: "clients",
            element: <Clients />,
          },
          { path: "*", element: <NotFoundScreen /> },
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
