/** @jsxImportSource @emotion/react */
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSortUp, FaSortDown, FaPen, FaRegTrashAlt } from "react-icons/fa";

import { columns } from "./projects.const";
import {
  SContainer,
  STableContainer,
  STableLoading,
  STablePlaceholder,
  STable,
  STableHeader,
  SActionButton,
} from "./projects.styles";
import { FullPageSpinner, Modal, MemoPagination } from "shared/ui";
import { config } from "shared/const";
import { getAllClientsQuery } from "entities/clients";
import {
  DeleteProjectForm,
  AddEditProjectForm,
  ProjectListItem,
  ModalAddProject,
  getProjectsPageQuery,
} from "entities/projects";
import { SearchInput } from "widgets";

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
    isFetching,
    isLoading,
    data: projects,
  } = useQuery(getProjectsPageQuery(page, sortColumn, searchQuery));

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
        <SearchInput onSearch={handleSearch} />
        <ModalAddProject clients={clients} />
      </SContainer>
      {isLoading ? (
        <FullPageSpinner />
      ) : (
        <>
          <STableContainer>
            {isFetching && <STableLoading />}
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
                    <Modal
                      title="Edit Project"
                      button={
                        <SActionButton>
                          <FaPen aria-label="edit" />
                        </SActionButton>
                      }
                    >
                      <AddEditProjectForm project={project} clients={clients} />
                    </Modal>
                    <Modal
                      title="Delete Project"
                      button={
                        <SActionButton>
                          <FaRegTrashAlt aria-label="delete" />
                        </SActionButton>
                      }
                    >
                      <DeleteProjectForm project={project} />
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

export { Projects };
