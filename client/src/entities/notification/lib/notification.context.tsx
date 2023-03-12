import React from "react";
import {
  Notification,
  INotification,
  INotificationContext,
  NotificationType,
} from "..";

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

  const hideNotification = () => setIsShown(false);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
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
