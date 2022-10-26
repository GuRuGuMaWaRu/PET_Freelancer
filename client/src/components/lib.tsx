/** @jsxImportSource @emotion/react */
import { Dialog as ReachDialog } from "@reach/dialog";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import {
  FaSpinner,
  FaTimes,
  FaExclamationCircle,
  FaCheck,
} from "react-icons/fa";

import * as colors from "../styles/colors";
import * as mq from "../styles/media-queries";
import { NotificationType } from "../utils";

/* Form components */
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
    "&:disabled": {
      filter: "brightness(0.80)",
      cursor: "not-allowed",
    },
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

/* Error components */
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

function FullPageErrorFallback({ error }: { error: Error }) {
  return (
    <div
      role="alert"
      css={{
        color: colors.danger,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.base2,
      }}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  );
}

/* Spinner components */
const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
});

/* Notifications */
const setNotificationColor = (type: NotificationType) => {
  switch (type) {
    case NotificationType.create:
    case NotificationType.delete:
      return colors.notificationDone;
    case NotificationType.error:
    case NotificationType.fail:
      return colors.notificationError;
    default:
      return colors.text;
  }
};

interface INotificationProps {
  state: string;
  type: NotificationType;
  duration: number;
}

const NotificationMessage = styled.div<INotificationProps>(
  {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    borderRadius: "8px 8px 0 0",
    color: colors.text,
    fontSize: "1rem",
    zIndex: 20,
  },
  ({ state }) => ({
    opacity: state === "entered" || state === "exiting" ? 1 : 0,
    transform:
      state === "entered" || state === "exiting"
        ? "translateY(0) translateX(-50%)"
        : "translateY(20px) translateX(-50%)",
  }),
  ({ duration }) => ({
    transition: `opacity ${duration}ms, transform ${duration}ms`,
  }),
  ({ type }) => ({
    backgroundColor: colors.notificationBg,
    "& p": {
      margin: "0.5rem",
      span: {
        color: setNotificationColor(type),
      },
    },
  }),
);

const notificationIconStyles = {
  fontSize: "3.2rem",
  margin: "0.8rem 1.2rem 0.8rem 1.2rem",
};
const WarningIcon = styled(FaExclamationCircle)(notificationIconStyles, {
  color: colors.notificationError,
});

const AccomplishedIcon = styled(FaCheck)(notificationIconStyles, {
  color: colors.notificationDone,
});

const CloseIcon = styled(FaTimes)({
  fontSize: "1.6rem",
  cursor: "pointer",
  margin: "0 1.5rem 0 2.7rem",
  transition: "opacity 0.2s",
  "&:hover": {
    opacity: 0.6,
  },
});

export {
  FormGroup,
  Input,
  Label,
  Button,
  Dialog,
  ErrorMessage,
  FullPageErrorFallback,
  Spinner,
  NotificationType,
  NotificationMessage,
  WarningIcon,
  AccomplishedIcon,
  CloseIcon,
};
