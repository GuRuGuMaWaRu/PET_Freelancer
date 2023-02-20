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
import {
  Button,
  Modal,
  ModalOpenButton,
  ModalContents,
  AddProjectForm,
  MemoPagination,
  FullPageSpinner,
} from "../components";
import { ProjectSearchInput } from "../features/projects/projects.search-input";
import { PAGE_LIMIT } from "../config";
import * as colors from "../styles/colors";

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
];

//** TODO: move this into a separate styles file (projects.styles.tsx) when I'll have FEATURES */
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
    border: `1px solid ${colors.grey}`,
    textAlign: "left",
    padding: "8px",
  },
});

const STableHeader = styled.th<{ sortName?: string }>(({ sortName }) => ({
  cursor: sortName ? "pointer" : "auto",
}));

const SDataRow = styled.tr({
  "&:nth-of-type(even)": {
    backgroundColor: colors.opaqueBlack,
  },
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
  const {
    status: projectsStatus,
    isFetching: projectsIsFetching,
    isLoading: projectsIsLoading,
    isPreviousData: projectsIsPreviousData,
    data: projects,
  } = useQuery(getProjectsPageQuery(page, sortColumn, searchQuery));
  // console.log("projectsStatus:", projectsStatus);
  // console.log("projectsIsFetching:", projectsIsFetching);
  // console.log("projectsIsLoading:", projectsIsLoading);
  // console.log("projectsIsPreviousData:", projectsIsPreviousData);

  const handleSort = (columnName: string) => {
    setSortColumn(`${sortDir}${columnName}`); //** TODO: don't really like how it is done with two states (sortColumn and sortDir) */
    setSortDir((prevDir) => (prevDir === "" ? "-" : ""));
  };

  const handleSearch = (input: string) => {
    setSearchQuery(input);
  };

  //** Calculate total number of pages */
  const pagesTotal = Math.ceil((projects?.allDocs ?? 0) / PAGE_LIMIT);

  return (
    <div>
      <SContainer>
        <ProjectSearchInput
          onSearch={handleSearch}
          isFetching={projectsIsFetching}
        />
        <Modal>
          <ModalOpenButton>
            <Button>Add Project</Button>
          </ModalOpenButton>
          <ModalContents
            aria-label="Add Project Form"
            title="Add Project"
            bgColor={colors.projectsModalBg}
          >
            <AddProjectForm clients={clients} />
          </ModalContents>
        </Modal>
      </SContainer>
      {projectsIsLoading ? (
        <FullPageSpinner />
      ) : (
        <>
          <div css={{ height: "calc(100vh-20%)" }}>
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
                {projects?.docs?.map((project) => (
                  <SDataRow key={project._id}>
                    <th>{project.client.name}</th>
                    <th>
                      {new Date(project.date).toLocaleDateString("default")}
                    </th>
                    <th>{project.projectNr}</th>
                    <th>{project.payment}</th>
                    <th>
                      {project.comments && project.comments?.length > 30
                        ? project.comments.slice(0, 30) + "..."
                        : project.comments}
                    </th>
                  </SDataRow>
                ))}
              </tbody>
            </STable>
          </div>
          <MemoPagination
            currentPage={page}
            numberOfPages={pagesTotal}
            paginationCallback={setPage}
          />
        </>
      )}
    </div>
  );
}

export { Projects, loader as projectsLoader };
