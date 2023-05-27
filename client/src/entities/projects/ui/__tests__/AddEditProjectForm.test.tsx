import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { AddEditProjectForm } from "../AddEditProjectForm/AddEditProjectForm";

function setup(jsx: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe("AddEditProjectForm", () => {
  const Wrapper = () => {
    const clients = [
      { _id: "1", name: "test client 1" },
      { _id: "2", name: "test client 2" },
      { _id: "3", name: "test client 3" },
    ];

    return <AddEditProjectForm clients={clients} />;
  };

  const routes = [
    {
      path: "/add-project-form",
      element: <Wrapper />,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/add-project-form"],
    initialIndex: 1,
  });

  it("should render", () => {
    setup(<RouterProvider router={router} />);

    expect(screen.getByLabelText("Date")).toBeInTheDocument();
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

  it("should show all default validation errors", async () => {
    const { user } = setup(<RouterProvider router={router} />);

    await user.click(screen.getByRole("button", { name: /^add$/i }));

    expect(await screen.findAllByRole("alert")).toHaveLength(2);
  });

  it("should show Date validation error", async () => {
    const { user } = setup(<RouterProvider router={router} />);

    await user.type(screen.getByLabelText(/date/i), "test");
    await user.type(screen.getByLabelText(/client/i), "test");
    await user.type(screen.getByLabelText(/project nr/i), "test");

    await user.click(screen.getByRole("button", { name: /^add$/i }));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(screen.getByRole("alert").textContent).toMatchInlineSnapshot(
      `"You must specify a date"`,
    );
  });

  it("should show Client validation error", async () => {
    const { user } = setup(<RouterProvider router={router} />);

    await user.type(screen.getByLabelText(/project nr/i), "test");

    await user.click(screen.getByRole("button", { name: /^add$/i }));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(screen.getByRole("alert").textContent).toMatchInlineSnapshot(
      `"You must specify a client"`,
    );
  });

  it("should show Project Number validation error", async () => {
    const { user } = setup(<RouterProvider router={router} />);

    await user.type(screen.getByLabelText(/client/i), "test");

    await user.click(screen.getByRole("button", { name: /^add$/i }));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(screen.getByRole("alert").textContent).toMatchInlineSnapshot(
      `"You must specify a project number"`,
    );
  });

  it("should show Payment validation error", async () => {
    const { user } = setup(<RouterProvider router={router} />);

    await user.type(screen.getByLabelText(/project nr/i), "test");
    await user.type(screen.getByLabelText(/client/i), "test");
    await user.type(screen.getByLabelText(/payment/i), "{Backspace}");

    await user.click(screen.getByRole("button", { name: /^add$/i }));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(screen.getByRole("alert").textContent).toMatchInlineSnapshot(
      `"You must specify a number"`,
    );
  });

  it("should show Comments validation error if the entered comment is too long", async () => {
    const { user } = setup(<RouterProvider router={router} />);

    await user.type(screen.getByLabelText(/project nr/i), "test");
    await user.type(screen.getByLabelText(/client/i), "test");
    await user.type(screen.getByLabelText(/comments/i), "a".repeat(201));

    await user.click(screen.getByRole("button", { name: /^add$/i }));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(screen.getByRole("alert").textContent).toMatchInlineSnapshot(
      `"Can't be longer than 200 characters"`,
    );
  });
});
