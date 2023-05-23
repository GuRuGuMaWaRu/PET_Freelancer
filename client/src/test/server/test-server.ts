import { setupServer } from "msw/node";
import { userHandlers } from "./handlers.user";
import { projectHandlers } from "./handlers.project";

const server = setupServer(...userHandlers, ...projectHandlers);

export * from "msw";
export { server };
