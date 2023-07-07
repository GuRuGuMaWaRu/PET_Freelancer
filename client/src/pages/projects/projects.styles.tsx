import styled from "@emotion/styled";
import { colors, mq } from "shared/const";

const SContainer = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const STableContainer = styled.div({
  position: "relative",
  margin: "2em 0",
});

const STablePlaceholder = styled.p({
  marginTop: "14rem",
  textAlign: "center",
  fontSize: "1.3rem",
});

const STable = styled.div({
  width: "100%",
  display: "grid",
  gap: ".4em",
  gridTemplateColumns: "repeat(2, 2fr) 3fr 1fr 2fr 90px",
  [mq.medium]: {
    gridTemplateColumns: "repeat(2, 1fr) 2fr 1fr 90px",
  },
  [mq.small]: {
    gridTemplateColumns: "1fr 2fr 1fr 90px",
  },
});

const STableHeader = styled.div<{ sortName?: string; name: string }>(
  ({ sortName, name }) => ({
    backgroundColor: colors.greenDark1,
    textAlign: "left",
    padding: "8px",
    cursor: sortName ? "pointer" : "auto",
    [mq.medium]: {
      display: name === "comments" ? "none" : "block",
    },
    [mq.small]: {
      display: name === "date" || name === "comments" ? "none" : "block",
    },
  })
);

const SActionButton = styled.button({
  backgroundColor: "transparent",
  color: colors.white,
  border: 0,
});

const STableLoading = styled.div({
  position: "absolute",
  height: "100%",
  width: "100%",
  backgroundColor: colors.projectsPageBg,
  opacity: "0.4",
});

export {
  SContainer,
  STableContainer,
  STablePlaceholder,
  STable,
  STableHeader,
  SActionButton,
  STableLoading,
};
