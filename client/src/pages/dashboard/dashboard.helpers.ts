import type { IProject, IEarningsByClient } from "shared/types";
import type { IEarnings } from "utils";

const setFullYearOfDates = (): Record<string, IEarnings> => {
  const dates: Record<string, IEarnings> = {};

  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  date.setDate(1); //** without this line I was getting an error on February 28th */

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

export { getEarningsByMonths, getEarningsByClients };
