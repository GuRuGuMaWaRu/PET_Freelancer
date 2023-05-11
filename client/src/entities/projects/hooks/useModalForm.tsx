import React from "react";

import { useModal } from "shared/ui";
import { useNotification } from "entities/notification";

const useModalForm = (fetcherData: any, isLoading: boolean) => {
  const { setIsOpen } = useModal();
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

  //** Close Modal on success */
  React.useEffect(() => {
    if (fetcherData?.status === "success") {
      setIsOpen(false);
    }
  }, [fetcherData, setIsOpen]);
};

export { useModalForm };
