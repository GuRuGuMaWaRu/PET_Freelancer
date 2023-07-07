import { SContainer, SAppTitle, SButtons } from "./app-unauthenticated.styles";
import { Modal, Button } from "shared/ui";
import { LoginForm, RegisterForm } from "entities/auth";

function AppUnauthenticated() {
  return (
    <SContainer>
      <SAppTitle>Freelancer</SAppTitle>
      <SButtons>
        <Modal title="Login" button={<Button>Login</Button>}>
          <LoginForm />
        </Modal>
        <Modal
          title="Register"
          button={<Button variant="secondary">Register</Button>}
        >
          <RegisterForm />
        </Modal>
      </SButtons>
    </SContainer>
  );
}

export default AppUnauthenticated;
