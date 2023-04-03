import { LoginForm } from "../../components";
import { Button, Modal, ModalOpenButton, ModalContents } from "../../shared/ui";

function LoginModal() {
  return (
    <Modal>
      <ModalOpenButton>
        <Button>Login</Button>
      </ModalOpenButton>
      <ModalContents aria-label="Login Form" title="Login">
        <LoginForm submitButton={<Button>Login</Button>} />
      </ModalContents>
    </Modal>
  );
}

export { LoginModal };
