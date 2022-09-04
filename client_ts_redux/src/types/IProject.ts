export interface IProject {
  _id: string;
  payment: number;
  currency: string;
  paid: boolean;
  date: string;
  client: { _id: string; name: string };
  projectNr: string;
  comments: string;
}

export interface IReturnProject {
  _id: string;
  payment: number;
  currency: string;
  paid: boolean;
  date: string;
  client: string;
  projectNr: string;
  comments: string;
}

export interface IFormProject {
  payment: number;
  currency: string;
  date: string;
  client: string;
  projectNr: string;
  comments: string;
}
