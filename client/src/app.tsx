/** @jsxImportSource @emotion/react */

import { useAuth } from "./context";
import { AppUnauthorized } from "./app-unauthorized";

function App() {
  const { user } = useAuth();

  return user ? <div>You are in!</div> : <AppUnauthorized />;
}

export { App };
