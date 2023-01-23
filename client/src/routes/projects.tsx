/** @jsxImportSource @emotion/react */
import React from "react";
import {
  useQuery,
  useInfiniteQuery,
  QueryClient,
  InfiniteData,
} from "@tanstack/react-query";
import { FaSortUp, FaSortDown } from "react-icons/fa";

import {
  IProjectInfiniteData,
  IClient,
  getAllProjects,
  getAllClients,
} from "../utils";
import * as mq from "../styles/media-queries";
import {
  Button,
  Modal,
  ModalOpenButton,
  ModalContents,
  AddProjectForm,
} from "../components";

const getAllProjectsQuery = (sort?: string) => ({
  queryKey: ["projects", { sort }],
  queryFn: async ({ pageParam = 0 }) => {
    const res = await getAllProjects(pageParam, sort);

    return res.data;
  },
  getNextPageParam: (lastPage: any, pages: any) => {
    return lastPage.page;
  },
});

const getAllClientsQuery = () => ({
  queryKey: ["clients"],
  queryFn: async () => {
    const res = await getAllClients();

    return res.data;
  },
});

const loader = (queryClient: QueryClient) => async (): Promise<{
  projectsQuery: InfiniteData<IProjectInfiniteData>;
  clientsQuery: IClient[];
}> => {
  const projectsQuery = getAllProjectsQuery();
  const clientsQuery = getAllClientsQuery();

  return {
    projectsQuery:
      queryClient.getQueryData(projectsQuery.queryKey) ??
      (await queryClient.fetchInfiniteQuery(projectsQuery)),
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

const capitalizeItem = (item: string): string =>
  item
    .split(" ")
    .map((item) => item.slice(0, 1).toUpperCase() + item.slice(1))
    .join(" ");

function Projects() {
  const [sortColumn, setSortColumn] = React.useState<string | undefined>(
    undefined,
  );
  const [sortDir, setSortDir] = React.useState<string>("");

  const { data: clients = [] } = useQuery(getAllClientsQuery());
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(getAllProjectsQuery(sortColumn));

  const handleSort = (columnName: string) => {
    setSortColumn(`${sortDir}${columnName}`);
    setSortDir((prevDir) => (prevDir === "" ? "-" : ""));
  };

  return (
    <>
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
      </div>
      <table
        css={{
          marginTop: "1rem",
          borderCollapse: "collapse",
          width: "100%",
          "& th": {
            border: "1px solid #dddddd",
            textAlign: "left",
            padding: "8px",
          },
        }}
      >
        <thead>
          <tr css={{ "& th": { paddingTop: "14px", paddingBottom: "14px" } }}>
            {columns.map((column) => (
              <th
                key={column.name}
                css={{ cursor: column.sortName ? "pointer" : "auto" }}
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
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page?.docs.map((project) => (
                <tr
                  key={project._id}
                  css={{
                    "&:nth-of-type(even)": {
                      backgroundColor: "#0000002e",
                    },
                  }}
                >
                  <th>{project.client.name}</th>
                  <th>
                    {new Date(project.date).toLocaleDateString("default")}
                  </th>
                  <th>{project.projectNr}</th>
                  <th>{project.payment}</th>
                  <th>{project.comments}</th>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
}

export { Projects, loader as projectsLoader };
