import React from "react";
import { useQueries } from "@tanstack/react-query";

import { projectsOneYearQuery } from "../../entities/projects/api";
import { getAllClientsQuery } from "../../entities/clients/api";
import type { IEarningsByMonth } from "../../utils";
import { getEarningsByMonths, getEarningsByClients } from './dashboard.helpers';

const useDashboardData = () => {
  const [{ data: projects = [] }, { data: clients = [] }] = useQueries({
    queries: [{ ...projectsOneYearQuery() }, { ...getAllClientsQuery() }],
  });

  const earningsByMonth = React.useMemo(() => {
    return getEarningsByMonths(projects);
  }, [projects]);

  const dataByClient = React.useMemo(() => {
    return getEarningsByClients(projects);
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

  return { earningsByMonth, dataByClient, dataByMonth, clients };
};

export { useDashboardData };
