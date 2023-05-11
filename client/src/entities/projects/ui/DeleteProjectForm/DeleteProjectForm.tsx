import { useFetcher } from "react-router-dom";

import type { IProject } from "shared/types";
import { Button, Spinner } from "shared/ui";
import { SContent, SHighlighted, SButtons } from "./DeleteProjectForm.styles";
import { useModalForm } from '../../hooks/useModalForm';

interface IProps {
  project: IProject;
}

function DeleteProjectForm ({ project }: IProps ) {
  const fetcher = useFetcher();
  const isLoading = fetcher.state !== "idle";

  useModalForm(fetcher.data, isLoading);

  return (
    <SContent>
      <fetcher.Form method="delete" action={`/projects/${project._id}/delete`}>
        Do you wish to delete project
        <br />
        <SHighlighted>{project.projectNr}</SHighlighted> from
        <br />
        <SHighlighted>{project.client.name}</SHighlighted>?
        <SButtons>
          <Button type="submit" disabled={isLoading}>
            Go ahead {isLoading ? <Spinner css={{ marginLeft: 7 }} /> : null}
          </Button>
        </SButtons>
      </fetcher.Form>
    </SContent>
  );
};

export { DeleteProjectForm };
