import { rest } from "msw";

import { config } from "../../shared/const";
import { getProjects, getProjectsForYear } from "./projects";

export const projectHandlers = [
  rest.get(`${config.API_URL}/projects`, (req, res, ctx) => {
    const projects = getProjects();
    return res(
      ctx.status(200),
      ctx.json({
        status: "success",
        results: projects.length,
        data: projects,
      }),
    );
  }),

  rest.get(`${config.API_URL}/projects/lastYear`, (req, res, ctx) => {
    const projects = getProjectsForYear();
    return res(
      ctx.status(200),
      ctx.json({
        status: "success",
        results: projects.length,
        data: projects,
      }),
    );
  }),
];
