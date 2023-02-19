/** @jsxImportSource @emotion/react */

import * as React from "react";
import VisuallyHidden from "@reach/visually-hidden";
import { DialogContent as ReachDialogContent } from "@reach/dialog";
import styled from "@emotion/styled";
import { DialogOverlay } from "@reach/dialog";
import { useTransition, animated } from "react-spring";

import * as colors from "../styles/colors";
import * as mq from "../styles/media-queries";

const callAll = (...fns: Array<(...args: unknown[]) => void>) => (
  ...args: unknown[]
): void => fns.forEach((fn) => fn && fn(...args));

const SModalCloseButton = styled.button({
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

const SDialogContent = styled(ReachDialogContent)((props) => ({
  width: "450px",
  borderRadius: "3px",
  margin: "20vh auto",
  boxShadow: `0 10px 30px -5px ${colors.opaqueBlack}`,
  backgroundColor: colors.dashboardModalBg,
  color: colors.white,
  [mq.small]: {
    width: "100%",
    margin: "10vh auto",
  },
}));

const AnimatedDialogOverlay = animated(DialogOverlay);
const AnimatedDialogContent = animated(SDialogContent);

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

function ModalOpenButton({ children }: { children: React.ReactElement }) {
  const { setIsOpen } = useModal();

  return React.cloneElement(children, {
    onClick: callAll(() => setIsOpen(true), children.props.onClick),
  });
}

function ModalContents({
  children,
  title,
  bgColor = colors.dashboardPageBg,
  ...props
}: {
  children: React.ReactElement;
  title: string;
  bgColor?: string;
}) {
  const { isOpen, setIsOpen } = useModal();
  const transitions = useTransition(isOpen, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 },
    reverse: isOpen,
    delay: 200,
  });

  return transitions(
    (styles, item) =>
      item && (
        <AnimatedDialogOverlay
          onDismiss={() => setIsOpen(false)}
          style={styles}
        >
          <AnimatedDialogContent
            style={{
              transform: styles.y.to(
                (value) => `translate3d(0px, ${value}px, 0px)`,
              ),
              backgroundColor: bgColor,
            }}
            {...props}
          >
            <div
              css={{
                position: "relative",
                display: "flex",
                justifyContent: "end",
                top: "-10px",
              }}
            >
              <SModalCloseButton onClick={() => setIsOpen(false)}>
                <VisuallyHidden>Close</VisuallyHidden>
                <span aria-hidden="true">×</span>
              </SModalCloseButton>
            </div>
            <h2 css={{ margin: 0, textAlign: "center", fontSize: "2em" }}>
              {title}
            </h2>
            {children}
          </AnimatedDialogContent>
        </AnimatedDialogOverlay>
      ),
  );
}

export { Modal, ModalOpenButton, ModalContents, useModal };
