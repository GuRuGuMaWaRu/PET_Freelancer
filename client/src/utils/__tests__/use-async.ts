import { renderHook, act } from "@testing-library/react";
import { useAsync, Status } from "../hooks";

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

  const { promise, resolve } = deferred<symbol, Error>();
  const { result } = renderHook(() => useAsync<symbol, Error>());

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
  const { result } = renderHook(() => useAsync<unknown, symbol>());

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
  const { result } = renderHook(() =>
    useAsync<symbol, unknown>(customInitialState),
  );

  expect(result.current).toEqual({
    ...resolvedState,
    ...customInitialState,
  });
});

test("can set data", () => {
  const mockData = Symbol("resolved value");
  const { result } = renderHook(() => useAsync<symbol, Error>());

  act(() => {
    result.current.setData(mockData);
  });
  expect(result.current).toEqual({ ...resolvedState, data: mockData });
});

test("can set error", () => {
  const mockError = Symbol("rejected value");
  const { result } = renderHook(() => useAsync<unknown, symbol>());

  act(() => {
    result.current.setError(mockError);
  });
  expect(result.current).toEqual({ ...rejectedState, error: mockError });
});

test("can reset data", () => {
  const mockData = Symbol("resolved value");
  const { result } = renderHook(() => useAsync<symbol, Error>());

  act(() => result.current.setData(mockData));
  expect(result.current).toEqual({ ...resolvedState, data: mockData });

  act(() => result.current.reset());
  expect(result.current).toEqual(defaultState);
});

test("no state updates happen if the component is unmounted while pending", async () => {
  const resolvedValue = Symbol("resolved value");
  const { promise, resolve } = deferred<symbol, Error>();
  const { result, unmount } = renderHook(() => useAsync<symbol, Error>());

  act(() => {
    result.current.run(promise);
  });
  unmount();
  expect(result.current).toEqual(pendingState);

  await act(async () => {
    resolve(resolvedValue);
  });

  expect(result.current).not.toEqual({ ...resolvedState, data: resolvedValue });
});
