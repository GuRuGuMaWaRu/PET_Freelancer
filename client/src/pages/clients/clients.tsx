/** @jsxImportSource @emotion/react */

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import { SlArrowDown } from "react-icons/sl";

import {
  SClientControlsPanel,
  SClientList,
  SSortByButton,
  SSortItem,
} from "./clients.styles";
import {
  IClientWithProjectData,
  TClientDataItem,
  getClientsWithProjectDataQuery,
  clientDataItems,
  ClientCard,
} from "entities/clients";
import { Dropdown, FullPageSpinner } from "shared/ui";

enum sortDirItem {
  desc = "desc",
  asc = "asc",
}

const sortClients = (
  clients: IClientWithProjectData[],
  sortBy: TClientDataItem,
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
  const [sortBy, setSortBy] = React.useState<TClientDataItem>(
    "daysSinceLastProject"
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
      <SClientControlsPanel>
        <h3>SORT BY</h3>
        <Dropdown
          trigger={
            <SSortByButton>
              <span>{clientDataItems[sortBy].displayName}</span>{" "}
              <SlArrowDown
                css={{
                  fontSize: "12px",
                }}
              />
            </SSortByButton>
          }
          menu={Object.entries(clientDataItems).map(
            ([sortName, { displayName }]) => (
              <SSortItem
                key={sortName}
                onClick={() => setSortBy(sortName as TClientDataItem)}
              >
                {displayName}
              </SSortItem>
            )
          )}
          dropdownStyles={{
            top: "38px",
            width: "205px",
            padding: 0,
            border: "1px solid rgba(255, 255, 255, 0.18)",
            borderRadius: "5px",
            background: "#529596",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            overflow: "hidden",
          }}
        />
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
      </SClientControlsPanel>
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
