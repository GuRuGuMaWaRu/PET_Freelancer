/** @jsxImportSource @emotion/react */

import { useGetColorFromPath } from "widgets/lib/hooks";
import { Button, Modal, ModalOpenButton, ModalContents } from "shared/ui";
import type { IClient } from "shared/types";
import { AddEditProjectForm } from "entities/projects";

interface IProps {
  clients: IClient[];
  customStyles?: string;
}

function ModalAddProject({ clients, customStyles = "" }: IProps) {
  const color = useGetColorFromPath();

  return (
    <Modal>
      <ModalOpenButton>
        <Button customStyles={customStyles}>Add Project</Button>
      </ModalOpenButton>
      <ModalContents
        aria-label="Add Project Form"
        title="Add Project"
        bgColor={color}
      >
        <AddEditProjectForm clients={clients} />
      </ModalContents>
    </Modal>
  );
}

export { ModalAddProject };
