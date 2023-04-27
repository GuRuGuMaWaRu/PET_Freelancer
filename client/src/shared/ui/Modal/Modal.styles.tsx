import { DialogContent as ReachDialogContent } from "@reach/dialog";
import styled from "@emotion/styled";
import { DialogOverlay } from "@reach/dialog";
import { animated } from "react-spring";

import { colors, mq } from "../../const";

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

const SDialogContent = styled(ReachDialogContent)({
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
});

const SModalTitle = styled.h2({
  margin: 0,
  textAlign: "center",
  fontSize: "2rem",
});

const AnimatedDialogOverlay = animated(DialogOverlay);
const AnimatedDialogContent = animated(SDialogContent);

export {
  SModalCloseButton,
  SModalTitle,
  AnimatedDialogOverlay,
  AnimatedDialogContent,
};
