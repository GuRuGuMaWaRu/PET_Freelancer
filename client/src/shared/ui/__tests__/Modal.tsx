import {
  render,
  screen,
  within,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Modal, ModalOpenButton, ModalContents } from "../Modal/Modal";
import { Button } from "../../../components";

test("can be opened and closed", async () => {
  const label = "Modal label";
  const title = "Modal title";
  const user = userEvent.setup();

  render(
    <Modal>
      <ModalOpenButton>
        <Button>Open</Button>
      </ModalOpenButton>
      <ModalContents aria-label={label} title={title}>
        <div>Modal Content</div>
      </ModalContents>
    </Modal>,
  );

  await user.click(screen.getByRole("button", { name: /open/i }));

  expect(screen.getByRole("dialog")).toHaveAttribute("aria-label", label);

  const inModal = within(screen.getByRole("dialog"));
  expect(inModal.getByRole("heading", { name: title })).toBeInTheDocument();
  expect(inModal.getByText(/modal content/i)).toBeInTheDocument();
  expect(inModal.getByRole("button", { name: /close/i })).toBeInTheDocument();

  await user.click(inModal.getByRole("button", { name: /close/i }));
  await waitForElementToBeRemoved(screen.queryByRole("dialog"));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
