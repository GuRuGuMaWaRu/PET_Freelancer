import * as React from "react";

import { useAsync } from "../utils";
import type { IResponseUser } from '../utils'
import { FullPageErrorFallback, FullPageSpinner } from "../components/lib";

interface ILoginFormInputs {
  email: string;
  password: string;
}

interface IRegisterFormInputs {
  name: string;
  email: string;
  password1: string;
  password2: string;
}

interface IResponse {
  status: string;
  data: IResponseUser;
}

interface IState {
  user: IResponseUser | null | undefined;
  login: (data: ILoginFormInputs) => Promise<IResponseUser>;
  signup: (data: IRegisterFormInputs) => Promise<IResponseUser>;
}

const localStorageKey = "__FreelancerApp_token__";

interface IConfig<T> {
  data?: T;
  token?: string;
}

async function client<T>(endpoint: string, { data, token }: IConfig<T> = {}) {
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  return window.fetch(`/api/v1/${endpoint}`, config).then(async (response) => {
    const data: IResponse = await response.json();

    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

const handleUserResponse = (res: IResponse) => {
  window.localStorage.setItem(localStorageKey, res.data.token);
  return res.data;
};

const bootstrapUser = async () => {
  let user = null;

  const token = window.localStorage.getItem(localStorageKey);
  if (token) {
    const res = await client("users/getUser", { token });
    user = res.data;
  }

  return user;
};

const AuthContext = React.createContext<IState>({} as IState);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { run, data, error, isIdle, isLoading, isError, setData } = useAsync<
    IResponseUser,
    Error
  >();

  React.useEffect(() => {
    run(bootstrapUser());
  }, [run]);

  const login = React.useCallback(
    (data: ILoginFormInputs) => {
      return client("users/login", { data })
        .then(handleUserResponse)
        .then((user) => {
          setData(user);
          return user;
        });
    },
    [setData],
  );

  const signup = React.useCallback(
    (data: IRegisterFormInputs) => {
      return client("users/signup", { data })
        .then(handleUserResponse)
        .then((user) => {
          setData(user)
          return user;
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
