import React from "react";
import { useFetcher } from "react-router-dom";

import { useModal } from "shared/ui";
import { useNotification } from "entities/notification";

const useModalForm = () => {
  const fetcher = useFetcher();
  const { setIsOpen } = useModal();
  const notification = useNotification();

  const isLoading = fetcher.state !== "idle";

  //** Show SUCCESS or WARNING message */
  React.useEffect(() => {
    if (fetcher.data && !isLoading) {
      if (fetcher.data.status === "success") {
        notification.success(fetcher.data.message);
      } else {
        notification.warning(fetcher.data.message);
      }
    }
  }, [fetcher.data, isLoading, notification]);

  //** Close Modal on success */
  React.useEffect(() => {
    if (fetcher?.data?.status === "success") {
      setIsOpen(false);
    }
  }, [fetcher.data, setIsOpen]);

  return { submit: fetcher.submit, isLoading };
};

export { useModalForm };
