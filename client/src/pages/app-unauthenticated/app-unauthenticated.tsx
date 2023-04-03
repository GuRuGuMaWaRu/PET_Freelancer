/** @jsxImportSource @emotion/react */
import { LoginModal, RegistrationModal } from "../../widgets";
import { SContainer, SAppTitle, SButtons } from "./app-unauthenticated.styles";

function AppUnauthenticated() {
  return (
    <SContainer>
      <SAppTitle>Freelancer</SAppTitle>
      <SButtons>
        <LoginModal />
        <RegistrationModal />
      </SButtons>
    </SContainer>
  );
}

export default AppUnauthenticated;
