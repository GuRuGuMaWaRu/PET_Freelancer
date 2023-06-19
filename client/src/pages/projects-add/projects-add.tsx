import { QueryClient } from "@tanstack/react-query";
import { addProject } from "entities/projects/api";

const action =
  (queryClient: QueryClient) =>
  async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const newProject = Object.fromEntries(formData);

    try {
      await addProject(newProject);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({
        queryKey: ["clients", "with-project-data"],
      });

      //**  refetch clients if a new client was created
      if (newProject.newClient) {
        queryClient.invalidateQueries({ queryKey: ["clients"] });
      }

      return { status: "success", message: "Project added successfully" };
    } catch (error) {
      console.log(error);
      return {
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "There was an error creating a project",
      };
    }
  };

export { action };
