import React from "react";
import { useTransition, animated } from "react-spring";
import {
  NotificationType,
  INotificationProps,
  NOTIFICATION_DURATION,
} from "..";
import {
  SCloseIcon,
  SNotificationMessage,
  SAccomplishedIcon,
  SWarningIcon,
} from "./Notification.styles";

const AnimatedNotificationMessage = animated(SNotificationMessage);

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case NotificationType.success:
      return <SAccomplishedIcon />;
    case NotificationType.warning:
      return <SWarningIcon />;
    default:
      return <SWarningIcon />;
  }
};

function Notification({
  notification,
  hideNotification,
  isShown,
}: INotificationProps) {
  const transitions = useTransition(isShown, {
    from: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 20 },
    delay: 200,
  });
  const timeoutId = React.useRef<number>();

  React.useEffect(() => {
    if (notification) {
      timeoutId.current = window.setTimeout(
        () => hideNotification(),
        NOTIFICATION_DURATION,
      );
    }
    return () => window.clearTimeout(timeoutId.current);
  }, [notification, hideNotification]);

  const handleCloseNotification = () => {
    clearTimeout(timeoutId.current);
    hideNotification();
  };

  return transitions(
    (styles, item) =>
      item && (
        <AnimatedNotificationMessage
          role="alert"
          aria-label="notification"
          type={notification?.type || NotificationType.warning}
          style={{
            transform: styles.y.to(
              (value) => `translateY(${value}px) translateX(-50%)`,
            ),
            opacity: styles.opacity,
          }}
        >
          <>
            {getNotificationIcon(
              notification?.type ?? NotificationType.warning,
            )}
            {notification?.message || "Oops! Something unexpected happened!"}
            <SCloseIcon onClick={handleCloseNotification}></SCloseIcon>
          </>
        </AnimatedNotificationMessage>
      ),
  );
}

export { Notification };
