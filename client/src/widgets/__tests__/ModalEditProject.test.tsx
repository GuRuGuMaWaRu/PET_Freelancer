import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { waitForLoadingToFinish } from "test/test-helpers";
import { NotificationProvider } from "entities/notification";
import { ModalEditProject } from "..";
import { projectsEditAction } from "routes";
import { queryClient } from "context";
import { Currency } from "shared/types";

function setup(jsx: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx, { wrapper: NotificationProvider }),
  };
}

describe("ModalEditProject", () => {
  const Wrapper = () => {
    const clients = [
      { _id: "1", name: "test client 1" },
      { _id: "2", name: "test client 2" },
      { _id: "3", name: "test client 3" },
    ];

    const project = {
      _id: "1",
      user: "user 1",
      client: { _id: "1", name: "test client 1" },
      projectNr: "111",
      payment: 200,
      currency: Currency.USD,
      date: new Date(),
      deleted: false,
      paid: false,
    };

    return <ModalEditProject project={project} clients={clients} />;
  };

  const routes = [
    {
      path: "/edit-project-modal",
      element: <Wrapper />,
    },
    {
      path: "projects/:projectId/update",
      action: projectsEditAction(queryClient),
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/edit-project-modal"],
    initialIndex: 1,
  });

  it("should render Edit Project Form when Edit icon is clicked", async () => {
    const { user } = setup(<RouterProvider router={router} />);

    await user.click(screen.getByRole("button", { name: /^edit$/i }));

    await screen.findByRole("heading", { name: /^edit project$/i });

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
    expect(
      screen.getByRole("button", { name: /^update$/i }),
    ).toBeInTheDocument();
  });

  it("should update a project", async () => {
    const { user } = setup(<RouterProvider router={router} />);

    //** Open Edit Project Modal */
    await user.click(screen.getByRole("button", { name: /^edit$/i }));

    //** Change a field  */
    await user.type(screen.getByLabelText(/project nr/i), "new number");

    //** Click Update button */
    await user.click(screen.getByRole("button", { name: /^update$/i }));

    await waitForLoadingToFinish();

    expect(
      (await screen.findByLabelText(/notification/i)).textContent,
    ).toMatchInlineSnapshot(`"Project updated successfully"`);
  });
});
