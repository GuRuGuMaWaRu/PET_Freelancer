import React from "react";
import { useTransition, animated } from "react-spring";

import { NotificationType, useNotification, NOTIFICATION_DURATION } from "..";
import {
  SAccomplishedIcon,
  SWarningIcon,
  SCloseIcon,
  SNotificationMessage,
} from "./Notification.styles";

const AnimatedNotificationMessage = animated(SNotificationMessage);

const Notification = () => {
  const {
    notification,
    notificationIsOpen,
    setNotificationIsOpen,
  } = useNotification();
  const transitions = useTransition(notificationIsOpen, {
    from: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 20 },
    reverse: notificationIsOpen,
    delay: 200,
  });
  const timeoutId = React.useRef<number>();

  React.useEffect(() => {
    if (notificationIsOpen) {
      timeoutId.current = window.setTimeout(
        () => setNotificationIsOpen(false),
        NOTIFICATION_DURATION,
      );
    }
    return () => window.clearTimeout(timeoutId.current);
  }, [notificationIsOpen, setNotificationIsOpen]);

  const handleCloseNotification = () => {
    clearTimeout(timeoutId.current);
    setNotificationIsOpen(false);
  };

  const notificationIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.create:
      case NotificationType.delete:
        return <SAccomplishedIcon />;
      case NotificationType.error:
      case NotificationType.fail:
        return <SWarningIcon />;
      default:
        return <SWarningIcon />;
    }
  };

  return transitions(
    (styles, item) =>
      item && (
        <AnimatedNotificationMessage
          role="alert"
          aria-label="notification"
          type={notification?.type || NotificationType.error}
          style={{
            transform: styles.y.to(
              (value) => `translateY(${value}px) translateX(-50%)`,
            ),
            opacity: styles.opacity,
          }}
        >
          <>
            {notificationIcon}
            {notification?.message || "Oops! Something unexpected happened!"}
            <SCloseIcon onClick={handleCloseNotification}></SCloseIcon>
          </>
        </AnimatedNotificationMessage>
      ),
  );
};

export { Notification };
