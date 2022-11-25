import { rest } from "msw";

import { API_URL } from "../../config";
import { getUser, addUser, getUserByToken } from "./users";
import { getProjects } from "./projects";
import { localStorageKey } from "../../config";

export const handlers = [
  rest.post(`${API_URL}/users/login`, async (req, res, ctx) => {
    const {
      email,
      password,
    }: { email: string; password: string } = await req.json();
    const user = getUser(email, password);

    if (!user) {
      return res(
        ctx.status(400),
        ctx.json({ status: "fail", message: "Invalid credentials" }),
      );
    }

    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({ status: "success", data: user }),
    );
  }),
  rest.post(`${API_URL}/users/signup`, async (req, res, ctx) => {
    const {
      name,
      email,
      password1,
    }: {
      name: string;
      email: string;
      password1: string;
      password2: string;
    } = await req.json();
    const user = getUser(email, password1);

    if (user) {
      return res(
        ctx.status(400),
        ctx.json({ status: "fail", message: "User already exists" }),
      );
    }

    addUser({ name, email, password: password1 });
    const newUser = getUser(email, password1);

    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({ status: "success", data: newUser }),
    );
  }),

  rest.get(`${API_URL}/users/getUser`, (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const token = localStorage.getItem(localStorageKey);

    if (!token) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        }),
      );
    }

    const user = getUserByToken(token);
    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        status: "success",
        data: user,
      }),
    );
  }),

  rest.get(`${API_URL}/projects`, (req, res, ctx) => {
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
];
