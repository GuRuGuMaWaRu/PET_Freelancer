/** @jsxImportSource @emotion/react */

import * as React from "react";
import VisuallyHidden from "@reach/visually-hidden";
import { useTransition } from "react-spring";

import { colors } from "../../const";
import {
  SModalCloseButton,
  SModalTitle,
  AnimatedDialogOverlay,
  AnimatedDialogContent,
} from "./Modal.styles";
import { useModal } from "./Modal.context";

const callAll = (...fns: Array<(...args: unknown[]) => void>) => (
  ...args: unknown[]
): void => fns.forEach((fn) => fn && fn(...args));

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
            <SModalTitle>{title}</SModalTitle>
            {children}
          </AnimatedDialogContent>
        </AnimatedDialogOverlay>
      ),
  );
}

export { ModalOpenButton, ModalContents };
