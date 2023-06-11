import { QueryClient } from "@tanstack/react-query";
import { editProject } from "../../utils";

const action = (queryClient: QueryClient) => async ({
  params,
  request,
}: {
  params: Record<string, any>;
  request: Request;
}) => {
  const formData = await request.formData();
  const newProject = Object.fromEntries(formData);

  try {
    await editProject(params.projectId, newProject);
    queryClient.invalidateQueries({ queryKey: ["projects"] });

    //**  refetch clients if a new client was created
    if (newProject.newClient) {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    }

    return { status: "success", message: "Project updated successfully" };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "There was an error updating a project",
    };
  }
};

export { action };
