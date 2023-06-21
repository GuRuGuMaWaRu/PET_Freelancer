import type { QueryClient } from "@tanstack/react-query";

import type { IClient } from "shared/types";
import { getClientsWithProjectDataQuery } from "entities/clients";

const loader = (queryClient: QueryClient) => async (): Promise<IClient[]> => {
  const clientsQuery = getClientsWithProjectDataQuery();

  return (
    queryClient.getQueryData<IClient[]>(clientsQuery.queryKey) ??
    (await queryClient.fetchQuery(clientsQuery))
  );
};

export { loader };
