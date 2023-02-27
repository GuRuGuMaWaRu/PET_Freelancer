import { client } from "./";
import type { IProjectPaginatedData, IProject, IClient } from './'
import { localStorageKey, PAGE_LIMIT } from "../config";

const getPageOfProjects = async (pageParam: number, sortParam?: string, searchQuery?: string) => {
  const token = window.localStorage.getItem(localStorageKey);
  const sort = sortParam ? `&sort=${sortParam}` : '';
  const page = `page=${pageParam}&limit=${PAGE_LIMIT}`;
  const search = searchQuery ? `&q=${searchQuery}` : '';

  return await client<IProjectPaginatedData>(`projects/?${page}${sort}${search}`, { token: token ?? '' });
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

const deleteProject = async (projectId: string) => {
  const token = window.localStorage.getItem(localStorageKey);

  return await client<null>(`projects/${projectId}`, { token: token ?? '', method: 'DELETE' });
}

export { getPageOfProjects, getProjectsForYear, getAllClients, addProject, deleteProject };
