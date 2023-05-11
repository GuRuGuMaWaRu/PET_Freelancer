import React from "react";
import { useModal } from "shared/ui";

const useModalForm = (fetcherData: any) => {
  const { setIsOpen } = useModal();
  //** Close Modal on success */
  React.useEffect(() => {
    if (fetcherData?.status === "success") {
      setIsOpen(false);
    }
  }, [fetcherData, setIsOpen]);
};

export { useModalForm };
