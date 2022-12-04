import { client } from "./";
import type { IProject } from './'
import { localStorageKey } from "../config";

const getAllProjects = async () => {
  return await client<IProject[]>("projects");
};

const getProjectsForYear = async () => {
  const token = window.localStorage.getItem(localStorageKey);

  return await client<IProject[]>("projects/lastYear", { token: token ?? '' });
};

export { getAllProjects, getProjectsForYear };
