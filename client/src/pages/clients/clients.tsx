/** @jsxImportSource @emotion/react */

import { useQuery } from "@tanstack/react-query";
import { SlOptions, SlArrowDown } from "react-icons/sl";

import {
  ClientList,
  ClientCard,
  ClientHeader,
  ClientInfo,
  ClientName,
  ClientData,
  ClientDataColumn,
  ClientDataItem,
  Separator,
  HighlightData,
  OptionsButton,
  OptionsItem,
} from "./clients.styles";
import {
  IClientWithProjectData,
  getClientsWithProjectDataQuery,
} from "entities/clients";
import { FullPageSpinner, Dropdown } from "shared/ui";
import { colors } from "shared/const";

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
          <ClientHeader>
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
          </ClientHeader>
          <ClientInfo>
            <div>Days since last project:</div>
            <div
              css={{
                color:
                  client.daysSinceLastProject > 90
                    ? colors.textImportant
                    : colors.textSecondary,
                fontWeight: "400",
              }}
            >
              {client.daysSinceLastProject}
            </div>
          </ClientInfo>
          <SlArrowDown />
        </ClientCard>
      ))}
    </ClientList>
  );
}

export { Clients };
