import { setupWorker } from "msw";
import { handlers } from "./server-handlers";

const server = setupWorker(...handlers);

export * from "msw";
export { server };
