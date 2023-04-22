import { Button, Modal, ModalOpenButton, ModalContents } from "shared/ui";
import { colors } from "shared/const";
import type { IClient } from "shared/types";
import { AddProjectForm } from "components";

interface IProps {
  clients: IClient[];
}

function AddProjectModal({ clients }: IProps) {
  return (
    <Modal>
      <ModalOpenButton>
        <Button>Add Project</Button>
      </ModalOpenButton>
      <ModalContents
        aria-label="Add Project Form"
        title="Add Project"
        bgColor={colors.dashboardModalBg}
      >
        <AddProjectForm clients={clients} />
      </ModalContents>
    </Modal>
  );
}

export { AddProjectModal };
