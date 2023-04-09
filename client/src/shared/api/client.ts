import { config } from "../const";

interface IConfig {
  data?: object;
  useToken?: boolean;
  headers?: Record<string, string>;
  method?: "PATCH" | "DELETE";
}

interface IResponse<T> {
  status: string;
  data: T;
}

async function client<T>(
  endpoint: string,
  {
    data,
    useToken = true,
    headers: customHeaders,
    ...customConfig
  }: IConfig = {},
) {
  const options = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: useToken
        ? `Bearer ${window.localStorage.getItem(config.localStorageKey)}`
        : "",
      "Content-Type": data ? "application/json" : "",
      ...customHeaders,
    },
    ...customConfig,
  };

  return window.fetch(`/api/v1/${endpoint}`, options).then(async (response) => {
    const data: IResponse<T> = await response.json();

    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export { client };
