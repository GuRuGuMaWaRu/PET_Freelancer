import { Currency } from "shared/types";
import type { IProject } from "shared/types";

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

interface IProjectPaginatedData {
  docs: IProject[];
  allDocs: number;
}

export type { IProjectForm, IEditProjectForm, IProjectPaginatedData };
