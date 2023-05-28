import { Currency } from "shared/types";

interface IProjectForm {
    date: string;
  client: string;
  projectNr: string;
  currency: Currency;
  payment: number;
  comments: string;
}

interface IEditProjectForm extends IProjectForm {
  projectId: string;
} 

export type { IProjectForm, IEditProjectForm };
