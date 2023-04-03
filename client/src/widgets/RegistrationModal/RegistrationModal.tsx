import { RegisterForm } from "../../components";
import { Button, Modal, ModalOpenButton, ModalContents } from "../../shared/ui";

function RegistrationModal() {
  return (
    <Modal>
      <ModalOpenButton>
        <Button variant="secondary">Register</Button>
      </ModalOpenButton>
      <ModalContents aria-label="Register Form" title="Register">
        <RegisterForm submitButton={<Button>Register</Button>} />
      </ModalContents>
    </Modal>
  );
}

export { RegistrationModal };
