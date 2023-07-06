import styled from "@emotion/styled";

const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  position: absolute;
  right: 0;
  list-style: none;
  padding: 0.5rem;
  border-radius: 5px;

  z-index: 10;
`;

const MenuItem = styled.li`
  width: 100%;
`;

export { Menu, MenuItem };
