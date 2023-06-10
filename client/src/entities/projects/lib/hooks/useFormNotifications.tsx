import React from "react";
import { useNotification } from "app";

const useFormNotifications = (fetcherData: any, isLoading: boolean) => {
  const notification = useNotification();

  //** Show SUCCESS or WARNING message */
  React.useEffect(() => {
    if (fetcherData && !isLoading) {
      if (fetcherData.status === "success") {
        notification.success(fetcherData.message);
      } else {
        notification.warning(fetcherData.message);
      }
    }
  }, [fetcherData, isLoading, notification]);
};

export { useFormNotifications };
