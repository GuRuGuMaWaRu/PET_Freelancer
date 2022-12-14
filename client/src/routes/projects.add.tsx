import { redirect } from "react-router-dom";
import { addProject } from "../utils";

const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const newProject = Object.fromEntries(formData);

  await addProject(newProject);
  return redirect("/");
};

export { action as projectsAddAction };
