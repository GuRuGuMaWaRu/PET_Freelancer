import styled from "@emotion/styled";

import * as colors from "../../../styles/colors";

const SFullPageSpinnerContainer = styled.div({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "4rem",
  color: colors.spinnerContrasting,
});

export { SFullPageSpinnerContainer };
