import { http, baseUrlApi } from "@/utils/http";

export type UserResult = {
  code: number;
  status: string;
  data: {
    /** 用户名 */
    account: string;
    /** 当前登录用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
    /** 刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（时间戳） */
    tokenExpires: number;
  };
};

export type RefreshTokenResult = {
  code: number;
  status: string;
  data: {
    /** `token` */
    accessToken: string;
    /** 刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（时间戳） */
    tokenExpires: number;
  };
};

/** 登录 */
export const login = (data?: object) => {
  return http.request<UserResult>("post", baseUrlApi("login"), { data });
};

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/refresh-token", { data });
};
