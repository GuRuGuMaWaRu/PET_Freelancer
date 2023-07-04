import React from "react";

import type { IProject } from "shared/types";
import { SDataCell } from "./ProjectListItem.styles";

interface IProps {
  project: IProject;
  children: React.ReactNode;
}

const ProjectListItem: React.FC<IProps> = ({ project, children }) => {
  return (
    <>
      <SDataCell name="client">{project.client.name}</SDataCell>
      <SDataCell name="date">
        <time>{new Date(project.date).toLocaleDateString("default")}</time>
      </SDataCell>
      <SDataCell name="project nr">{project.projectNr}</SDataCell>
      <SDataCell name="payment">{project.payment}</SDataCell>
      <SDataCell name="comments">
        {project.comments && project.comments?.length > 30
          ? project.comments.slice(0, 30) + "..."
          : project.comments}
      </SDataCell>
      <SDataCell name="actions">{children}</SDataCell>
    </>
  );
};

export { ProjectListItem };
