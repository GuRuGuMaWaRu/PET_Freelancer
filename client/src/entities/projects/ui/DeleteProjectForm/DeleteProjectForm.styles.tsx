import styled from "@emotion/styled";
import { colors } from "shared/const";

const SContent = styled.div`
  padding: 2rem 1rem;
  line-height:: 1.8rem;
`;

const SHighlighted = styled.span`
  background-color: ${colors.text2};
  padding: 0 0.5rem;
`;

const SButtons = styled.div`
  margin-top: 2rem;
`;

export { SContent, SHighlighted, SButtons };
