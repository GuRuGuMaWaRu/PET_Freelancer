import styled from "@emotion/styled";
import { colors, mq } from "shared/const";

const ClientList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 0;
  margin: 0;
  ${mq.small} {
    grid-template-columns: 1fr;
  }
`;

const ClientCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  align-self: start;

  padding: 1rem;

  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 0.5rem;

  transition: all 0.2s;
`;

const ClientHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
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

const ClientData = styled.div<{ isExpanded: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  color: ${colors.textSecondary};
  max-height: ${({ isExpanded }) => (isExpanded ? "40rem" : ".5rem")};
  opacity: ${({ isExpanded }) => (isExpanded ? 1 : 0)};
  transition: all 0.4s ease-in-out;
  overflow: hidden;
`;

const ClientDataItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

const ShowMoreButton = styled.button`
  border: none;
  background: none;
  color: ${colors.white};
  padding: 0 1rem;
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
  ClientDataItem,
  ShowMoreButton,
};
