import styled from "@emotion/styled";
import { colors, mq } from "shared/const";

const ClientList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0;
  margin: 0;
`;

const ClientCard = styled.div`
  padding: 1rem;
  background-color: #bb7535;
  border-radius: 0.5rem;
`;

const ClientName = styled.h3`
  margin: 0;
  padding-bottom: 1rem;
`;

const ClientData = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  ${mq.medium} {
    flex-direction: column;
  }
`;

const ClientDataColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const ClientDataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Separator = styled.div`
  flex-grow: 1;
  border-bottom: 2px dotted rgba(255, 255, 255, 0.4);
`;

const HighlightData = styled.div`
  color: #f1ff02;
  font-weight: 700;
`;

export {
  ClientList,
  ClientCard,
  ClientName,
  ClientData,
  ClientDataColumn,
  ClientDataItem,
  Separator,
  HighlightData,
};
