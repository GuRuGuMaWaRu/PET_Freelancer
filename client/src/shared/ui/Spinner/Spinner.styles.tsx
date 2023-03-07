import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { FaSpinner } from "react-icons/fa";

import * as colors from "../../../styles/colors";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const SSpinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
});
SSpinner.defaultProps = {
  "aria-label": "loading",
};

const SFullPageSpinnerContainer = styled.div({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "4rem",
  color: colors.spinnerContrasting,
});

export { SSpinner, SFullPageSpinnerContainer };
