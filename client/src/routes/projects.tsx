/** @jsxImportSource @emotion/react */
import React from "react";
import { useQueries, QueryClient } from "@tanstack/react-query";

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

const getAllProjectsQuery = () => ({
  queryKey: ["projects"],
  queryFn: async () => {
    const res = await getAllProjects();

    return res.data;
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
  projectsQuery: IProject[];
  clientsQuery: IClient[];
}> => {
  const projectsQuery = getAllProjectsQuery();
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
  const [{ data: projects = [] }, { data: clients = [] }] = useQueries({
    queries: [{ ...getAllProjectsQuery() }, { ...getAllClientsQuery() }],
  });

  console.log(projects);

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
          <tr>
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
    </>
  );
}

export { Projects, loader as projectsLoader };
