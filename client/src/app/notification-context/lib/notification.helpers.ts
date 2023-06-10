import { NotificationType } from "../types";
import { colors } from "shared/const";

const setNotificationColor = (type: NotificationType) => {
  switch (type) {
    case NotificationType.success:
      return colors.notificationSuccess;
    case NotificationType.warning:
      return colors.notificationWarning;
    default:
      return colors.white;
  }
};

export { setNotificationColor };
