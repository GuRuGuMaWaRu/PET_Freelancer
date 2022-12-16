import { redirect } from "react-router-dom";
import type { QueryClient } from "@tanstack/react-query";

import { addProject } from "../utils";

const action = (queryClient: QueryClient) => async ({
  request,
}: {
  request: Request;
}) => {
  const formData = await request.formData();
  const newProject = Object.fromEntries(formData);

  await addProject(newProject);
  queryClient.invalidateQueries({ queryKey: ["projects"]})

  if (newProject.newClient) {
    queryClient.invalidateQueries({ queryKey: ["clients"]})
  }
  
  return redirect("/");
};

export { action as projectsAddAction };
