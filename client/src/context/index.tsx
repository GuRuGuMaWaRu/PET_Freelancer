import { ReactQueryProvider } from "./query-client";
import { AuthProvider } from "./auth";

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </ReactQueryProvider>
  );
}

export { AppProviders };
