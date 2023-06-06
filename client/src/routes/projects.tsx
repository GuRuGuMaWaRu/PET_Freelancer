/** @jsxImportSource @emotion/react */
import React from "react";
import { useQuery, QueryClient } from "@tanstack/react-query";
import styled from "@emotion/styled";
import { FaSortUp, FaSortDown, FaPen, FaRegTrashAlt } from "react-icons/fa";

import {
  FullPageSpinner,
  Modal,
  ModalOpenButton,
  ModalContents,
  MemoPagination,
} from "shared/ui";
import type { IClient } from "shared/types";
import { colors, mq, config } from "shared/const";
import { getAllClients } from "entities/clients/api";
import { DeleteProjectForm, AddEditProjectForm } from 'entities/projects'
import { ModalAddProject } from 'widgets';
import { IProjectPaginatedData, getPageOfProjects } from "utils";
import { ProjectSearchInput, ProjectListItem } from "components";

const getProjectsPageQuery = (
  page: number,
  sortColumn?: string,
  searchQuery?: string,
) => ({
  queryKey: ["projects", { page, sortColumn, searchQuery }],
  queryFn: async () => {
    const res = await getPageOfProjects(page, sortColumn, searchQuery);

    return res.data;
  },
  keepPreviousData: true,
});

const getAllClientsQuery = () => ({
  queryKey: ["clients"],
  queryFn: async () => {
    const res = await getAllClients();

    return res.data;
  },
});

const loader = (queryClient: QueryClient) => async (): Promise<{
  projectsQuery: IProjectPaginatedData;
  clientsQuery: IClient[];
}> => {
  const projectsQuery = getProjectsPageQuery(1);
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

//** TODO: move this into a separate constants file (projects.const.tsx) when I'll have FEATURES, or maybe construct columns some other way */
const columns = [
  { name: "client", sortName: "client.name" },
  { name: "date", sortName: "date" },
  { name: "project nr" },
  { name: "payment", sortName: "payment" },
  { name: "comments", sortName: "comments" },
  { name: "actions" },
];

//** TODO: move this into a separate styles file (projects.styles.tsx) when I'll have FEATURES */
const SContainer = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const STableContainer = styled.div({
  position: "relative",
  margin: "2em 0",
  // height: "820px",
});

const STablePlaceholder = styled.p({
  marginTop: "14rem",
  textAlign: "center",
  fontSize: "1.3rem",
});

const STable = styled.div({
  width: "100%",
  display: "grid",
  gap: ".4em",
  gridTemplateColumns: "repeat(2, 2fr) 3fr 1fr 2fr 90px",
  [mq.medium]: {
    gridTemplateColumns: "repeat(2, 1fr) 2fr 1fr 90px",
  },
  [mq.small]: {
    gridTemplateColumns: "1fr 2fr 1fr 90px",
  },
});

const STableHeader = styled.div<{ sortName?: string; name: string }>(
  ({ sortName, name }) => ({
    backgroundColor: colors.greenDark1,
    textAlign: "left",
    padding: "8px",
    cursor: sortName ? "pointer" : "auto",
    [mq.medium]: {
      display: name === "comments" ? "none" : "block",
    },
    [mq.small]: {
      display: name === "date" || name === "comments" ? "none" : "block",
    },
  }),
);

const SActionButton = styled.button({
  backgroundColor: "transparent",
  color: colors.white,
  border: 0,
});

//** TODO: move this into a separate utilities file (projects.utils.tsx) when I'll have FEATURES */
const capitalizeItem = (item: string): string =>
  item
    .split(" ")
    .map((item) => item.slice(0, 1).toUpperCase() + item.slice(1))
    .join(" ");

function Projects() {
  const [page, setPage] = React.useState<number>(1);
  const [sortColumn, setSortColumn] = React.useState<string>("-date");
  const [sortDir, setSortDir] = React.useState<string>("");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const { data: clients = [] } = useQuery(getAllClientsQuery());
  const { isFetching, isLoading, data: projects } = useQuery(
    getProjectsPageQuery(page, sortColumn, searchQuery),
  );

  const handleSort = (columnName: string) => {
    setSortColumn(`${sortDir}${columnName}`); //** TODO: don't really like how it is done with two states (sortColumn and sortDir) */
    setSortDir((prevDir) => (prevDir === "" ? "-" : ""));
  };

  const handleSearch = (input: string) => {
    setSearchQuery(input);
  };

  //** Calculate total number of pages */
  const pagesTotal = Math.ceil((projects?.allDocs ?? 0) / config.PAGE_LIMIT);

  return (
    <div>
      <SContainer>
        <ProjectSearchInput onSearch={handleSearch} />
        <ModalAddProject clients={clients} />
      </SContainer>
      {isLoading ? (
        <FullPageSpinner />
      ) : (
        <>
          <STableContainer>
            {isFetching && (
              <div
                css={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  backgroundColor: colors.greenLight1,
                  opacity: "0.4",
                }}
              ></div>
            )}
            {pagesTotal < 1 ? (
              <STablePlaceholder>
                There are no projects available. Please add some.
              </STablePlaceholder>
            ) : (
              <STable>
                {columns.map((column) => (
                  <STableHeader
                    key={column.name}
                    name={column.name}
                    sortName={column.sortName}
                    onClick={
                      column.sortName
                        ? () => handleSort(column?.sortName)
                        : undefined
                    }
                  >
                    {capitalizeItem(column.name)}
                    {!column.sortName ? null : column.name === sortColumn &&
                      sortDir === "" ? (
                      <FaSortUp />
                    ) : (
                      <FaSortDown />
                    )}
                  </STableHeader>
                ))}

                {projects?.docs?.map((project) => (
                  <ProjectListItem key={project._id} project={project}>
                    <Modal>
                      <ModalOpenButton>
                        <SActionButton>
                          <FaPen aria-label="edit" />
                        </SActionButton>
                      </ModalOpenButton>
                      <ModalContents
                        aria-label="Edit Project Form"
                        title="Edit Project"
                        bgColor={colors.greenLight2}
                      >
                        <AddEditProjectForm project={project} clients={clients} />
                      </ModalContents>
                    </Modal>
                    <Modal>
                      <ModalOpenButton>
                        <SActionButton>
                          <FaRegTrashAlt aria-label="delete" />
                        </SActionButton>
                      </ModalOpenButton>
                      <ModalContents
                        aria-label="Delete Project Form"
                        title="Delete Project"
                        bgColor={colors.greenLight2}
                      >
                        <DeleteProjectForm project={project} />
                      </ModalContents>
                    </Modal>
                  </ProjectListItem>
                ))}
              </STable>
            )}
          </STableContainer>

          <MemoPagination
            totalPages={pagesTotal}
            currentPage={page}
            setCurrentPage={setPage}
          />
        </>
      )}
    </div>
  );
}

export { Projects, loader as projectsLoader };
