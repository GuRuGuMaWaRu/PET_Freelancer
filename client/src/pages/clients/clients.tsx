import { useQuery } from "@tanstack/react-query";

import {
  ClientList,
  ClientCard,
  ClientName,
  ClientData,
  ClientDataColumn,
  ClientDataItem,
  Separator,
  HighlightData,
} from "./clients.styles";
import { getClientsWithProjectDataQuery } from "entities/clients/api";
import { FullPageSpinner } from "shared/ui";

function Clients() {
  const { data = [], isLoading } = useQuery(getClientsWithProjectDataQuery());

  if (isLoading) {
    return <FullPageSpinner />;
  }

  return (
    <ClientList>
      {data.map((client) => (
        <ClientCard key={client._id}>
          <ClientName>{client.clientName}</ClientName>
          <ClientData>
            <ClientDataColumn>
              <ClientDataItem>
                <div>Projects</div>
                <Separator />
                <HighlightData>{client.totalProjects}</HighlightData>
              </ClientDataItem>
              <ClientDataItem>
                <div>Money</div>
                <Separator />
                <HighlightData>{client.totalEarnings}</HighlightData>
              </ClientDataItem>
            </ClientDataColumn>
            <ClientDataColumn>
              <ClientDataItem>
                <div>First Project</div>
                <Separator />
                <HighlightData>
                  {client.firstProjectDate.split("T")[0]}
                </HighlightData>
              </ClientDataItem>
              <ClientDataItem>
                <div>Last Project</div>
                <Separator />
                <HighlightData>
                  {client.lastProjectDate.split("T")[0]}
                </HighlightData>
              </ClientDataItem>
              <ClientDataItem>
                <div>Projects 30 days</div>
                <Separator />
                <HighlightData>{client.projectsLast30Days}</HighlightData>
              </ClientDataItem>
              <ClientDataItem>
                <div>Projects 90 days</div>
                <Separator />
                <HighlightData>{client.projectsLast90Days}</HighlightData>
              </ClientDataItem>
              <ClientDataItem>
                <div>Projects 365 days</div>
                <Separator />
                <HighlightData>{client.projectsLast365Days}</HighlightData>
              </ClientDataItem>
            </ClientDataColumn>
          </ClientData>
        </ClientCard>
      ))}
    </ClientList>
  );
}

export { Clients };
