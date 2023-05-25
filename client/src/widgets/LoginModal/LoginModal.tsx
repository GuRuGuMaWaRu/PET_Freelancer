import { LoginForm } from "entities/auth";
import { Button, Modal, ModalOpenButton, ModalContents } from "shared/ui";

function LoginModal() {
  return (
    <Modal>
      <ModalOpenButton>
        <Button>Login</Button>
      </ModalOpenButton>
      <ModalContents aria-label="Login Form" title="Login">
        <LoginForm />
      </ModalContents>
    </Modal>
  );
}

export { LoginModal };
