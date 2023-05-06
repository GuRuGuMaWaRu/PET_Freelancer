import styled from "@emotion/styled";
import { FaTimes, FaExclamationCircle, FaCheck } from "react-icons/fa";

import { INotificationMessageProps, setNotificationColor } from "..";
import { colors } from "shared/const";

const notificationIconStyles = {
  fontSize: "3.2rem",
  margin: "0.8rem 1.2rem 0.8rem 1.2rem",
};

const SWarningIcon = styled(FaExclamationCircle)(notificationIconStyles, {
  color: colors.notificationWarning,
});

const SAccomplishedIcon = styled(FaCheck)(notificationIconStyles, {
  color: colors.notificationSuccess,
});

const SCloseIcon = styled(FaTimes)({
  fontSize: "1.6rem",
  cursor: "pointer",
  margin: "0 1.5rem 0 2.7rem",
  transition: "opacity 0.2s",
  "&:hover": {
    opacity: 0.6,
  },
});

const SNotificationMessage = styled.div<INotificationMessageProps>(
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

export { SWarningIcon, SAccomplishedIcon, SCloseIcon, SNotificationMessage };
