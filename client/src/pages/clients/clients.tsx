/** @jsxImportSource @emotion/react */

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { SlOptions, SlArrowDown } from "react-icons/sl";

import {
  ClientList,
  ClientCard,
  ClientHeader,
  OptionsButton,
  OptionsItem,
  ClientName,
  ClientData,
  ClientDataItem,
  ShowMoreButton,
} from "./clients.styles";
import { getClientsWithProjectDataQuery } from "entities/clients";
import { FullPageSpinner, Dropdown } from "shared/ui";
import { colors } from "shared/const";

function Clients() {
  const [displayedClient, setDisplayedClient] = React.useState<string[]>([]);
  const { data = [], isLoading } = useQuery(getClientsWithProjectDataQuery());

  if (isLoading) {
    return <FullPageSpinner />;
  }

  const displayClientData = (id: string) => {
    const alreadyOpened = displayedClient.includes(id);

    if (alreadyOpened) {
      setDisplayedClient(displayedClient.filter((client) => client !== id));
    } else {
      setDisplayedClient([...displayedClient, id]);
    }
  };

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
                borderRadius: "5px",
                background: "#529596",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
              }}
            />
          </ClientHeader>
          <ClientDataItem>
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
          </ClientDataItem>
          <ClientData isExpanded={displayedClient.includes(client._id)}>
            <ClientDataItem>
              <div>Projects:</div>
              <div>{client.totalProjects}</div>
            </ClientDataItem>
            <ClientDataItem>
              <div>Earnings:</div>
              <div css={{ color: "#3cff3c" }}>{client.totalEarnings}</div>
            </ClientDataItem>
            <ClientDataItem>
              <div>Projects / 30 days:</div>
              <div>{client.projectsLast30Days}</div>
            </ClientDataItem>
            <ClientDataItem>
              <div>Projects / 90 days:</div>
              <div>{client.projectsLast90Days}</div>
            </ClientDataItem>
            <ClientDataItem>
              <div>Projects / 365 days:</div>
              <div>{client.projectsLast365Days}</div>
            </ClientDataItem>
          </ClientData>
          <div css={{ textAlign: "center" }}>
            <ShowMoreButton onClick={() => displayClientData(client._id)}>
              <SlArrowDown
                css={{
                  fontSize: "1.5rem",
                  transition: "transform 0.2s",
                  transform: displayedClient.includes(client._id)
                    ? "rotate(180deg)"
                    : "",
                }}
              />
            </ShowMoreButton>
          </div>
        </ClientCard>
      ))}
    </ClientList>
  );
}

export { Clients };
