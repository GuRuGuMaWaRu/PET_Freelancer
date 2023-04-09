import { getProjectsForYear } from "./api";

const projectsOneYearQuery = () => ({
  queryKey: ["projects", "oneyear"],
  queryFn: async () => {
    const res = await getProjectsForYear();

    return res.data;
  },
});

export { projectsOneYearQuery };
