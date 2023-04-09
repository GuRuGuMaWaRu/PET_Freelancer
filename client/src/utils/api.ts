import { config } from "../shared/const";
import { client } from "../shared/api";
import type { IProject } from "../shared/types";
import type { IProjectPaginatedData } from './'

const getPageOfProjects = async (pageParam: number, sortParam?: string, searchQuery?: string) => {
  const sort = sortParam ? `&sort=${sortParam}` : '';
  const page = `page=${pageParam}&limit=${config.PAGE_LIMIT}`;
  const search = searchQuery ? `&q=${searchQuery}` : '';

  return await client<IProjectPaginatedData>(`projects/?${page}${sort}${search}`);
};

const addProject = async (project: Partial<IProject>) => {
  return await client<IProject>("projects", { data: project });
}

const deleteProject = async (projectId: string) => {
  return await client<null>(`projects/${projectId}`, { method: 'DELETE' });
}

const editProject = async (projectId: string, project: Partial<IProject>) => {
  return await client<IProject>(`projects/${projectId}`, { data: project, method: 'PATCH' });
}

export { getPageOfProjects, addProject, deleteProject, editProject };
