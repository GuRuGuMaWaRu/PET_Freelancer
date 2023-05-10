interface IAddProjectForm {
  date: string;
  client: string;
  projectNr: string;
  currency: "USD" | "EUR";
  payment: number;
  comments: string;
}

export type { IAddProjectForm };
