/** @jsxImportSource @emotion/react */
import { Dialog as ReachDialog } from "@reach/dialog";
import styled from "@emotion/styled";

import * as colors from "../styles/colors";
import * as mq from "../styles/media-queries";

const FormGroup = styled.div({
  display: "flex",
  flexDirection: "column",
});

const inputStyles = {
  padding: "6px 10px",
  border: "1px solid #f1f1f4",
};

const Input = styled.input({ borderRadius: "3px" }, inputStyles);

const Label = styled.label({ margin: "10px 0 5px" });

const buttonVariants = {
  primary: {
    backgroundColor: colors.primary,
    color: colors.secondary,
  },
  secondary: {
    backgroundColor: colors.secondary,
    color: colors.primary,
  },
};

interface ButtonProps {
  variant?: string;
}

const Button = styled.button<ButtonProps>(
  {
    padding: "10px 15px",
    border: 0,
    borderRadius: "5px",
    lineHeight: 1,
    fontWeight: "bold",
  },
  ({ variant = "primary" }) =>
    buttonVariants[variant as keyof typeof buttonVariants],
);

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

export { FormGroup, Input, Label, Button, Dialog, ErrorMessage };
