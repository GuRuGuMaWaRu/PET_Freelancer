import { SSpinner, SFullPageSpinnerContainer } from "./Spinner.styles";

function FullPageSpinner() {
  return (
    <SFullPageSpinnerContainer>
      <SSpinner />
    </SFullPageSpinnerContainer>
  );
}

export { FullPageSpinner, SSpinner as Spinner };
