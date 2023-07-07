/** @jsxImportSource @emotion/react */

import React from "react";
import { SlOptions, SlArrowDown } from "react-icons/sl";

import {
  SClientCard,
  SClientHeader,
  SOptionsButton,
  SOptionsItem,
  SClientName,
  SClientData,
  SClientDataItem,
  SShowMoreButton,
} from "./ClientCard.styles";
import { Dropdown } from "shared/ui";
import { colors } from "shared/const";
import type {
  IClientWithProjectData,
  TClientDataItem,
} from "../../types/clients.types";
import { clientDataItems } from "../../const/clientDataItems";

interface IProps {
  client: IClientWithProjectData;
  isExpandedAll: boolean;
  sortBy: TClientDataItem;
}

function ClientCard({ client, isExpandedAll, sortBy }: IProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  React.useEffect(() => {
    setIsExpanded(isExpandedAll);
  }, [isExpandedAll]);

  return (
    <SClientCard key={client._id}>
      <SClientHeader>
        <SClientName>{client.name}</SClientName>
        <Dropdown
          trigger={
            <SOptionsButton>
              <SlOptions />
            </SOptionsButton>
          }
          menu={[
            <SOptionsItem>Edit</SOptionsItem>,
            <SOptionsItem>Delete</SOptionsItem>,
          ]}
          dropdownStyles={{
            width: "100px",
            borderRadius: "5px",
            background: "#529596",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          }}
        />
      </SClientHeader>
      <SClientDataItem>
        <div>
          {sortBy === clientDataItems.name.sortName
            ? clientDataItems.daysSinceLastProject.displayName
            : clientDataItems[sortBy].displayName}
        </div>
        <div
          css={{
            color:
              sortBy === clientDataItems.totalEarnings.sortName
                ? colors.money
                : sortBy === clientDataItems.daysSinceLastProject.sortName &&
                  client.daysSinceLastProject > 90
                ? colors.textImportant
                : colors.white,
          }}
        >
          {sortBy === clientDataItems.name.sortName
            ? client.daysSinceLastProject
            : sortBy === clientDataItems.totalEarnings.sortName
            ? client.totalEarnings.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            : client[sortBy]}
        </div>
      </SClientDataItem>
      <SClientData isExpanded={isExpanded}>
        {Object.entries(clientDataItems)
          .filter(([sortName]) => {
            if (sortName === clientDataItems.name.sortName) {
              return false;
            }
            if (
              sortBy === clientDataItems.name.sortName &&
              sortName === clientDataItems.daysSinceLastProject.sortName
            ) {
              return false;
            } else {
              return sortName !== sortBy;
            }
          })
          .map(([sortName, { displayName }]) => (
            <SClientDataItem key={sortName}>
              <div>{displayName}</div>
              <div
                css={{
                  color:
                    displayName === clientDataItems.totalEarnings.displayName
                      ? colors.money
                      : colors.white,
                }}
              >
                {sortName === clientDataItems.totalEarnings.sortName
                  ? client.totalEarnings.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                  : client[sortName as TClientDataItem]}
              </div>
            </SClientDataItem>
          ))}
      </SClientData>
      <div css={{ textAlign: "center" }}>
        <SShowMoreButton onClick={toggleExpand} aria-label="Show more">
          <SlArrowDown
            css={{
              fontSize: "1.5rem",
              transition: "transform 0.2s",
              transform: isExpanded ? "rotate(180deg)" : "",
            }}
          />
        </SShowMoreButton>
      </div>
    </SClientCard>
  );
}

export { ClientCard };
