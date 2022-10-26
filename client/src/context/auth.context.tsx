import * as React from "react";

import { useAsync } from "../utils";
import { FullPageErrorFallback } from "../components/lib";

interface IUser {
  name: string;
  email: string;
  token: string;
}

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
  data: IUser;
}

interface IState {
  user: IUser | null | undefined;
  login: (data: ILoginFormInputs) => Promise<void>;
  signup: (data: IRegisterFormInputs) => Promise<void>;
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
    IUser
  >();

  React.useEffect(() => {
    run(bootstrapUser());
  }, [run]);

  const login = React.useCallback(
    (data: ILoginFormInputs) => {
      return client("users/login", { data })
        .then(handleUserResponse)
        .then((user) => setData(user));
    },
    [setData],
  );

  const signup = React.useCallback(
    (data: IRegisterFormInputs) => {
      return client("users/signup", { data })
        .then(handleUserResponse)
        .then((user) => setData(user));
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
    return <div>loading...</div>;
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
