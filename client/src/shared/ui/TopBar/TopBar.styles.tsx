import styled from "@emotion/styled";
import { mq } from "../../const";

const SBar = styled.div({
  gridColumn: "5 / 5",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridGap: "20px",
  alignItems: "center",
  marginRight: "10px",
  [mq.medium]: {
    gridColumn: "5",
  },
});

const SUserWelcome = styled.div({
  textAlign: "right",
  whiteSpace: "nowrap",
});

export { SBar, SUserWelcome };
