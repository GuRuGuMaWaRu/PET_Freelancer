import { client } from "./";
import type { IProject } from './'

const getAllProjects = async () => {
  return await client<IProject[]>("projects");
};

export { getAllProjects };
