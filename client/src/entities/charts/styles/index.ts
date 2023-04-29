import styled from "@emotion/styled";
import { colors } from "shared/const";

const STooltipContainer = styled("div")({
  background: colors.white,
  opacity: 0.6,
  color: colors.textDark,
  boxShadow: "0 3px 14px rgb(0 0 0 / 40%)",
  padding: "1px",
  textAlign: "left",
  border: 0,
  borderRadius: "12px",
});

const STooltipContents = styled("div")({
  margin: "13px 19px",
});

export { STooltipContainer, STooltipContents };
