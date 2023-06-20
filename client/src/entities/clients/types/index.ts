interface IClientWithProjectData {
  _id: string;
  clientName: string;
  totalProjects: number;
  firstProjectDate: string;
  lastProjectDate: string;
  totalEarnings: number;
  projectsLast30Days: number;
  projectsLast90Days: number;
  projectsLast365Days: number;
}

export type { IClientWithProjectData };
