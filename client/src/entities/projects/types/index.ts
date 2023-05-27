interface IProjectForm {
    date: string;
  client: string;
  projectNr: string;
  currency: "USD" | "EUR" | "GBP";
  payment: number;
  comments: string;
}

interface IEditProjectForm extends IProjectForm {
  projectId: string;
} 

export type { IProjectForm, IEditProjectForm };
