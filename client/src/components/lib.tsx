/** @jsxImportSource @emotion/react */
import { Dialog as ReachDialog } from "@reach/dialog";
import styled from "@emotion/styled";

import * as colors from "../styles/colors";
import * as mq from "../styles/media-queries";

const Dialog = styled(ReachDialog)({
  maxWidth: "450px",
  borderRadius: "3px",
  margin: "20vh auto",
  boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.2)",
  backgroundColor: colors.modalBg,
  color: colors.text,
  [mq.small]: {
    width: "100%",
    margin: "10vh auto",
  },
});

const errorMessageVariants = {
  stacked: { display: "block" },
  inline: { display: "inline-block" },
};

interface Error {
  message: string;
}

type ErrorVariant = "stacked" | "inline";

function ErrorMessage({
  error,
  variant = "stacked",
  ...props
}: {
  error: Error;
  variant?: ErrorVariant;
}) {
  return (
    <div
      role="alert"
      css={[
        { color: colors.danger, backgroundColor: colors.primary },
        errorMessageVariants[variant],
      ]}
      {...props}
    >
      <span>There was an error: </span>
      <pre
        css={[
          { whiteSpace: "break-spaces", margin: "0", marginBottom: -5 },
          errorMessageVariants[variant],
        ]}
      >
        {error.message}
      </pre>
    </div>
  );
}

export { Dialog, ErrorMessage };
