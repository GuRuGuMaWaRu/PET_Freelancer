/** @jsxImportSource @emotion/react */
import React from "react";
import { useLoaderData } from "react-router-dom";
import { useQuery, QueryClient } from "@tanstack/react-query";

import {
  IProject,
  IClient,
  IEarnings,
  IEarningsByMonth,
  IEarningsByClient,
  ChartType,
  getAllProjects,
} from "../utils";
import * as mq from "../styles/media-queries";
import {
  Button,
  Modal,
  ModalOpenButton,
  ModalContents,
  AddProjectForm,
} from "../components";

const projectsQuery = () => ({
  queryKey: ["projects"],
  queryFn: async () => {
    const res = await getAllProjects();

    return res.data;
  },
});

const loader = (queryClient: QueryClient) => async (): Promise<{
  projectsQuery: IProject[];
}> => {
  const query = projectsQuery();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

function Projects() {
  const { data: projects } = useQuery(projectsQuery());
  console.log(projects);
  return (
    <>
      <label htmlFor="search">
        Search: <input id="search" type="text" />
      </label>
      <table
        css={{
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
