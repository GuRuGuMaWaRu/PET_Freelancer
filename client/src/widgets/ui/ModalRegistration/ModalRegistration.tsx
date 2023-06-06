import { RegisterForm } from "entities/auth";
import { Button, Modal, ModalOpenButton, ModalContents } from "shared/ui";

function ModalRegistration() {
  return (
    <Modal>
      <ModalOpenButton>
        <Button variant="secondary">Register</Button>
      </ModalOpenButton>
      <ModalContents aria-label="Register Form" title="Register">
        <RegisterForm />
      </ModalContents>
    </Modal>
  );
}

export { ModalRegistration };
