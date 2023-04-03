import React from "react";

interface IModalContext {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = React.createContext({} as IModalContext);

const useModal = () => {
  const context = React.useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used inside ModalProvider");
  }

  return context;
};

function Modal(props: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return <ModalContext.Provider value={{ isOpen, setIsOpen }} {...props} />;
}

export { Modal, useModal };
