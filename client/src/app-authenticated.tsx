import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { FullPageSpinner } from "./components";
import { Root, Dashboard, Projects, Clients, dashboardLoader } from "./routes";
import { queryClient } from "./context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>There's an error</div>,
    children: [
      {
        errorElement: <div>There's an error</div>,
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
            path: "clients",
            element: <Clients />,
          },
          { path: "*", element: <div>404! There is no such page</div> },
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
