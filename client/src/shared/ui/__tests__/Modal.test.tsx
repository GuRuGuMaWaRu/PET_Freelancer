import {
  render,
  screen,
  within,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Modal } from "..";
import { Button } from "..";

test("can be opened and closed", async () => {
  const title = "Modal title";
  const user = userEvent.setup();

  render(
    <Modal title={title} button={<Button>Open</Button>}>
      <div>Modal Content</div>
    </Modal>
  );

  await user.click(screen.getByRole("button", { name: /open/i }));

  const inModal = within(screen.getByRole("dialog"));
  expect(inModal.getByRole("heading", { name: title })).toBeInTheDocument();
  expect(inModal.getByText(/modal content/i)).toBeInTheDocument();
  expect(inModal.getByRole("button", { name: /close/i })).toBeInTheDocument();

  await user.click(inModal.getByRole("button", { name: /close/i }));
  await waitForElementToBeRemoved(screen.queryByRole("dialog"));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
