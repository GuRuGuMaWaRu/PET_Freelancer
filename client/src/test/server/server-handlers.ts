import { rest } from "msw";

import { TEST_API_URL } from "../../config";
import { getUser } from "./users";

export const handlers = [
  rest.post(`${TEST_API_URL}/users/login`, async (req, res, ctx) => {
    const { email, password } = await req.json();
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
  rest.post(`${TEST_API_URL}/users/signup`, async (req, res, ctx) => {
    const newUser = await req.json();
    const user = getUser(newUser.email, newUser.password1);

    if (user) {
      return res(
        ctx.status(400),
        ctx.json({ status: "fail", message: "User already exists" }),
      );
    }

    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({ status: "success", data: user }),
    );
  }),

  rest.get("/user", (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem("is-authenticated");

    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        }),
      );
    }

    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: "admin",
      }),
    );
  }),
];
