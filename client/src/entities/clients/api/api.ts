import { client } from "shared/api";
import type { IClient } from "shared/types";
import type { IClientWithProjectData } from "../types/clients.types";

const getAllClients = async () => {
  return await client<IClient[]>("clients");
};

const getAllClientsWithProjectData = async () => {
  return await client<IClientWithProjectData[]>("clients/withprojectdata");
};

export { getAllClients, getAllClientsWithProjectData };
