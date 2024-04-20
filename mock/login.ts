// 根据角色动态生成路由
import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/login",
    method: "post",
    response: ({ body }) => {
      if (body.account === "admin") {
        return {
          account: "admin",
          // 一个用户可能有多个角色
          roles: ["admin"],
          accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
        };
      } else {
        return {
          account: "common",
          // 一个用户可能有多个角色
          roles: ["common"],
          accessToken: "eyJhbGciOiJIUzUxMiJ9.common",
        };
      }
    }
  }
]);
