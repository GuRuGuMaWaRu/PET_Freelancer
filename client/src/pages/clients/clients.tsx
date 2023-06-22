/** @jsxImportSource @emotion/react */

import { useQuery } from "@tanstack/react-query";
import { SlOptions } from "react-icons/sl";

import {
  ClientList,
  ClientCard,
  ClientName,
  ClientData,
  ClientDataColumn,
  ClientDataItem,
  Separator,
  HighlightData,
  ClientInfo,
  OptionsButton,
  OptionsItem,
} from "./clients.styles";
import {
  IClientWithProjectData,
  getClientsWithProjectDataQuery,
} from "entities/clients";
import { FullPageSpinner, Dropdown } from "shared/ui";

function Clients() {
  const { data = [], isLoading } = useQuery(getClientsWithProjectDataQuery());

  if (isLoading) {
    return <FullPageSpinner />;
  }

  const getClientData = (client: IClientWithProjectData) => (
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
          <HighlightData>{client.firstProjectDate.split("T")[0]}</HighlightData>
        </ClientDataItem>
        <ClientDataItem>
          <div>Last Project</div>
          <Separator />
          <HighlightData>{client.lastProjectDate.split("T")[0]}</HighlightData>
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
  );

  return (
    <ClientList>
      {data.map((client) => (
        <ClientCard key={client._id}>
          <ClientInfo>
            <ClientName>{client.clientName}</ClientName>
            <Dropdown
              trigger={
                <OptionsButton>
                  <SlOptions />
                </OptionsButton>
              }
              menu={[
                <OptionsItem>Edit</OptionsItem>,
                <OptionsItem>Delete</OptionsItem>,
              ]}
              dropdownStyles={{
                width: "100px",
                backgroundColor: "#739dd7",
              }}
            />
          </ClientInfo>
          <ClientInfo>
            <div>Days since last project:</div>
            <div css={{ color: "tomato", fontWeight: "700" }}>
              {client.daysSinceLastProject}
            </div>
          </ClientInfo>
        </ClientCard>
      ))}
    </ClientList>
  );
}

export { Clients };
