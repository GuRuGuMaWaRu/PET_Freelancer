import * as React from "react";

enum Status {
  idle = "idle",
  resolved = "resolved",
  rejected = "rejected",
  pending = "pending",
}

interface IState<T, U> {
  status?: Status;
  data?: T | null;
  error?: U | null;
}

function useSafeDispatch<T, U>(
  dispatch: React.Dispatch<Partial<IState<T, U>>>,
) {
  const mounted = React.useRef(false);

  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return React.useCallback(
    (args: Partial<IState<T, U>>) =>
      mounted.current ? dispatch(args) : void 0,
    [dispatch],
  );
}

const defaultInitialState = {
  status: Status.idle,
  data: null,
  error: null,
};

function useAsync<T, U>(initialState: IState<T, U> = {}) {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  });
  const [{ status, data, error }, setState] = React.useReducer(
    (s: IState<T, U>, a: Partial<IState<T, U>>) => ({ ...s, ...a }),
    initialStateRef.current,
  );

  const safeSetState = useSafeDispatch(setState);

  const setData = React.useCallback(
    (data: T) => safeSetState({ data, status: Status.resolved }),
    [safeSetState],
  );
  const setError = React.useCallback(
    (error: U) => safeSetState({ error, status: Status.rejected }),
    [safeSetState],
  );
  const reset = React.useCallback(() => safeSetState(initialStateRef.current), [
    safeSetState,
  ]);
  const run = React.useCallback(
    (promise: Promise<T | null>) => {
      if (!promise || !promise.then) {
        throw new Error(
          "The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?",
        );
      }

      safeSetState({ status: Status.pending });

      return promise.then(
        (data: T | null) => {
          if (data) {
            setData(data);
          }
          return data;
        },
        (error: U) => {
          setError(error);
          return Promise.reject(error);
        },
      );
    },
    [safeSetState, setData, setError],
  );

  return {
    isIdle: status === "idle",
    isLoading: status === "pending",
    isError: status === "rejected",
    isSuccess: status === "resolved",
    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
}

export { useAsync, Status };
