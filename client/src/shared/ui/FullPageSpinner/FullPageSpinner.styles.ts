import styled from "@emotion/styled";

import { colors } from "../../";

const SFullPageSpinnerContainer = styled.div({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "4rem",
  color: colors.spinnerContrasting,
});

export { SFullPageSpinnerContainer };
