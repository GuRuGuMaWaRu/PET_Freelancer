import React, { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import {
  NOTIFICATION_DURATION,
  NOTIFICATION_ANIMATION_DURATION,
} from "../config";
import { useNotification } from "../context";
import {
  NotificationMessage,
  WarningIcon,
  AccomplishedIcon,
  CloseIcon,
} from "./lib";
import { NotificationType } from "../utils";

const Notification: React.FC = () => {
  const {
    notification,
    showNotification,
    setShowNotification,
  } = useNotification();
  const nodeRef = React.useRef(null);

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

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={showNotification}
      timeout={NOTIFICATION_ANIMATION_DURATION}
      appear
      mountOnEnter
    >
      {(state) => (
        <NotificationMessage
          ref={nodeRef}
          role="alert"
          state={state}
          duration={NOTIFICATION_ANIMATION_DURATION}
          type={notification?.type || NotificationType.error}
        >
          <>
            {notificationIcon}
            {notification?.message || "Oops! Something unexpected happened!"}
            <CloseIcon onClick={handleCloseNotification}></CloseIcon>
          </>
        </NotificationMessage>
      )}
    </CSSTransition>
  );
};

export { Notification };
