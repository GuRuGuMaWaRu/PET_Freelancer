/** @jsxImportSource @emotion/react */

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { SlOptions, SlArrowDown } from "react-icons/sl";
import { FcGenericSortingAsc, FcGenericSortingDesc } from "react-icons/fc";

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
import {
  IClientWithProjectData,
  getClientsWithProjectDataQuery,
} from "entities/clients";
import { FullPageSpinner, Dropdown } from "shared/ui";
import { colors } from "shared/const";

enum sortByItem {
  clientName = "clientName",
  daysSinceLastProject = "daysSinceLastProject",
  totalProjects = "totalProjects",
  totalEarnings = "totalEarnings",
  projectsLast30Days = "projectsLast30Days",
  projectsLast90Days = "projectsLast90Days",
  projectsLast365Days = "projectsLast365Days",
}

enum sortDirItem {
  desc = "desc",
  asc = "asc",
}

const clientDataItems = {
  clientName: "Client name",
  daysSinceLastProject: "Days since last project",
  totalProjects: "Projects",
  totalEarnings: "Earnings",
  projectsLast30Days: "Projects / 30 days",
  projectsLast90Days: "Projects / 90 days",
  projectsLast365Days: "Projects / 365 days",
};

type SortItemType = keyof typeof clientDataItems;

const sortClients = (
  clients: IClientWithProjectData[],
  sortBy: SortItemType,
  sortDir: sortDirItem
) => {
  return clients.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) {
      return sortDir === sortDirItem.desc ? 1 : -1;
    } else if (a[sortBy] > b[sortBy]) {
      return sortDir === sortDirItem.desc ? -1 : 1;
    }
    return 0;
  });
};

function Clients() {
  const [displayedClients, setDisplayedClients] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState<SortItemType>(
    "daysSinceLastProject"
  );
  const [sortDir, setSortDir] = React.useState(sortDirItem.desc);

  const { data = [], isLoading } = useQuery(getClientsWithProjectDataQuery());

  if (isLoading) {
    return <FullPageSpinner />;
  }

  const sortedClients = sortClients(data, sortBy, sortDir);

  const displayClientData = (id: string) => {
    const alreadyOpened = displayedClients.includes(id);

    if (alreadyOpened) {
      setDisplayedClients(displayedClients.filter((client) => client !== id));
    } else {
      setDisplayedClients([...displayedClients, id]);
    }
  };

  return (
    <>
      <div css={{ display: "flex", justifyContent: "flex-start", gap: "10px" }}>
        <h3>SORT BY</h3>

        <select
          onChange={(e) => setSortBy(e.target.value as sortByItem)}
          value={sortBy}
        >
          {Object.entries(clientDataItems).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
        <button
          onClick={() =>
            setSortDir(
              sortDir === sortDirItem.desc ? sortDirItem.asc : sortDirItem.desc
            )
          }
        >
          {sortDir === sortDirItem.desc ? (
            <FcGenericSortingDesc />
          ) : (
            <FcGenericSortingAsc />
          )}
        </button>
        <button
          onClick={() => {
            if (displayedClients.length > 0) {
              setDisplayedClients([]);
            } else {
              setDisplayedClients(data.map((client) => client._id));
            }
          }}
        >
          Hide or show all clients data
        </button>
      </div>
      <ClientList>
        {sortedClients.map((client) => (
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
              <div>
                {sortBy === "clientName"
                  ? clientDataItems.daysSinceLastProject
                  : clientDataItems[sortBy]}
              </div>
              <div
                css={{
                  color:
                    sortBy === "daysSinceLastProject" &&
                    client.daysSinceLastProject > 90
                      ? colors.textImportant
                      : colors.white,
                }}
              >
                {sortBy === "clientName"
                  ? client.daysSinceLastProject
                  : client[sortBy]}
              </div>
            </ClientDataItem>
            <ClientData isExpanded={displayedClients.includes(client._id)}>
              {Object.entries(clientDataItems)
                .filter(([key, value]) => {
                  if (key === "clientName") {
                    return false;
                  }
                  if (
                    sortBy === "clientName" &&
                    key === "daysSinceLastProject"
                  ) {
                    return false;
                  } else {
                    return key !== sortBy;
                  }
                })
                .map(([key, value]) => (
                  <ClientDataItem key={key}>
                    <div>{value}</div>
                    <div
                      css={{
                        color: value === "Earnings" ? "#3cff3c" : colors.white,
                      }}
                    >
                      {key === "totalEarnings"
                        ? client.totalEarnings.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })
                        : client[key as SortItemType]}
                    </div>
                  </ClientDataItem>
                ))}
            </ClientData>
            <div css={{ textAlign: "center" }}>
              <ShowMoreButton
                onClick={() => displayClientData(client._id)}
                aria-label="Show more"
              >
                <SlArrowDown
                  css={{
                    fontSize: "1.5rem",
                    transition: "transform 0.2s",
                    transform: displayedClients.includes(client._id)
                      ? "rotate(180deg)"
                      : "",
                  }}
                />
              </ShowMoreButton>
            </div>
          </ClientCard>
        ))}
      </ClientList>
    </>
  );
}

export { Clients };
