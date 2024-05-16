// 根据角色动态生成路由
import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/login",
    method: "post",
    response: ({ body }) => {
      if (body.account === "admin") {
        return {
          success: true,
          data: {
            account: "admin",
            name: "小铭",
            // 一个用户可能有多个角色
            roles: ["admin"],
            accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
            refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
            tokenExpires: 1893430861000,
            refreshTokenExpires: 1894035661000
          }
        };
      } else {
        return {
          success: true,
          data: {
            account: "common",
            name: "小林",
            roles: ["common"],
            accessToken: "eyJhbGciOiJIUzUxMiJ9.common",
            refreshToken: "eyJhbGciOiJIUzUxMiJ9.commonRefresh",
            tokenExpires: 1893430861000,
            refreshTokenExpires: 1894035661000
          }
        };
      }
    }
  }
]);
