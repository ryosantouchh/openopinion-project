import { HttpStatusCode } from "axios";

export interface BaseHttpResponse<TResponseData> {
  statusCode: HttpStatusCode;
  data: TResponseData;
}
