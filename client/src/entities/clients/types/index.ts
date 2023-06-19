interface IClientWithProjectData {
  _id: string;
  clientName: string;
  totalProjects: number;
  firstProjectDate: Date;
  lastProjectDate: Date;
  totalEarnings: number;
  projectsLast30Days: number;
  projectsLast90Days: number;
  projectsLast365Days: number;
}

export { IClientWithProjectData };
