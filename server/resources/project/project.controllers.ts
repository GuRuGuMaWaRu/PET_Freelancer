import Project from "./project.model";
import type { IProject } from "./project.model";
import { crudControllers } from "../../utils";

export default crudControllers<IProject>(Project);
