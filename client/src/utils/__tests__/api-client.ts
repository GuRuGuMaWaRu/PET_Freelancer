import {
  server,
  rest,
  RestRequest,
  PathParams,
} from "../../test/server/test-server";
import { client } from "../../utils";
import { TEST_API_URL } from "../../config";

test("calls fetch at the endpoint with the arguments for GET requests", async () => {
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "VALUE" };

  server.use(
    rest.get(`${TEST_API_URL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult));
    }),
  );

  const result = await client(endpoint);

  expect(result).toEqual(mockResult);
});

test("adds auth token when a token is provided", async () => {
  let request: RestRequest<never, PathParams<string>> | undefined;
  const token = "test-token";
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "VALUE" };

  server.use(
    rest.get(`${TEST_API_URL}/${endpoint}`, async (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    }),
  );

  await client(endpoint, { token });

  expect(request?.headers.get("Authorization")).toBe(`Bearer ${token}`);
});

test("allows for config overrides", async () => {
  let request: RestRequest<never, PathParams<string>> | undefined;
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "VALUE" };

  server.use(
    rest.get(`${TEST_API_URL}/${endpoint}`, async (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    }),
  );

  const customConfig = {
    mode: "cors",
    headers: { Boom: "foo" },
  };

  await client(endpoint, customConfig);

  expect(request?.mode).toBe(customConfig.mode);
  expect(request?.headers.get("Boom")).toBe(customConfig.headers.Boom);
});
