interface IAddProjectForm {
  date: string;
  client: string;
  projectNr: string;
  currency: "USD" | "EUR";
  payment: number;
  comments: string;
}

interface IEditProjectForm {
  date: string;
  client: string;
  projectNr: string;
  currency: "USD" | "EUR" | "GBP";
  payment: number;
  comments: string;
  projectId: string;
}

export type { IAddProjectForm, IEditProjectForm };
