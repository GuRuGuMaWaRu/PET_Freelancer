export enum NotificationType {
  create= "create",
  delete= "delete",
  error= "error",
  fail= "fail",
}

interface IResponseUserData {
  name: string;
  email: string;
  token: string;
}

interface ILoginFormInputs {
  email: string;
  password: string;
}

interface IRegisterFormInputs {
  name: string;
  email: string;
  password1: string;
  password2: string;
}

interface IProject {
  _id: string;
  user: string;
  client: IClient;
  projectNr: string;
  payment: number;
  currency: 'USD' | 'EUR' | 'GBP';
  date: Date;
  deleted: boolean;
  paid: boolean;
  comments?: string;
}

interface IClient {
  _id: string;
  name: string;
}

export enum ChartType {
  earnings = "earnings",
  clients = "clients",
}

interface IEarnings {
  id: string;
  date: Date;
  payment: number;
  projects: number;
}

interface IEarningsByMonth {
  date: number;
  payment: number;
  projects: number;
}

interface IEarningsByClient {
  client: string;
  payment: number;
  projects: number;
}

export type { 
  IResponseUserData,
  ILoginFormInputs,
  IRegisterFormInputs,
  IProject,
  IClient,
  IEarnings,
  IEarningsByMonth,
  IEarningsByClient
};
