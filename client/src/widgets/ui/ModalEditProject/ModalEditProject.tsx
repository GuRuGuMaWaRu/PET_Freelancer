import { FaPen } from "react-icons/fa";

import { SActionButton } from "../../styles";
import { Modal, ModalOpenButton, ModalContents } from "shared/ui";
import { IProject, IClient } from "shared/types";
import { AddEditProjectForm } from "entities/projects";
import { useGetColorFromPath } from "widgets/lib/hooks";

interface IProps {
  project: IProject;
  clients: IClient[];
}

function ModalEditProject({ project, clients }: IProps) {
  const color = useGetColorFromPath();

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
        bgColor={color}
      >
        <AddEditProjectForm project={project} clients={clients} />
      </ModalContents>
    </Modal>
  );
}

export { ModalEditProject };
