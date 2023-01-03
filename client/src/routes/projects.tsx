/** @jsxImportSource @emotion/react */
import React from "react";
import { useQueries, QueryClient } from "@tanstack/react-query";
import { useFetcher } from "react-router-dom";

import {
  IProject,
  IClient,
  IEarnings,
  IEarningsByMonth,
  IEarningsByClient,
  ChartType,
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

const getAllProjectsQuery = (limit: string) => ({
  queryKey: ["projects", { limit }],
  queryFn: async () => {
    const res = await getAllProjects(limit);

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

const loader = (queryClient: QueryClient) => async ({
  request,
}: {
  request: Request;
}): Promise<{
  projectsQuery: IProject[];
  clientsQuery: IClient[];
}> => {
  const url = new URL(request.url);
  let limit = url.searchParams.get("limit") ?? "20";

  const projectsQuery = getAllProjectsQuery(limit);
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

function Projects() {
  const [limit, setLimit] = React.useState(20);
  const fetcher = useFetcher();
  const [{ data: projects = [] }, { data: clients = [] }] = useQueries({
    queries: [
      { ...getAllProjectsQuery(`${limit}`) },
      { ...getAllClientsQuery() },
    ],
  });

  const onLoadMore = () => {
    setLimit(limit + 20);
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
            <th>Client</th>
            <th>Date</th>
            <th>Project Nr</th>
            <th>Payment</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {projects?.map((project) => (
            <tr
              key={project._id}
              css={{
                "&:nth-of-type(even)": {
                  backgroundColor: "#0000002e",
                },
              }}
            >
              <th>{project.client.name}</th>
              <th>{new Date(project.date).toLocaleDateString("default")}</th>
              <th>{project.projectNr}</th>
              <th>{project.payment}</th>
              <th>{project.comments}</th>
            </tr>
          ))}
        </tbody>
      </table>
      <fetcher.Form onSubmit={onLoadMore}>
        <input type="text" name="limit" defaultValue={limit} hidden />
        <button>Load more</button>
      </fetcher.Form>
    </>
  );
}

export { Projects, loader as projectsLoader };
