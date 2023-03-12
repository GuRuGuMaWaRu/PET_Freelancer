export enum NotificationType { "create", "delete", "error", "warning", "fail" }

interface INotification {
  type: NotificationType;
  message: string;
}

interface INotificationMessageProps {
  type: NotificationType;
}

interface INotificationContext {
  showNotification: (type: NotificationType, message: string) => void;
}

interface INotificationProps {
  notification: INotification | null;
  hideNotification: () => void;
  isShown: boolean;
}

export type { INotification, INotificationMessageProps, INotificationContext, INotificationProps }