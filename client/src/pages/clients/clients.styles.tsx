import styled from "@emotion/styled";
import { colors, mq } from "shared/const";

const ClientList = styled.ul`
  /* display: flex;
  flex-direction: column; */
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 0;
  margin: 0;
`;

const ClientCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding: 1rem;
  background-color: #bb7535;
  background-color: #5380b4;
  background-color: #087e7f;

  border-radius: 0.5rem;
`;

const ClientHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ClientInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${colors.textSecondary};
`;

const OptionsButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0;
  border: none;
  background: none;
  cursor: pointer;

  font-family: "Silkscreen", cursive;
  font-size: 2rem;
  color: ${colors.white};
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const OptionsItem = styled.button`
  border: none;
  background: none;
  color: ${colors.white};
`;

const ClientName = styled.h3`
  margin: 0;
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
  ClientHeader,
  ClientInfo,
  OptionsButton,
  OptionsItem,
  ClientName,
  ClientData,
  ClientDataColumn,
  ClientDataItem,
  Separator,
  HighlightData,
};
