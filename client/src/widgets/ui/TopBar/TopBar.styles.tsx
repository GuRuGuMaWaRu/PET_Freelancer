import styled from "@emotion/styled";
import { mq } from "shared/const";

const SBar = styled.div({
  gridColumn: "3 / 3",
  display: "flex",
  justifyContent: "flex-end",
  gap: "2rem",
  alignItems: "center",
});

const SUserWelcome = styled.div({
  textAlign: "right",
  whiteSpace: "nowrap",
});

export { SBar, SUserWelcome };
