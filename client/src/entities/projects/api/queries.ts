import { getProjectsForYear, getPageOfProjects } from "./api";

const projectsOneYearQuery = () => ({
  queryKey: ["projects", "oneyear"],
  queryFn: async () => {
    const res = await getProjectsForYear();

    return res.data;
  },
});

const getProjectsPageQuery = (
  page: number,
  sortColumn?: string,
  searchQuery?: string,
) => ({
  queryKey: ["projects", { page, sortColumn, searchQuery }],
  queryFn: async () => {
    const res = await getPageOfProjects(page, sortColumn, searchQuery);

    return res.data;
  },
  keepPreviousData: true,
});

export { projectsOneYearQuery, getProjectsPageQuery };
