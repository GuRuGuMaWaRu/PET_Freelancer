import { projectsKey } from "../../config";
import { buildProject } from '../generate';
import type { IProject } from '../../utils';

let projects: IProject[] = [];

// initialize
// load();

function persist() {
  window.localStorage.setItem(projectsKey, JSON.stringify(projects));
}
function load() {
  Object.assign(
    projects,
    JSON.parse(window.localStorage.getItem(projectsKey) || "[]"),
  );
}

function bootstrapFakeProjects(num = Math.floor(Math.random() * 1000) + 1): void {
  for (let i = 0; i < num; i++) {
    projects.push(buildProject());
  }
}

function getProjects(): IProject[] {
  return projects;
}

// bootstrap
bootstrapFakeProjects();

export type { IProject };
export { getProjects };