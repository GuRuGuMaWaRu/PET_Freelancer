import { client } from "shared/api";
import type { IProject, IProjectPaginatedData } from "shared/types";
import { config } from "shared/const";

const getProjectsForYear = async () => {
  return await client<IProject[]>("projects/lastYear");
};

const getPageOfProjects = async (pageParam: number, sortParam?: string, searchQuery?: string) => {
  const sort = sortParam ? `&sort=${sortParam}` : '';
  const page = `page=${pageParam}&limit=${config.PAGE_LIMIT}`;
  const search = searchQuery ? `&q=${searchQuery}` : '';

  return await client<IProjectPaginatedData>(`projects/?${page}${sort}${search}`);
};

export { getProjectsForYear, getPageOfProjects };
