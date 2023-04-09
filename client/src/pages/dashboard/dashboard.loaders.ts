import { QueryClient } from "@tanstack/react-query";

import type { IProject, IClient } from "../../shared/types";
import { projectsOneYearQuery } from "../../entities/projects/api";
import { getAllClientsQuery } from "../../entities/clients/api";

const loader = (queryClient: QueryClient) => async (): Promise<{
  projectsQuery: IProject[];
  clientsQuery: IClient[];
}> => {
  const projectsQuery = projectsOneYearQuery();
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
