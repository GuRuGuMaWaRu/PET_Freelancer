import userEvent from "@testing-library/user-event";

import { createUser } from "../test/generate";
import { render, screen, within } from "../test/test-helpers";
import AppUnauthenticated from "../app-unauthenticated";

async function renderAuthModal(modal = "login") {
  const user = userEvent.setup();

  const modalName = new RegExp(modal, "i");
  await render(<AppUnauthenticated />);
  await user.click(screen.getByRole("button", { name: modalName }));
  const inModal = within(screen.getByRole("dialog"));

  return { user, inModal };
}

test("opens a Register menu", async () => {
  const { inModal } = await renderAuthModal("register");

  expect(
    inModal.getByRole("heading", { name: /register/i }),
  ).toBeInTheDocument();
  expect(inModal.getByRole("textbox", { name: /name/i })).toBeInTheDocument();
  expect(inModal.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
  expect(inModal.getByLabelText(/^password:$/i)).toBeInTheDocument();
  expect(inModal.getByLabelText(/^repeat password:$/i)).toBeInTheDocument();
  expect(
    inModal.getByRole("button", { name: /register/i }),
  ).toBeInTheDocument();
});

test("opens a Login menu", async () => {
  const { inModal } = await renderAuthModal("login");

  expect(inModal.getByRole("heading", { name: /login/i })).toBeInTheDocument();
  expect(inModal.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
  expect(inModal.getByLabelText(/password/i)).toBeInTheDocument();
  expect(inModal.getByRole("button", { name: /login/i })).toBeInTheDocument();
});

test("shows error messages for empty fields in Register menu", async () => {
  const { user, inModal } = await renderAuthModal("register");

  expect(inModal.queryAllByRole("alert")).toHaveLength(0);
  await user.click(inModal.getByRole("button", { name: /register/i }));
  expect(await inModal.findAllByRole("alert")).toHaveLength(4);
});

test("shows error messages for empty fields in Login menu", async () => {
  const { user, inModal } = await renderAuthModal("login");

  expect(inModal.queryAllByRole("alert")).toHaveLength(0);
  await user.click(inModal.getByRole("button", { name: /login/i }));
  expect(await inModal.findAllByRole("alert")).toHaveLength(2);
});

test("shows an error message when passwords are not identical in Register menu", async () => {
  const { user, inModal } = await renderAuthModal("register");
  const fakeUser = createUser();

  await user.type(
    inModal.getByRole("textbox", { name: /name:/i }),
    fakeUser.name,
  );
  await user.type(
    inModal.getByRole("textbox", { name: /email:/i }),
    fakeUser.email,
  );
  await user.type(screen.getByLabelText(/^password:$/i), fakeUser.password);
  await user.type(
    screen.getByLabelText(/^repeat password:$/i),
    fakeUser.password + "a",
  );

  await user.click(inModal.getByRole("button", { name: /register/i }));
  expect(await inModal.findAllByRole("alert")).toHaveLength(1);
  expect(inModal.getByRole("alert").textContent).toMatchInlineSnapshot(
    `"The passwords do not match"`,
  );
});
