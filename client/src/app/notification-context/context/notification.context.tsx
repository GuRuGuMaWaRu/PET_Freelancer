import React from "react";

import {
  INotification,
  INotificationContext,
  NotificationType,
} from "../types";
import { Notification } from "../ui/Notification";

const NotificationContext = React.createContext<INotificationContext>(
  {} as INotificationContext,
);

function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notification, setNotification] = React.useState<INotification | null>(
    null,
  );
  const [isShown, setIsShown] = React.useState<boolean>(false);

  const showNotification = React.useCallback(
    (type: NotificationType, message: string) => {
      setNotification({ type, message });
      setIsShown(true);
    },
    [],
  );

  const success = React.useCallback(
    (message: string) => {
      showNotification(NotificationType.success, message);
    },
    [showNotification],
  );

  const warning = React.useCallback(
    (message: string) => {
      showNotification(NotificationType.warning, message);
    },
    [showNotification],
  );

  const hideNotification = () => setIsShown(false);

  const value = React.useMemo(
    () => ({
      success,
      warning,
    }),
    [success, warning],
  );

  return (
    <NotificationContext.Provider value={value}>
      <Notification
        notification={notification}
        hideNotification={hideNotification}
        isShown={isShown}
      />
      {children}
    </NotificationContext.Provider>
  );
}

const useNotification = () => {
  const context = React.useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification should be used inside NotificationProvider",
    );
  }

  return context;
};

export { NotificationProvider, useNotification };
