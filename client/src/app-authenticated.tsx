import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { FullPageSpinner } from "./components";
import { Root, Dashboard, Projects, Clients } from "./routes";
import { getAllProjects } from "./utils";

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
            loader: async () => {
              const res = await getAllProjects();
              return res.data;
            },
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
