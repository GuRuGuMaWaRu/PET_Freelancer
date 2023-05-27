import { useFetcher } from "react-router-dom";

import { useFormNotifications, useModalForm } from 'entities/projects/lib';
import { SContent, SHighlighted } from "./DeleteProjectForm.styles";
import type { IProject } from "shared/types";
import { SubmitButton } from "shared/ui";

interface IProps {
  project: IProject;
}

function DeleteProjectForm ({ project }: IProps ) {
  const fetcher = useFetcher();
  const isLoading = fetcher.state !== "idle";

  useModalForm(fetcher.data);
  useFormNotifications(fetcher.data, isLoading);

  return (
    <SContent>
      <fetcher.Form method="delete" action={`/projects/${project._id}/delete`}>
        Do you wish to delete project
        <br />
        <SHighlighted>{project.projectNr}</SHighlighted> from
        <br />
        <SHighlighted>{project.client.name}</SHighlighted>?
        <SubmitButton isLoading={isLoading}>Go ahead</SubmitButton>
      </fetcher.Form>
    </SContent>
  );
};

export { DeleteProjectForm };
