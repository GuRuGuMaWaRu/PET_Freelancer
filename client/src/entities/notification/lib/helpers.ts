import { NotificationType } from "..";
import { colors } from "../../../shared/const";

const setNotificationColor = (type: NotificationType) => {
  switch (type) {
    case NotificationType.create:
    case NotificationType.delete:
      return colors.notificationDone;
    case NotificationType.error:
    case NotificationType.fail:
      return colors.notificationError;
    default:
      return colors.white;
  }
};

export { setNotificationColor };
