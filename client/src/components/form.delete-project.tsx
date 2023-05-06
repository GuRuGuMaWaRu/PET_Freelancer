import React from "react";
import styled from "@emotion/styled";
import { useFetcher } from "react-router-dom";

import type { IProject } from "shared/types";
import { Button, Spinner, useModal } from "shared/ui";
import { colors } from "shared/const";
import { NotificationType, useNotification } from "entities/notification";

const SContent = styled.div({
  padding: "2rem 1rem",
  lineHeight: "1.8rem",
});

const SHighlighted = styled.span({
  backgroundColor: colors.text2,
  padding: "0 0.5rem",
});

const SButtons = styled.div({
  marginTop: "2rem",
});

interface IProps {
  project: IProject;
}

const DeleteProjectForm: React.FC<IProps> = ({ project }) => {
  const fetcher = useFetcher();
  const { setIsOpen } = useModal();
  const { showNotification } = useNotification();

  const isLoading = fetcher.state !== "idle";

  //** Show ERROR or SUCCESS message */
  React.useEffect(() => {
    if (fetcher.data && !isLoading) {
      const type =
        fetcher.data.status === "success"
          ? NotificationType.delete
          : NotificationType.error;

      showNotification(type, fetcher.data.message);
    }

    if (fetcher?.data?.status === "success") {
      setIsOpen(false);
    }
  }, [fetcher.data, isLoading, setIsOpen, showNotification]);

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
