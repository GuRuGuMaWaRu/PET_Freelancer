export enum NotificationType { "create", "delete", "error", "warning", "fail" }

interface INotification {
  type: NotificationType;
  message: string;
}

interface INotificationMessageProps {
  type: NotificationType;
}

interface INotificationState {
  notification: INotification | null;
  showNotification: (type: NotificationType, message: string) => void;
  notificationIsOpen: boolean;
  setNotificationIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { INotification, INotificationMessageProps, INotificationState }