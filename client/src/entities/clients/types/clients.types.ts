import { clientDataItems } from "..";

interface IClientWithProjectData {
  _id: string;
  name: string;
  totalProjects: number;
  firstProjectDate: string;
  lastProjectDate: string;
  totalEarnings: number;
  projectsLast30Days: number;
  projectsLast90Days: number;
  projectsLast365Days: number;
  daysSinceLastProject: number;
}

type TClientDataItem = keyof typeof clientDataItems;

export type { IClientWithProjectData, TClientDataItem };
