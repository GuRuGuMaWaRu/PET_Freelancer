import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { waitForLoadingToFinish } from "test/test-helpers";
import { NotificationProvider } from "entities/notification";
import { AddProjectModal } from "..";
import { projectsAddAction } from "routes";
import { queryClient } from "context";

function setup(jsx: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx, { wrapper: NotificationProvider }),
  };
}

describe("AddProjectModal", () => {
  const Wrapper = () => {
    const clients = [
      { _id: "1", name: "test client 1" },
      { _id: "2", name: "test client 2" },
      { _id: "3", name: "test client 3" },
    ];

    return <AddProjectModal clients={clients} />;
  };

  const routes = [
    {
      path: "/add-project-modal",
      element: <Wrapper />,
    },
    {
      path: "/projects/add",
      action: projectsAddAction(queryClient),
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/add-project-modal"],
    initialIndex: 1,
  });

  it("should render Add Project Form when 'Add Project' button is clicked", async () => {
    const { user } = setup(<RouterProvider router={router} />);

    await user.click(screen.getByRole("button", { name: /^add project$/i }));

    await screen.findByRole("heading", { name: /^add project$/i });

    expect(
      screen.getByRole("combobox", { name: /^client$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /^project nr$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /^currency$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { name: /^payment$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /^comments$/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^add$/i })).toBeInTheDocument();
  });

  it("should create a new project", async () => {
    const { user } = setup(<RouterProvider router={router} />);

    //** Open Add Project Modal */
    await user.click(screen.getByRole("button", { name: /^add project$/i }));

    //** Fill in required fields  */
    await user.type(screen.getByLabelText(/project nr/i), "test");
    await user.type(screen.getByLabelText(/client/i), "someone else");

    //** Click Add button */
    await user.click(screen.getByRole("button", { name: /^add$/i }));

    await waitForLoadingToFinish();

    expect(
      (await screen.findByLabelText(/notification/i)).textContent,
    ).toMatchInlineSnapshot(`"Project added successfully"`);
  });
});
