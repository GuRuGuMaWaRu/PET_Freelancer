/** @jsxImportSource @emotion/react */
import React from "react";
import { useLoaderData } from "react-router-dom";
import { useQuery, QueryClient } from "@tanstack/react-query";

import * as colors from "../styles/colors";
import { IProject, getProjectsForYear } from "../utils";

interface ISeries {
  label: string;
  data: IEarnings[];
}

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
  const { data: projects } = useQuery({
    ...projectOneYearQuery(),
    initialData,
  });

  const earningsByMonth = React.useMemo(() => getEarningsByMonths(projects), [
    projects,
  ]);
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

  const currentMonth = new Date().toLocaleDateString("default", {
    month: "long",
  });
  const currentYear = new Date().getFullYear();

  const data = React.useMemo((): ISeries[] => {
    return [
      {
        label: "Earnings",
        data: earningsByMonth,
      },
    ];
  }, [earningsByMonth]);

  return (
    <>
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          marginTop: "1rem",
        }}
      >
        <div>
          <div css={{ fontSize: "2rem", fontWeight: "bold", opacity: 0.7 }}>
            {currentMonth.toUpperCase()}
          </div>
          <div css={{ display: "grid", gridTemplateColumns: "auto 1fr" }}>
            <span css={{ marginTop: ".9rem", marginRight: ".3rem" }}>$</span>{" "}
            <span
              css={{
                color: colors.primary,
                fontSize: "4rem",
                fontWeight: "bold",
              }}
            >
              {earningsForThisMonth}
            </span>
          </div>
        </div>
        <div>
          <div css={{ fontSize: "2rem", fontWeight: "bold", opacity: 0.7 }}>
            {currentYear}
          </div>
          <div css={{ display: "flex" }}>
            <span css={{ marginTop: ".9rem", marginRight: ".3rem" }}>$</span>{" "}
            <span
              css={{
                color: colors.primary,
                fontSize: "4rem",
                fontWeight: "bold",
              }}
            >
              {earningsForThisYear}
            </span>
          </div>
        </div>
      </div>
      <div
        css={{
          position: "relative",
          marginTop: "5rem",
          width: "1000px",
          height: "400px",
        }}
      >
        <div css={{ width: "100%", height: "100%" }}>Chart will be here...</div>
      </div>
    </>
  );
}

export { Dashboard, loader as dashboardLoader };
