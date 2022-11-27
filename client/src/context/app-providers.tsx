import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./auth.context";
import { NotificationProvider } from "./notification.context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <AuthProvider>{children}</AuthProvider>
      </NotificationProvider>
    </QueryClientProvider>
  );
}

export { AppProviders, queryClient };
