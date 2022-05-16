export interface IProject {
  _id: string;
  payment: number;
  currency: string;
  paid: boolean;
  date: string;
  client: string | { _id: string; name: string };
  projectNr: string;
  comments: string;
}

export interface IReturnProject extends IProject {
  client: string;
}
