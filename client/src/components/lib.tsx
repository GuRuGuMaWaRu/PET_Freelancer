/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { FaTimes, FaExclamationCircle, FaCheck } from "react-icons/fa";

import { colors } from "../shared/const";
import { NotificationType, ChartType } from "../utils";

interface ChartSelectionButtonProps {
  variant: "earnings" | "clients";
  chartType: ChartType;
}

const ChartSelectionButton = styled.button<ChartSelectionButtonProps>(
  ({ variant, chartType }) => ({
    border: 0,
    padding: "5px 10px",
    color: colors.white,
    backgroundColor:
      variant === "earnings" && chartType === ChartType.earnings
        ? colors.text2
        : variant === "clients" && chartType === ChartType.clients
        ? colors.text2
        : "transparent",
    clipPath: "polygon(10% 0, 100% 0%, 90% 100%, 0% 100%)",
  }),
);

/* Error components */
const errorMessageVariants = {
  stacked: { display: "block" },
  inline: { display: "inline-block" },
};

interface Error {
  message: string | undefined;
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
      {variant === "stacked" && <span>There was an error: </span>}
      <pre
        css={[
          { whiteSpace: "break-spaces", margin: "0", marginBottom: -5 },
          errorMessageVariants[variant],
        ]}
      >
        {error.message ?? "Something bad happened!"}
      </pre>
    </div>
  );
}

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
      return colors.white;
  }
};

interface INotificationProps {
  type: NotificationType;
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
    color: colors.white,
    fontSize: "1rem",
    zIndex: 20,
  },
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
  ChartSelectionButton,
  ErrorMessage,
  NotificationMessage,
  WarningIcon,
  AccomplishedIcon,
  CloseIcon,
};
