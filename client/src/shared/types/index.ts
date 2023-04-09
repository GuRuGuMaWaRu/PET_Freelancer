interface Error {
  message: string | undefined;
}

type ErrorVariant = "stacked" | "inline";

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

export type { Error, ErrorVariant, IProject, IClient };