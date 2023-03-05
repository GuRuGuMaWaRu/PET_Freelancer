/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { FaSpinner } from "react-icons/fa";

import * as colors from "../../styles/colors";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
});
Spinner.defaultProps = {
  "aria-label": "loading",
};

function FullPageSpinner() {
  return (
    <div
      css={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "4rem",
        color: colors.spinnerContrasting,
      }}
    >
      <Spinner />
    </div>
  );
}

export { Spinner, FullPageSpinner };
