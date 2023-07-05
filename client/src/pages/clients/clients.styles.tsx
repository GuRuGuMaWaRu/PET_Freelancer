import styled from "@emotion/styled";
import { mq } from "shared/const";

const SClientList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 0;
  margin: 0;
  ${mq.small} {
    grid-template-columns: 1fr;
  }
`;

export { SClientList };
