import * as React from "react";

import { bootstrapUser, loginHelper, signupHelper } from '../utils/auth-helpers'
import { useAsync } from "../utils";
import type { IResponseUserData, ILoginFormInputs, IRegisterFormInputs } from '../utils'
import { FullPageErrorFallback, FullPageSpinner } from "../components/lib";

interface IState {
  user: IResponseUserData | null | undefined;
  login: (data: ILoginFormInputs) => Promise<IResponseUserData>;
  signup: (data: IRegisterFormInputs) => Promise<IResponseUserData>;
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
      return loginHelper(data).then((user) => {
          setData(user);
          return user;
        });
    },
    [setData],
  );

  const signup = React.useCallback(
    async (data: IRegisterFormInputs) => {
      return signupHelper(data).then((user) => {
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
