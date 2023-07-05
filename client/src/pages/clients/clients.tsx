/** @jsxImportSource @emotion/react */

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";

import { SClientList } from "./clients.styles";
import {
  IClientWithProjectData,
  getClientsWithProjectDataQuery,
  ClientCard,
} from "entities/clients";
import { FullPageSpinner } from "shared/ui";

enum sortDirItem {
  desc = "desc",
  asc = "asc",
}

enum sortByItem {
  clientName = "clientName",
  daysSinceLastProject = "daysSinceLastProject",
  totalProjects = "totalProjects",
  totalEarnings = "totalEarnings",
  projectsLast30Days = "projectsLast30Days",
  projectsLast90Days = "projectsLast90Days",
  projectsLast365Days = "projectsLast365Days",
}

const clientDataItems = {
  clientName: "Client name",
  daysSinceLastProject: "Days since last project",
  totalProjects: "Projects",
  totalEarnings: "Earnings",
  projectsLast30Days: "Projects, 30 days",
  projectsLast90Days: "Projects, 90 days",
  projectsLast365Days: "Projects, 365 days",
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
  const [isExpandedAll, setIsExpandedAll] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<SortItemType>(
    sortByItem.daysSinceLastProject
  );
  const [sortDir, setSortDir] = React.useState(sortDirItem.desc);

  const { data = [], isLoading } = useQuery(getClientsWithProjectDataQuery());

  if (isLoading) {
    return <FullPageSpinner />;
  }

  const sortedClients = sortClients(data, sortBy, sortDir);

  const changeSortDirection = () => {
    setSortDir(
      sortDir === sortDirItem.desc ? sortDirItem.asc : sortDirItem.desc
    );
  };

  const toggleExpandAll = () => {
    setIsExpandedAll((prevState) => !prevState);
  };

  return (
    <>
      {/** CONTROLS --> start */}
      <div
        css={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "10px",
          marginBlockEnd: "10px",
        }}
      >
        <h3>SORT BY</h3>
        <select
          onChange={(e) => setSortBy(e.target.value as SortItemType)}
          value={sortBy}
        >
          {Object.entries(clientDataItems).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
        <button onClick={changeSortDirection}>
          {sortDir === sortDirItem.desc ? (
            <HiSortDescending />
          ) : (
            <HiSortAscending />
          )}
        </button>
        <button onClick={toggleExpandAll}>
          {isExpandedAll ? "Collapse all" : "Expand all"}
        </button>
      </div>
      {/** CONTROLS --> end */}
      <SClientList>
        {sortedClients.map((client) => (
          <ClientCard
            key={client._id}
            client={client}
            isExpandedAll={isExpandedAll}
            sortBy={sortBy}
          />
        ))}
      </SClientList>
    </>
  );
}

export { Clients };
