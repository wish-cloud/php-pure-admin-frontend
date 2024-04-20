import { http, baseUrlApi } from "@/utils/http";

export type UserResult = {
  code: Number;
  status: string;
  data: {
    /** 用户名 */
    account: string;
    /** 当前登录用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
  };
};

/** 登录 */
export const login = (data?: object) => {
  return http.request<UserResult>("post", baseUrlApi("login"), { data });
};
