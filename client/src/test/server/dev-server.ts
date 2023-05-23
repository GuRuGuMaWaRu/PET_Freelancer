import { setupWorker } from "msw";
import { userHandlers } from "./handlers.user";
import { projectHandlers } from "./handlers.project";

const server = setupWorker(...userHandlers, ...projectHandlers);

export * from "msw";
export { server };
