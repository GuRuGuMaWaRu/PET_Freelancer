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

test("when data is provided, it is stringified and a POST request is made", async () => {
  const endpoint = "test-endpoint";

  server.use(
    rest.post(`${TEST_API_URL}/${endpoint}`, async (req, res, ctx) => {
      const data = await req.json();
      return res(ctx.json(data));
    }),
  );

  const customData = { a: "foo" };

  const result = await client(endpoint, { data: customData });

  expect(result).toEqual(customData);
});

test("correctly rejects the promise if there is an error", async () => {
  const endpoint = "test-endpoint";
  const testError = { message: "There's a test error" };

  server.use(
    rest.get(`${TEST_API_URL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(testError));
    }),
  );

  const error = await client(endpoint).catch((e) => e);

  expect(error.message).toEqual(testError.message);
});
