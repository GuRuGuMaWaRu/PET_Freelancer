export * from "./404/not-found";
export * from "./app-authenticated/app-authenticated";
export * from "./app-unauthenticated/app-unauthenticated";
export * from "./error-page/error-page";
export * from "./root-page/root-page";

export * from "./dashboard/dashboard";
export { loader as dashboardLoader } from "./dashboard/dashboard.loaders";
export * from "./projects/projects";
export { loader as projectsLoader } from "./projects/projects.loaders";
export { action as projectsAddAction } from "./projects-add/projects-add";
export { action as projectsDeleteAction } from "./projects-delete/projects-delete";
export { action as projectsEditAction } from "./projects-edit/projects-edit";
export * from "./clients/clients";
export { loader as clientsLoader } from "./clients/clients.loaders";
