import * as React from "react";

enum Status {
  idle = "idle",
  resolved = "resolved",
  rejected = "rejected",
  pending = "pending",
}

interface IState<T> {
  status?: Status;
  data?: T | null;
  error?: Error | null;
}

function useSafeDispatch<T>(dispatch: React.Dispatch<Partial<IState<T>>>) {
  const mounted = React.useRef(false);

  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return React.useCallback(
    (args: Partial<IState<T>>) => (mounted.current ? dispatch(args) : void 0),
    [dispatch],
  );
}

const defaultInitialState = { status: Status.idle, data: null, error: null };

function useAsync<T>(initialState: IState<T> = {}) {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  });
  const [{ status, data, error }, setState] = React.useReducer(
    (s: IState<T>, a: Partial<IState<T>>) => ({ ...s, ...a }),
    initialStateRef.current,
  );

  const safeSetState = useSafeDispatch(setState);

  const setData = React.useCallback(
    (data: T) => safeSetState({ data, status: Status.resolved }),
    [safeSetState],
  );
  const setError = React.useCallback(
    (error: Error) => safeSetState({ error, status: Status.rejected }),
    [safeSetState],
  );
  const reset = React.useCallback(() => safeSetState(initialStateRef.current), [
    safeSetState,
  ]);
  const run = React.useCallback(
    (promise: Promise<any>) => {
      if (!promise || !promise.then) {
        throw new Error(
          "The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?",
        );
      }

      safeSetState({ status: Status.pending });

      return promise.then(
        (data: T) => {
          setData(data);
          return data;
        },
        (error: Error) => {
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

export { useAsync };
