/** @jsxImportSource @emotion/react */
import React from "react";
import { useLoaderData } from "react-router-dom";
import { useQuery, QueryClient } from "@tanstack/react-query";

import { IProject, getProjectsForYear } from "../utils";
import { MemoDashboardTotals, MemoEarningsChart } from "../components";

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

const formatterUSD = new Intl.NumberFormat("en-US");

const getEarningsByMonths = (projects: IProject[]): IEarnings[] => {
  const earnings: Record<string, IEarnings> = {};
  for (const project of projects) {
    const year = new Date(project.date).getFullYear();
    const month = new Date(project.date).getMonth() + 1;

    if (!earnings[`${year}-${month}`]) {
      earnings[`${year}-${month}`] = {
        id: `${year}-${month}`,
        date: new Date(`${year}-${month}`),
        payment: project.payment * 1000,
        projects: 1,
      };
    } else {
      earnings[`${year}-${month}`].payment += project.payment * 1000;
      earnings[`${year}-${month}`].projects += 1;
    }
  }

  return Object.values(earnings);
};

function Dashboard() {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;
  const { data: projects = [], status, fetchStatus } = useQuery({
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

    return formatterUSD.format(earnings?.payment ? earnings.payment / 1000 : 0);
  }, [earningsByMonth]);

  const earningsForThisYear = React.useMemo((): string => {
    const year = new Date().getFullYear();

    const total = earningsByMonth.reduce((acc, item) => {
      if (item.date.getFullYear() === year) {
        return acc + item.payment;
      }
      return acc;
    }, 0);

    return formatterUSD.format(total !== 0 ? total / 1000 : 0);
  }, [earningsByMonth]);

  const data = React.useMemo(() => {
    return earningsByMonth
      .map((item) => ({
        date: item.date.getTime(),
        payment: item.payment / 1000,
      }))
      .sort((a, b) => a.date - b.date);
  }, [earningsByMonth]);

  return (
    <>
      <MemoDashboardTotals
        earningsForThisMonth={earningsForThisMonth}
        earningsForThisYear={earningsForThisYear}
      />
      <div
        css={{
          position: "relative",
          marginTop: "5rem",
          width: "1000px",
          height: "400px",
        }}
      >
        <MemoEarningsChart data={data} />
      </div>
    </>
  );
}

export { Dashboard, loader as dashboardLoader };
