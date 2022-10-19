import * as React from "react";

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
  user: IUser | null;
  status: AsyncStatus;
  login: (data: ILoginFormInputs) => Promise<void | IUser>;
  signup: (data: IRegisterFormInputs) => Promise<void | IUser>;
}

enum AsyncStatus {
  idle = "idle",
  loading = "loading",
  error = "error",
  success = "success",
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
    const data = await response.json();

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

// const initialState = {
//   status: 'idle',
//   data: null,
// }

// const useAsync = (userState = initialState) => {
//   const [data, setData] = React.useState(null)
//   const [state, dispatch] = React.useReducer(
//     (state, action) => ({ state, ...action }),
//     userState,
//   );

//   const run = (promise) => {
//     console.log(promise);
//     dispatch({status: 'loading'});
//   }

//   export {
//     status: state.status,
//     isIdle: state.status === 'idle',
//     isLoading: state.status === 'loading',
//     isError: state.status === 'error',
//     isSuccess: state.status === 'success',
//     data,
//     setData,
//     run
//   }
// }

const AuthContext = React.createContext<IState>({} as IState);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = React.useState<AsyncStatus>(AsyncStatus.idle);
  const [error, setError] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<IUser | null>(null);

  React.useEffect(() => {
    setStatus(AsyncStatus.loading);

    const bootstrap = async () => {
      const token = window.localStorage.getItem(localStorageKey);
      if (token) {
        await client("users/getUser", { token }).then(
          (data) => {
            console.log("bootstrap data:", data);
            setStatus(AsyncStatus.success);
            setUser(data);
          },
          (err) => {
            console.error(err);
          },
        );
      }
    };

    bootstrap();
  }, []);

  const login = async (data: ILoginFormInputs) => {
    setStatus(AsyncStatus.loading);
    return client("users/login", { data })
      .then(handleUserResponse)
      .then((user) => {
        setStatus(AsyncStatus.success);
        console.log(user);
        return user;
      })
      .catch((error) => {
        setStatus(AsyncStatus.error);
        setError(error);
      });
  };

  const signup = async (data: IRegisterFormInputs) => {
    setStatus(AsyncStatus.loading);
    return client("users/signup", { data })
      .then(handleUserResponse)
      .then((user) => {
        setStatus(AsyncStatus.success);
        console.log(user);
        return user;
      })
      .catch((error) => {
        setStatus(AsyncStatus.error);
        setError(error);
      });
  };

  if (status === AsyncStatus.loading || status === AsyncStatus.idle) {
    return <div>loading...</div>;
  }

  if (status === AsyncStatus.error) {
    return <div>{error}</div>;
  }

  return (
    <AuthContext.Provider value={{ user, status, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
