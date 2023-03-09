/** @jsxImportSource @emotion/react */
import * as colors from "./styles/colors";
import { Button, LoginForm, RegisterForm } from "./components";
import { Modal, ModalOpenButton, ModalContents } from "./shared";

function AppUnauthenticated() {
  return (
    <div
      css={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.dashboardPageBg,
      }}
    >
      <h1 css={{ color: "#fff", fontSize: "3em" }}>Freelancer</h1>
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: "20px",
        }}
      >
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
      </div>
    </div>
  );
}

export default AppUnauthenticated;
