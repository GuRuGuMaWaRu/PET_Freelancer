import { renderHook, act } from "@testing-library/react";
import { useAsync, Status } from "../hooks";

let spy: jest.SpyInstance;

beforeEach(() => {
  spy = jest.spyOn(console, "error");
});

afterEach(() => {
  spy.mockRestore();
});

function deferred<T, U>() {
  let resolve!: (value: T) => void;
  let reject!: (value: U) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

const defaultState = {
  status: "idle",
  data: null,
  error: null,

  isIdle: true,
  isLoading: false,
  isError: false,
  isSuccess: false,

  run: expect.any(Function),
  reset: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
};

const pendingState = {
  ...defaultState,
  status: "pending",
  isIdle: false,
  isLoading: true,
};

const resolvedState = {
  ...defaultState,
  status: "resolved",
  isIdle: false,
  isSuccess: true,
};

const rejectedState = {
  ...defaultState,
  status: "rejected",
  isIdle: false,
  isError: true,
};

test("calling run with a promise which resolves", async () => {
  const resolvedValue = Symbol("resolved value");

  const { promise, resolve } = deferred<symbol, unknown>();
  const { result } = renderHook(() => useAsync<symbol>());

  expect(result.current).toEqual(defaultState);

  act(() => {
    result.current.run(promise);
  });
  expect(result.current).toEqual(pendingState);

  await act(async () => {
    resolve(resolvedValue);
  });
  expect(result.current).toEqual({
    ...resolvedState,
    data: resolvedValue,
  });

  act(() => {
    result.current.reset();
  });
  expect(result.current).toEqual(defaultState);
});

test("calling run with a promise which rejects", async () => {
  const rejectedValue = Symbol("rejected value");

  const { promise, reject } = deferred<unknown, symbol>();
  const { result } = renderHook(() => useAsync());

  expect(result.current).toEqual(defaultState);

  let p: Promise<unknown>;
  act(() => {
    p = result.current.run(promise);
  });
  expect(result.current).toEqual(pendingState);

  await act(async () => {
    reject(rejectedValue);
    await p.catch(() => {
      /* ignore error */
    });
  });
  expect(result.current).toEqual({ ...rejectedState, error: rejectedValue });
});

test("can specify an initial state", () => {
  const mockData = Symbol("resolved value");

  const customInitialState = { status: Status.resolved, data: mockData };
  const { result } = renderHook(() => useAsync<symbol>(customInitialState));
  expect(result.current).toEqual({
    ...resolvedState,
    ...customInitialState,
  });
});
