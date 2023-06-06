import { SContainer, SAppTitle, SButtons } from "./app-unauthenticated.styles";
import { ModalLogin, ModalRegistration } from "widgets";

function AppUnauthenticated() {
  return (
    <SContainer>
      <SAppTitle>Freelancer</SAppTitle>
      <SButtons>
        <ModalLogin />
        <ModalRegistration />
      </SButtons>
    </SContainer>
  );
}

export default AppUnauthenticated;
