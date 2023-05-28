interface Error {
  message: string | undefined;
}

type ErrorVariant = "stacked" | "inline";

export enum Currency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP"
}

interface IProject {
  _id: string;
  user: string;
  client: IClient;
  projectNr: string;
  payment: number;
  currency: Currency;
  date: Date;
  deleted: boolean;
  paid: boolean;
  comments?: string;
}

interface IClient {
  _id: string;
  name: string;
}

interface IEarningsByClient {
  client: string;
  payment: number;
  projects: number;
}

interface IEarningsByMonth {
  date: number;
  payment: number;
  projects: number;
}

interface IEarnings {
  id: string;
  date: Date;
  payment: number;
  projects: number;
}

export type { Error, ErrorVariant, IProject, IClient, IEarningsByClient, IEarningsByMonth, IEarnings };