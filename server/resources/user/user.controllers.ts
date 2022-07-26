import User from "./user.model";
import type { IUser } from "./user.model";
import { crudControllers } from "../../utils";

export default crudControllers<IUser>(User);
