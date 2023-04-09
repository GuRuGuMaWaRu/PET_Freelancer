import { client } from "../../../shared/api";
import type { IClient } from "../../../shared/types";

const getAllClients = async () => {
  return await client<IClient[]>("clients");
};

export { getAllClients };
