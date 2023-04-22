import { useGetColorFromPath } from './AddProjectModal.hooks';
import { Button, Modal, ModalOpenButton, ModalContents } from "shared/ui";
import type { IClient } from "shared/types";
import { AddProjectForm } from "components";

interface IProps {
  clients: IClient[];
}

function AddProjectModal({ clients }: IProps) {
  const color = useGetColorFromPath();

  return (
    <Modal>
      <ModalOpenButton>
        <Button>Add Project</Button>
      </ModalOpenButton>
      <ModalContents
        aria-label="Add Project Form"
        title="Add Project"
        bgColor={color}
      >
        <AddProjectForm clients={clients} />
      </ModalContents>
    </Modal>
  );
}

export { AddProjectModal };
