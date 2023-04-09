import { client } from "../../../shared/api";
import type { IProject } from "../../../shared/types";

const getProjectsForYear = async () => {
  return await client<IProject[]>("projects/lastYear");
};

export { getProjectsForYear };
