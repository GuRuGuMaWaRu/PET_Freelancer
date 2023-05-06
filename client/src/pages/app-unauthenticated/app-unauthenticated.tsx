import { SContainer, SAppTitle, SButtons } from "./app-unauthenticated.styles";
import { LoginModal, RegistrationModal } from "widgets";

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
