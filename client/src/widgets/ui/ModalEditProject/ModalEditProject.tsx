import { FaPen } from "react-icons/fa";

import { SActionButton } from "../../styles";
import { Modal, ModalOpenButton, ModalContents } from "shared/ui";
import { colors } from "shared/const";
import { IProject, IClient } from "shared/types";
import { AddEditProjectForm } from "entities/projects";

interface IProps {
  project: IProject;
  clients: IClient[];
}

function ModalEditProject({ project, clients }: IProps) {
  return (
    <Modal>
      <ModalOpenButton>
        <SActionButton>
          <FaPen aria-label="edit" />
        </SActionButton>
      </ModalOpenButton>
      <ModalContents
        aria-label="Edit Project Form"
        title="Edit Project"
        bgColor={colors.greenLight2}
      >
        <AddEditProjectForm project={project} clients={clients} />
      </ModalContents>
    </Modal>
  );
}

export { ModalEditProject };
