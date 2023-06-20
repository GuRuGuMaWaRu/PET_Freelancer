import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";

import { colors, mq } from "../../../shared/const";

const SNav = styled.nav({
  gridColumn: "2 / 2",
  gridRow: "2 / 2",
  [mq.medium]: {
    gridRow: "1",
    marginLeft: "10px",
    alignSelf: "center",
  },
});

const SNavList = styled.ul({
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  listStyle: "none",
  padding: 0,
  margin: 0,
  [mq.medium]: {
    position: "relative",
    alignItems: "center",
    flexDirection: "row",
  },
});

interface INavItemProps {
  pathname: string;
  to: string;
}

const SNavItem = styled(NavLink)<INavItemProps>(({ pathname, to }) => ({
  opacity: pathname === to ? 1 : 0.5,
  lineHeight: 0,
  color: colors.white,
  fontSize: "1.4rem",
  fontFamily: "Silkscreen, cursive",
  display: "block",
  padding: "20px 15px",
  borderLeft: `5px solid ${pathname === to ? colors.white : "transparent"}`,
  [mq.medium]: {
    display: "inline",
    padding: "10px 15px",
    fontSize: "1.2rem",
    borderLeft: 0,
  },
}));

export { SNav, SNavList, SNavItem };
