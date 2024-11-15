import { apiWrapper } from "@/utils";

export async function uploadDataToAkave<TData>(data: TData) {
  return await apiWrapper<TData>({
    method: "POST",
    endpoint: process.env.NEXT_PUBLIC_AKAVE_END_POINT!,
    data,
  });
}
