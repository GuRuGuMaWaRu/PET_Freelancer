import styled from "@emotion/styled";
import { colors, mq } from "shared/const";

const SRootContainer = styled.div({
  display: "grid",
  gridTemplateColumns: "auto 230px minmax(320px, 1200px) auto",
  gridTemplateRows: "80px auto",
  gridGap: "10px",
  color: colors.white,
  width: "100%",
  height: "100vh",
});

const SMain = styled.main({
  gridColumn: "3 / 3",
  [mq.medium]: {
    gridColumn: "2 / 4",
  },
});

export { SRootContainer, SMain };
