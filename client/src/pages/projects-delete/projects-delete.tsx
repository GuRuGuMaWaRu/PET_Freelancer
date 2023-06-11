import { QueryClient } from "@tanstack/react-query";
import { deleteProject } from "entities/projects/api";

const action = (queryClient: QueryClient) => async ({
  params,
}: {
  params: Record<string, any>;
}) => {
  try {
    await deleteProject(params.projectId);
    queryClient.invalidateQueries({ queryKey: ["projects"] });

    return { status: "success", message: "Project deleted successfully" };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "There was an error deleting a project",
    };
  }
};

export { action };
