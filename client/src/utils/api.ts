import { client } from "../shared/api";
import type { IProject } from "../shared/types";

const addProject = async (project: Partial<IProject>) => {
  return await client<IProject>("projects", { data: project });
}

const deleteProject = async (projectId: string) => {
  return await client<null>(`projects/${projectId}`, { method: 'DELETE' });
}

const editProject = async (projectId: string, project: Partial<IProject>) => {
  return await client<IProject>(`projects/${projectId}`, { data: project, method: 'PATCH' });
}

export { addProject, deleteProject, editProject };
