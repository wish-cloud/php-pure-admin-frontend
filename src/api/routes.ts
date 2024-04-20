import { http, baseUrlApi } from "@/utils/http";

type Result = {
  code: Number;
  status: string;
  data: Array<any>;
};

export const getAsyncRoutes = () => {
  return http.request<Result>("get", baseUrlApi("get-async-routes"));
};
