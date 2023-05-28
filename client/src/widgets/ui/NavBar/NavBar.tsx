import { useLocation } from "react-router-dom";
import { SNav, SNavList, SNavItem } from "./NavBar.styles";

const navLinks = [
  { to: "/", name: "Main" },
  { to: "/projects", name: "Projects" },
  { to: "/clients", name: "Clients" },
];

function NavBar() {
  const { pathname } = useLocation();

  const navItems = navLinks.map(({ to, name }) => (
    <li key={name}>
      <SNavItem pathname={pathname} to={to} end={to === "/" ? true : false}>
        {name}
      </SNavItem>
    </li>
  ));

  return (
    <SNav>
      <SNavList>{navItems}</SNavList>
    </SNav>
  );
}

export { NavBar };
