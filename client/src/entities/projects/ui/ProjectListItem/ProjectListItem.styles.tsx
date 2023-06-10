import styled from "@emotion/styled";
import { colors, mq } from "shared/const";

const SDataCell = styled.div<{ name: string }>(({ name }) => ({
  padding: ".9rem .5rem",
  "&:nth-of-type(12n+7)": {
    backgroundColor: colors.greenDark2,
  },
  "&:nth-of-type(12n+8)": {
    backgroundColor: colors.greenDark2,
  },
  "&:nth-of-type(12n+9)": {
    backgroundColor: colors.greenDark2,
  },
  "&:nth-of-type(12n+10)": {
    backgroundColor: colors.greenDark2,
  },
  "&:nth-of-type(12n+11)": {
    backgroundColor: colors.greenDark2,
  },
  "&:nth-of-type(12n+12)": {
    backgroundColor: colors.greenDark2,
  },
  [mq.medium]: {
    display: name === "comments" ? "none" : "block",
  },
  [mq.small]: {
    display: name === "date" || name === "comments" ? "none" : "block",
  },
}));

export { SDataCell };
