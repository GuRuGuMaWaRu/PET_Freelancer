/** @jsxImportSource @emotion/react */
import React from "react";
import { useQuery, QueryClient } from "@tanstack/react-query";
import styled from "@emotion/styled";
import { FaSortUp, FaSortDown } from "react-icons/fa";

import {
  IProjectPaginatedData,
  IClient,
  getPageOfProjects,
  getAllClients,
} from "../utils";
import * as mq from "../styles/media-queries";
import {
  Button,
  Modal,
  ModalOpenButton,
  ModalContents,
  AddProjectForm,
  Pagination,
} from "../components";
import { PAGE_LIMIT } from "../config";

const getPageOfProjectsQuery = (page: number, sortColumn?: string) => ({
  queryKey: ["projects", { page, sortColumn }],
  queryFn: async () => {
    const res = await getPageOfProjects(page, sortColumn);

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
  const projectsQuery = getPageOfProjectsQuery(1);
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

const columns = [
  { name: "client", sortName: "client.name" },
  { name: "date", sortName: "date" },
  { name: "project nr" },
  { name: "payment", sortName: "payment" },
  { name: "comments", sortName: "comments" },
];

const SContainer = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const STable = styled.table({
  marginTop: "1rem",
  borderCollapse: "collapse",
  width: "100%",
  "& th": {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px",
  },
});

const STableHeader = styled.th<{ sortName?: string }>(({ sortName }) => ({
  cursor: sortName ? "pointer" : "auto",
}));

const SDataRow = styled.tr({
  "&:nth-of-type(even)": {
    backgroundColor: "#0000002e",
  },
});

const capitalizeItem = (item: string): string =>
  item
    .split(" ")
    .map((item) => item.slice(0, 1).toUpperCase() + item.slice(1))
    .join(" ");

function Projects() {
  const [page, setPage] = React.useState<number>(1);
  const [sortColumn, setSortColumn] = React.useState<string | undefined>(
    undefined,
  );
  const [sortDir, setSortDir] = React.useState<string>("");

  const { data: clients = [] } = useQuery(getAllClientsQuery());
  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
  } = useQuery(getPageOfProjectsQuery(page, sortColumn));

  console.log(data);

  const handleSort = (columnName: string) => {
    setSortColumn(`${sortDir}${columnName}`);
    setSortDir((prevDir) => (prevDir === "" ? "-" : ""));
  };

  //** Calculate total number of pages */
  const pagesTotal = Math.ceil((data?.allDocs ?? 0) / PAGE_LIMIT);

  return (
    <>
      <SContainer>
        <label htmlFor="search">
          Search: <input id="search" type="text" />
        </label>
        <Modal>
          <ModalOpenButton>
            <Button>Add Project</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Add Project Form" title="Add Project">
            <AddProjectForm clients={clients} />
          </ModalContents>
        </Modal>
      </SContainer>
      <STable>
        <thead>
          <tr>
            {columns.map((column) => (
              <STableHeader
                key={column.name}
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
          </tr>
        </thead>
        <tbody>
          {data?.docs?.map((project) => (
            <SDataRow key={project._id}>
              <th>{project.client.name}</th>
              <th>{new Date(project.date).toLocaleDateString("default")}</th>
              <th>{project.projectNr}</th>
              <th>{project.payment}</th>
              <th>{project.comments}</th>
            </SDataRow>
          ))}
        </tbody>
      </STable>
      <Pagination
        currentPage={page}
        numberOfPages={pagesTotal}
        paginationCallback={setPage}
      />
    </>
  );
}

export { Projects, loader as projectsLoader };
