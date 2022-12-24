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
  getProjectsForYear,
  getAllClients,
} from "../utils";
import * as mq from "../styles/media-queries";
import {
  MemoDashboardTotals,
  MemoEarningsChart,
  MemoClientsChart,
  Button,
  ChartSelectionButton,
  Modal,
  ModalOpenButton,
  ModalContents,
  AddProjectForm,
} from "../components";

const projectOneYearQuery = () => ({
  queryKey: ["projects", "oneyear"],
  queryFn: async () => {
    const res = await getProjectsForYear();

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
  const projectsQuery = projectOneYearQuery();
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

const setFullYearOfDates = (): Record<string, IEarnings> => {
  const dates: Record<string, IEarnings> = {};

  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);

  for (let i = 0; i <= 12; i++) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    dates[`${year}-${month}`] = {
      id: `${year}-${month}`,
      date: new Date(`${year}-${month}`),
      payment: 0,
      projects: 0,
    };

    date.setMonth(date.getMonth() + 1);
  }

  return dates;
};

const getEarningsByMonths = (projects: IProject[]): IEarnings[] => {
  const dates = setFullYearOfDates();

  for (const project of projects) {
    const year = new Date(project.date).getFullYear();
    const month = new Date(project.date).getMonth() + 1;

    dates[`${year}-${month}`].payment += project.payment * 1000;
    dates[`${year}-${month}`].projects += 1;
  }

  return Object.values(dates);
};

const getEarningsByClients = (projects: IProject[]): IEarningsByClient[] => {
  const earnings: Record<string, IEarningsByClient> = {};

  for (const project of projects) {
    const clientName = project.client.name;

    if (!earnings[clientName]) {
      earnings[clientName] = {
        client: clientName,
        payment: project.payment * 1000,
        projects: 1,
      };
    } else {
      earnings[clientName].payment += project.payment * 1000;
      earnings[clientName].projects += 1;
    }
  }

  return Object.values(earnings)
    .map((item) => ({
      ...item,
      payment: item.payment / 1000,
    }))
    .sort((a, b) => a.payment - b.payment);
};

function Dashboard() {
  const [chartType, setChartType] = React.useState<ChartType>(
    ChartType.earnings,
  );
  const [{ data: projects = [] }, { data: clients = [] }] = useQueries({
    queries: [{ ...projectOneYearQuery() }, { ...getAllClientsQuery() }],
  });
  const earningsByMonth = React.useMemo(() => {
    return getEarningsByMonths(projects);
  }, [projects]);

  const dataByMonth = React.useMemo((): IEarningsByMonth[] => {
    return earningsByMonth
      .map((item) => ({
        date: item.date.getTime(),
        payment: item.payment / 1000,
        projects: item.projects,
      }))
      .sort((a, b) => a.date - b.date);
  }, [earningsByMonth]);

  const dataByClient = React.useMemo(() => {
    return getEarningsByClients(projects);
  }, [projects]);

  return (
    <>
      <MemoDashboardTotals data={earningsByMonth} />
      <div
        css={{
          position: "relative",
          margin: "4rem 10px",
          maxWidth: "1000px",
          height: "400px",
          [mq.medium]: {
            maxWidth: "100%",
          },
        }}
      >
        <div
          css={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "1rem 0",
          }}
        >
          <Modal>
            <ModalOpenButton>
              <Button>Add Project</Button>
            </ModalOpenButton>
            <ModalContents aria-label="Add Project Form" title="Add Project">
              <AddProjectForm clients={clients} />
            </ModalContents>
          </Modal>
          <div>
            <ChartSelectionButton
              variant="earnings"
              chartType={chartType}
              onClick={() => setChartType(ChartType.earnings)}
            >
              Earnings
            </ChartSelectionButton>
            <ChartSelectionButton
              variant="clients"
              chartType={chartType}
              onClick={() => setChartType(ChartType.clients)}
            >
              Clients
            </ChartSelectionButton>
          </div>
        </div>
        {chartType === ChartType.earnings ? (
          <MemoEarningsChart data={dataByMonth} />
        ) : (
          <MemoClientsChart data={dataByClient} />
        )}
      </div>
    </>
  );
}

export { Dashboard, loader as dashboardLoader };
