import styled from "@emotion/styled";
import { colors, mq } from "shared/const";

const SClientControlsPanel = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin-block-end: 10px;
`;

const SSortByButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 205px;
  padding: 5px 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.15);
  color: ${colors.white};
`;

const SSortItem = styled.div`
  padding: 9px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;

const SControlsButton = styled.button`
  display: flex;
  align-items: center;

  padding: 5px 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 5px;
  background-color: #00979a;
  color: ${colors.white};
  transition: all 0.2s;

  &:active {
    transform: translateY(2px);
  }
`;

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

export {
  SClientControlsPanel,
  SClientList,
  SSortByButton,
  SSortItem,
  SControlsButton,
};
