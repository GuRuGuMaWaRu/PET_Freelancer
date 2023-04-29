import { IProject } from '../shared/types'

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
  password1: string;
  password2: string;
}

interface IProjectPaginatedData {
  docs: IProject[];
  allDocs: number;
}

interface IEarnings {
  id: string;
  date: Date;
  payment: number;
  projects: number;
}

interface IEarningsByMonth {
  date: number;
  payment: number;
  projects: number;
}

export type { 
  IResponseUserData,
  ILoginFormInputs,
  IRegisterFormInputs,
  IProjectPaginatedData,
  IEarnings,
  IEarningsByMonth,
};
