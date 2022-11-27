import { client } from "./";
import type { IProject } from './'

const getAllProjects = async () => {
  return await client<IProject[]>("projects");
};

const getProjectsForYear = async () => {
  return await client<IProject[]>("projects/lastYear");
};

export { getAllProjects, getProjectsForYear };
