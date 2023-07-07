/** @jsxImportSource @emotion/react */
import { Button, Modal } from "shared/ui";
import type { IClient } from "shared/types";
import { AddEditProjectForm } from "entities/projects";

interface IProps {
  clients: IClient[];
  customStyles?: string;
}

function ModalAddProject({ clients, customStyles = "" }: IProps) {
  return (
    <Modal
      title="Add Project"
      button={<Button customStyles={customStyles}>Add Project</Button>}
    >
      <AddEditProjectForm clients={clients} />
    </Modal>
  );
}

export { ModalAddProject };
