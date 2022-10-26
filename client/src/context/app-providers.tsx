import { ReactQueryProvider } from "./query-client.context";
import { AuthProvider } from "./auth.context";
import { NotificationProvider } from "./notification.context";

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <NotificationProvider>{children}</NotificationProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
}

export { AppProviders };
