import { useQuery } from "@tanstack/react-query";

import {
  ClientList,
  ClientCard,
  ClientName,
  ClientData,
} from "./clients.styles";
import { getClientsWithProjectDataQuery } from "entities/clients/api";
import { FullPageSpinner } from "shared/ui";

function Clients() {
  const { data, isLoading } = useQuery(getClientsWithProjectDataQuery());

  if (isLoading) {
    return <FullPageSpinner />;
  }

  return (
    <ClientList>
      {data.map((client) => (
        <ClientCard key={client._id}>
          <ClientName>{client.clientName}</ClientName>
          <ClientData>
            <div>
              <div>Total Project: {client.totalProjects}</div>
              <div>Total Earnings: {client.totalEarnings}</div>
            </div>
            <div>
              <div>
                First Project Date: {client.firstProjectDate.split("T")[0]}
              </div>
              <div>
                Last Project Date: {client.lastProjectDate.split("T")[0]}
              </div>
              <div># of project, 30 days: {client.projectsLast30Days}</div>
              <div># of project, 90 days: {client.projectsLast90Days}</div>
              <div># of project, 365 days: {client.projectsLast365Days}</div>
            </div>
          </ClientData>
        </ClientCard>
      ))}
    </ClientList>
  );
}

export { Clients };
