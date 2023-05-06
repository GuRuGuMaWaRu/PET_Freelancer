import styled from "@emotion/styled";
import { colors } from "shared/const";

const SContainer = styled.div({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "-5rem",
  backgroundColor: colors.dashboardPageBg,
});

const SAppTitle = styled.h1({
  color: colors.white,
  fontSize: "3rem",
});

const SButtons = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
});

export { SContainer, SAppTitle, SButtons };
