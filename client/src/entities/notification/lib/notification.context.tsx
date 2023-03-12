import React from "react";
import {
  Notification,
  INotification,
  INotificationState,
  NotificationType,
} from "..";

const NotificationContext = React.createContext<INotificationState>(
  {} as INotificationState,
);

function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notificationIsOpen, setNotificationIsOpen] = React.useState(false);
  const [notification, setNotification] = React.useState<INotification | null>(
    null,
  );

  React.useEffect(() => {
    if (notification) {
      setNotificationIsOpen(true);
    }
  }, [notification]);

  const showNotification = (type: NotificationType, message: string) => {
    setNotification({ type, message });
  };

  const value = {
    notification,
    showNotification,
    notificationIsOpen,
    setNotificationIsOpen,
  };

  return (
    <NotificationContext.Provider value={value}>
      <Notification />
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
