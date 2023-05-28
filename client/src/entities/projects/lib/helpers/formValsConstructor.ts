import { Currency } from "shared/types";
import type { IProject } from "shared/types";
import type { IProjectForm } from 'entities/projects/types'

const formValsConstructor = (project: IProject | undefined): IProjectForm & {projectId: string} => ({
    date: project
      ? new Date(project.date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    client: project?.client.name ?? "",
    projectNr: project?.projectNr ?? "",
    currency: project?.currency ?? Currency.USD,
    payment: project?.payment ?? 0,
    comments: project?.comments ?? "",
    projectId: project?._id ?? "",
});

export {formValsConstructor}