import { rest } from "msw";

import { TEST_API_URL } from "../../config";
import { users } from "./users";

export const handlers = [
  rest.post(`${TEST_API_URL}/users/login`, async (req, res, ctx) => {
    const { email, password } = await req.json();
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      return res(
        ctx.status(400),
        ctx.json({ status: "fail", message: "Invalid credentials" }),
      );
    }
    console.log("and we are in!");
    // Persist user's authentication in the session
    // sessionStorage.setItem("is-authenticated", "true");

    return res(
      // Respond with a 200 status code
      ctx.status(200),
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
