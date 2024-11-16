import axios, { AxiosRequestConfig, Method } from "axios";

export async function apiWrapper<TData>({
  method,
  endpoint,
  data,
}: {
  method: Method;
  endpoint: string;
  data?: TData;
}) {
  try {
    const config: AxiosRequestConfig<TData> = {
      method,
      url: `${endpoint}`,
      ...(data || { data }),
    };

    const res = await axios(config);

    return res;
  } catch (error: any) {
    console.error(error?.message);
  }
}
