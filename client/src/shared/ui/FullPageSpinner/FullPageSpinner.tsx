import { Spinner } from "../Spinner/Spinner";
import { SFullPageSpinnerContainer } from "./FullPageSpinner.styles";

function FullPageSpinner() {
  return (
    <SFullPageSpinnerContainer>
      <Spinner />
    </SFullPageSpinnerContainer>
  );
}

export { FullPageSpinner };
