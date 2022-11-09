import * as React from "react";
import { Notification } from "../components";
import { NotificationType } from "../utils";

interface INotification {
  type: NotificationType;
  message: string;
}

interface IState {
  notification: INotification | null;
  setNotification: React.Dispatch<React.SetStateAction<INotification | null>>;
  showNotification: boolean;
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotificationContext = React.createContext<IState>({} as IState);

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [showNotification, setShowNotification] = React.useState(false);
  const [notification, setNotification] = React.useState<INotification | null>(
    null,
  );

  React.useEffect(() => {
    if (notification) {
      setShowNotification(true);
    }
  }, [notification]);

  const value = {
    notification,
    setNotification,
    showNotification,
    setShowNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      <Notification />
      {children}
    </NotificationContext.Provider>
  );
};

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
