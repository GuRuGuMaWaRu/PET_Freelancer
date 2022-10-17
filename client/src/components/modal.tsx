/** @jsxImportSource @emotion/react */

import * as React from "react";
import VisuallyHidden from "@reach/visually-hidden";
import styled from "@emotion/styled";

import * as colors from "../styles/colors";
import { Dialog } from "../components/lib";

const callAll = (...fns: Array<(...args: unknown[]) => void>) => (
  ...args: unknown[]
): void => fns.forEach((fn) => fn && fn(...args));

const ModalCloseButton = styled.button({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "40px",
  height: "40px",
  border: 0,
  fontSize: "2em",
  color: colors.primary,
  backgroundColor: "transparent",
  cursor: "pointer",
});

interface IModalContext {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = React.createContext({} as IModalContext);

function Modal(props: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return <ModalContext.Provider value={{ isOpen, setIsOpen }} {...props} />;
}

function ModalOpenButton({ children }: { children: React.ReactElement }) {
  const { setIsOpen } = React.useContext(ModalContext);

  return React.cloneElement(children, {
    onClick: callAll(() => setIsOpen(true), children.props.onClick),
  });
}

function ModalContents({
  children,
  title,
  ...props
}: {
  children: React.ReactElement;
  title: string;
}) {
  const { isOpen, setIsOpen } = React.useContext(ModalContext);

  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props}>
      <div
        css={{
          position: "relative",
          display: "flex",
          justifyContent: "end",
          top: "-10px",
        }}
      >
        <ModalCloseButton onClick={() => setIsOpen(false)}>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden="true">×</span>
        </ModalCloseButton>
      </div>
      <h2 css={{ margin: 0, textAlign: "center", fontSize: "2em" }}>{title}</h2>
      {children}
    </Dialog>
  );
}

export { Modal, ModalOpenButton, ModalContents };
