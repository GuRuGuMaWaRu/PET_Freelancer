import { client } from "./";
import type { IProject, IClient } from './'
import { localStorageKey } from "../config";

const getAllProjects = async (limit: string) => {
  const token = window.localStorage.getItem(localStorageKey);

  return await client<IProject[]>(`projects/?limit=${limit}`, { token: token ?? '' });
};

const getProjectsForYear = async () => {
  const token = window.localStorage.getItem(localStorageKey);

  return await client<IProject[]>("projects/lastYear", { token: token ?? '' });
};

const getAllClients = async () => {
  const token = window.localStorage.getItem(localStorageKey);

  return await client<IClient[]>("clients", { token: token ?? '' });
};

const addProject = async (project: Partial<IProject>) => {
  const token = window.localStorage.getItem(localStorageKey);

  return await client<IProject>("projects", { token: token ?? '', data: project });
}

export { getAllProjects, getProjectsForYear, getAllClients, addProject };
