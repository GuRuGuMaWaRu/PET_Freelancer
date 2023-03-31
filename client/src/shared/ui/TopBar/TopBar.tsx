import { SBar, SUserWelcome } from "./TopBar.styles";
import { Button } from "../";
import { useAuth } from "../../../context";

function TopBar() {
  const { user, logout } = useAuth();

  return (
    <SBar>
      <SUserWelcome>Hi, {user?.name}</SUserWelcome>
      <Button variant="secondary" onClick={logout}>
        Logout
      </Button>
    </SBar>
  );
}

export { TopBar };
