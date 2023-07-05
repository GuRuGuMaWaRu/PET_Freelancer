import styled from "@emotion/styled";
import { colors } from "shared/const";

const SClientCard = styled.div`
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

const SClientHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const SClientInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${colors.textSecondary};
`;

const SOptionsButton = styled.button`
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

const SOptionsItem = styled.button`
  border: none;
  background: none;
  color: ${colors.white};
`;

const SClientName = styled.h3`
  margin: 0;
`;

const SClientData = styled.div<{ isExpanded: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  color: ${colors.textSecondary};
  max-height: ${({ isExpanded }) => (isExpanded ? "40rem" : ".5rem")};
  opacity: ${({ isExpanded }) => (isExpanded ? 1 : 0)};
  transition: all 0.4s ease-in-out;
  overflow: hidden;
  margin-block-start: 1rem;
`;

const SClientDataItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

const SShowMoreButton = styled.button`
  border: none;
  background: none;
  color: ${colors.white};
  padding: 0 1rem;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
`;

export {
  SClientCard,
  SClientHeader,
  SClientInfo,
  SOptionsButton,
  SOptionsItem,
  SClientName,
  SClientData,
  SClientDataItem,
  SShowMoreButton,
};
