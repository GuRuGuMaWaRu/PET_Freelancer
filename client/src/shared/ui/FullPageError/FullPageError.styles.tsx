import styled from "@emotion/styled";
import { colors } from "../../const";

const SFullPageErrorContainer = styled.div({
  color: colors.danger,
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.base2,
});

export { SFullPageErrorContainer };
