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
  password: string;
  confirmPassword: string;
}

interface IProjectPaginatedData {
  docs: IProject[];
  allDocs: number;
}

export type { 
  IResponseUserData,
  ILoginFormInputs,
  IRegisterFormInputs,
  IProjectPaginatedData,
};
