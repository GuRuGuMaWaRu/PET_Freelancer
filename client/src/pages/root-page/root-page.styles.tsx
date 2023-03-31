import styled from "@emotion/styled";
import { colors, mq } from "../../shared/const";

const SRootContainer = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gridTemplateRows: "80px 90%",
  gridGap: "10px",
  color: colors.white,
  maxWidth: "1200px",
  width: "100%",
  height: "100vh",
  margin: "0 auto",
});

const SMain = styled.main({
  position: "relative",
  gridColumn: "2 / span 4",
  margin: "1rem 20px",
  [mq.medium]: {
    gridColumn: "1 / span 5",
  },
});

export { SRootContainer, SMain };
