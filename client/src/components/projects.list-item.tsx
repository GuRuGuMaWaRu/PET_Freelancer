import React from "react";
import styled from "@emotion/styled";

import type { IProject } from "shared/types";
import { colors, mq } from "shared/const";

const SDataCell = styled.div<{ name: string }>(({ name }) => ({
  padding: ".9rem .5rem",
  "&:nth-of-type(12n+7)": {
    backgroundColor: colors.greenDark2,
  },
  "&:nth-of-type(12n+8)": {
    backgroundColor: colors.greenDark2,
  },
  "&:nth-of-type(12n+9)": {
    backgroundColor: colors.greenDark2,
  },
  "&:nth-of-type(12n+10)": {
    backgroundColor: colors.greenDark2,
  },
  "&:nth-of-type(12n+11)": {
    backgroundColor: colors.greenDark2,
  },
  "&:nth-of-type(12n+12)": {
    backgroundColor: colors.greenDark2,
  },
  [mq.medium]: {
    display: name === "comments" ? "none" : "block",
  },
  [mq.small]: {
    display: name === "date" || name === "comments" ? "none" : "block",
  },
}));

interface IProps {
  project: IProject;
  children: React.ReactNode;
}

const ProjectListItem: React.FC<IProps> = ({ project, children }) => {
  return (
    <>
      <SDataCell name="client">{project.client.name}</SDataCell>
      <SDataCell name="date">
        {new Date(project.date).toLocaleDateString("default")}
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
