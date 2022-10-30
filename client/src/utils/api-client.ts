interface IConfig {
  data?: object;
  token?: string;
  headers?: Record<string, string>;
}

interface IResponse<T> {
  status: string;
  data: T;
}

async function client<T>(
  endpoint: string,
  { data, token, headers: customHeaders, ...customConfig }: IConfig = {},
) {
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
      ...customHeaders,
    },
    ...customConfig,
  };

  return window.fetch(`/api/v1/${endpoint}`, config).then(async (response) => {
    const data: IResponse<T> = await response.json();

    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export { client };
