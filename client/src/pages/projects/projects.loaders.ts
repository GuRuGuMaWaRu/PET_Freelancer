import type { QueryClient } from "@tanstack/react-query";

import type { IClient } from "shared/types";
import { getAllClientsQuery } from "entities/clients";
import {
  getProjectsPageQuery,
  type IProjectPaginatedData,
} from "entities/projects/";

const loader =
  (queryClient: QueryClient) =>
  async (): Promise<{
    projectsQuery: IProjectPaginatedData;
    clientsQuery: IClient[];
  }> => {
    const projectsQuery = getProjectsPageQuery(1);
    const clientsQuery = getAllClientsQuery();

    return {
      projectsQuery:
        queryClient.getQueryData(projectsQuery.queryKey) ??
        (await queryClient.fetchQuery(projectsQuery)),
      clientsQuery:
        queryClient.getQueryData(clientsQuery.queryKey) ??
        (await queryClient.fetchQuery(clientsQuery)),
    };
  };

export { loader };
