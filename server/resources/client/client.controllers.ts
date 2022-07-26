import Client from "./client.model";
import type { IClient } from "./client.model";
import { crudControllers } from "../../utils";

export default crudControllers<IClient>(Client);
