/** @jsxImportSource @emotion/react */
import React from "react";
import { useLoaderData } from "react-router-dom";
import { useQuery, QueryClient } from "@tanstack/react-query";

import {
  IProject,
  IEarningsByMonth,
  IEarningsByClient,
  ChartType,
  getProjectsForYear,
  formatUSD,
} from "../utils";
import {
  MemoDashboardTotals,
  MemoEarningsChart,
  MemoClientsChart,
  Button,
  ChartSelectionButton,
} from "../components";

interface IEarnings {
  id: string;
  date: Date;
  payment: number;
  projects: number;
}

const projectOneYearQuery = () => ({
  queryKey: ["projects", "oneyear"],
  queryFn: async () => {
    const res = await getProjectsForYear();

    return res.data;
  },
});

const loader = (queryClient: QueryClient) => async (): Promise<IProject[]> => {
  const query = projectOneYearQuery();
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
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
    if (!earnings[project.client]) {
      earnings[project.client] = {
        client: project.client,
        payment: project.payment * 1000,
        projects: 1,
      };
    } else {
      earnings[project.client].payment += project.payment * 1000;
      earnings[project.client].projects += 1;
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
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const { data: projects = [] } = useQuery({
    ...projectOneYearQuery(),
    initialData,
  });

  const earningsByMonth = React.useMemo(() => {
    return getEarningsByMonths(projects);
  }, [projects]);

  const earningsForThisMonth = React.useMemo((): string => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    const earnings = earningsByMonth.find(
      (item) => item.id === `${year}-${month}`,
    );

    return formatUSD(earnings?.payment ? earnings.payment / 1000 : 0);
  }, [earningsByMonth]);

  const earningsForThisYear = React.useMemo((): string => {
    const year = new Date().getFullYear();

    const total = earningsByMonth.reduce((acc, item) => {
      if (item.date.getFullYear() === year) {
        return acc + item.payment;
      }
      return acc;
    }, 0);

    return formatUSD(total !== 0 ? total / 1000 : 0);
  }, [earningsByMonth]);

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
      <MemoDashboardTotals
        earningsForThisMonth={earningsForThisMonth}
        earningsForThisYear={earningsForThisYear}
      />
      <div
        css={{
          position: "relative",
          marginTop: "4rem",
          maxWidth: "1000px",
          height: "400px",
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
          <Button>Add Project</Button>
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
