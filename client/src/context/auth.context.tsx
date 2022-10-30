import * as React from "react";

import {
  useAsync,
  client,
  IResponseUserData,
  ILoginFormInputs,
  IRegisterFormInputs,
} from "../utils";
import { FullPageErrorFallback, FullPageSpinner } from "../components/lib";

interface IState {
  user: IResponseUserData | null | undefined;
  login: (data: ILoginFormInputs) => Promise<IResponseUserData>;
  signup: (data: IRegisterFormInputs) => Promise<IResponseUserData>;
}

const localStorageKey = "__FreelancerApp_token__";

async function bootstrapUser() {
  let user: IResponseUserData | null = null;

  const token = window.localStorage.getItem(localStorageKey);
  if (token) {
    const res = await client<IResponseUserData>("users/getUser", { token });
    user = res.data;
  }

  return user;
}

const AuthContext = React.createContext<IState>({} as IState);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { run, data, error, isIdle, isLoading, isError, setData } = useAsync<
    IResponseUserData,
    Error
  >();

  React.useEffect(() => {
    run(bootstrapUser());
  }, [run]);

  const login = React.useCallback(
    async (data: ILoginFormInputs) => {
      return client<IResponseUserData>("users/login", { data }).then((res) => {
        window.localStorage.setItem(localStorageKey, res.data.token);
        setData(res.data);
        return res.data;
      });
    },
    [setData],
  );

  const signup = React.useCallback(
    async (data: IRegisterFormInputs) => {
      return client<IResponseUserData>("users/signup", { data }).then((res) => {
        window.localStorage.setItem(localStorageKey, res.data.token);
        setData(res.data);
        return res.data;
      });
    },
    [setData],
  );

  const value = React.useMemo(
    () => ({
      user: data,
      login,
      signup,
    }),
    [data, login, signup],
  );

  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError && error) {
    return <FullPageErrorFallback error={error} />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
