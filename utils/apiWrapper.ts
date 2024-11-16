import axios, { AxiosRequestConfig, Method } from "axios";

export async function apiWrapper<TData>({
  method,
  endpoint,
  data,
  config,
}: {
  method: Method;
  endpoint: string;
  data?: TData;
  config?: Record<string, unknown>;
}) {
  try {
    // const headers = {
    //   Authorization: `Bearer YOUR_BEARER_TOKEN`, // Replace with your actual token
    // };
    const headers = {
      "Content-Type": "application/json",
    };

    const apiConfig: AxiosRequestConfig<TData> = {
      method,
      url: `${endpoint}`,
      ...(data || { data }),
      headers: {
        ...headers,
        ...config,
      },
    };

    console.log(apiConfig);

    const res = await axios(apiConfig);

    return res;
  } catch (error: any) {
    console.error(error?.message);
  }
}
