/** @jsxImportSource @emotion/react */
import { LoginForm, RegisterForm } from "../../components";
import { Button, Modal, ModalOpenButton, ModalContents } from "../../shared/ui";
import { SContainer, SAppTitle, SButtons } from "./app-unauthenticated.styles";

function AppUnauthenticated() {
  return (
    <SContainer>
      <SAppTitle>Freelancer</SAppTitle>
      <SButtons>
        <Modal>
          <ModalOpenButton>
            <Button>Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login Form" title="Login">
            <LoginForm submitButton={<Button>Login</Button>} />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button variant="secondary">Register</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Register Form" title="Register">
            <RegisterForm submitButton={<Button>Register</Button>} />
          </ModalContents>
        </Modal>
      </SButtons>
    </SContainer>
  );
}

export default AppUnauthenticated;
