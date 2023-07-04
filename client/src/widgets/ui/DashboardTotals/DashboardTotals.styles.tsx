import styled from "@emotion/styled";
import { colors } from "shared/const";

const STotalsWrapper = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gridGap: "1rem",
  marginBottom: "2rem",
});

const SDate = styled.time({
  fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)",
  fontWeight: "bold",
  opacity: 0.7,
});

const SSumContainer = styled.div({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
});

const SCurrencySymbol = styled.span({
  marginTop: ".9rem",
  marginRight: ".3rem",
});

const SSum = styled.span({
  color: colors.primary,
  fontSize: "clamp(2rem, 5vw, 4.5rem)",
  fontWeight: "bold",
});

export { STotalsWrapper, SDate, SSumContainer, SCurrencySymbol, SSum };
