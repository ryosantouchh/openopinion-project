import axios, { AxiosRequestConfig, Method } from "axios";

export async function apiWrapper<TResponseData, TBody = null>({
  method,
  endpoint,
  data,
}: {
  method: Method;
  endpoint: string;
  data?: TBody;
}) {
  try {
    const config: AxiosRequestConfig<TBody> = {
      method,
      url: `${endpoint}`,
      ...(data || { data }),
    };

    const res = await axios<TResponseData>(config);

    return res;
  } catch (error: any) {
    console.error(error?.message);
  }
}
