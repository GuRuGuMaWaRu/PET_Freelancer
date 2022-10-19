import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider as RQProvider,
} from "@tanstack/react-query";

function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const client = new QueryClient();
  return <RQProvider client={client}>{children}</RQProvider>;
}

export { ReactQueryProvider };
