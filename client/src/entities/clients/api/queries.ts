import { getAllClients, getAllClientsWithProjectData } from "./api";

const getAllClientsQuery = () => ({
  queryKey: ["clients"],
  queryFn: async () => {
    const res = await getAllClients();

    return res.data;
  },
});

const getClientsWithProjectDataQuery = () => ({
  queryKey: ["clients", "with-project-data"],
  queryFn: async () => {
    const res = await getAllClientsWithProjectData();

    return res.data;
  },
});

export { getAllClientsQuery, getClientsWithProjectDataQuery };
