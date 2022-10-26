import React, { useEffect, useRef } from "react";
import { useTransition, animated } from "react-spring";

import { NOTIFICATION_DURATION } from "../config";
import { useNotification } from "../context";
import {
  NotificationMessage,
  WarningIcon,
  AccomplishedIcon,
  CloseIcon,
} from "./lib";
import { NotificationType } from "../utils";

const AnimatedNotificationMessage = animated(NotificationMessage);

const Notification: React.FC = () => {
  const {
    notification,
    showNotification,
    setShowNotification,
  } = useNotification();
  const transitions = useTransition(showNotification, {
    from: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 20 },
    reverse: showNotification,
    delay: 200,
  });
  const timeoutId = useRef<number>();

  useEffect(() => {
    if (showNotification) {
      timeoutId.current = window.setTimeout(
        () => setShowNotification(false),
        NOTIFICATION_DURATION,
      );
    }
    return () => window.clearTimeout(timeoutId.current);
  }, [showNotification, setShowNotification]);

  const handleCloseNotification = () => {
    clearTimeout(timeoutId.current);
    setShowNotification(false);
  };

  const notificationIcon =
    notification?.type === NotificationType.create ||
    notification?.type === NotificationType.delete ? (
      <AccomplishedIcon />
    ) : (
      <WarningIcon />
    );

  return transitions(
    (styles, item) =>
      item && (
        <AnimatedNotificationMessage
          role="alert"
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
            <CloseIcon onClick={handleCloseNotification}></CloseIcon>
          </>
        </AnimatedNotificationMessage>
      ),
  );
};

export { Notification };
