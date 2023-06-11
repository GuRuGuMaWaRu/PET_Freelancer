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

interface IProjectPaginatedData {
  docs: IProject[];
  allDocs: number;
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
  password: string;
  confirmPassword: string;
}

export type { 
  Error,
  ErrorVariant,
  IProject,
  IProjectPaginatedData,
  IClient, 
  IEarningsByClient, 
  IEarningsByMonth, 
  IEarnings, 
  IResponseUserData,
  ILoginFormInputs,
  IRegisterFormInputs
};