import Cookies from "js-cookie";
import { storageLocal } from "@pureadmin/utils";
import { useUserStoreHook } from "@/store/modules/user";

export interface DataInfo<T> {
  /** token */
  accessToken: string;
  /** `accessToken`的过期时间（时间戳） */
  tokenExpires: T;
  /** 用于调用刷新accessToken的接口时所需的token */
  refreshToken: string;
  /** `refreshToken`的过期时间（时间戳） */
  refreshTokenExpires: T;
  /** 用户名 */
  account?: string;
  /** 当前登录用户的角色 */
  roles?: Array<string>;
}

export const userKey = "user-info";
export const TokenKey = "authorized-token";
/**
 * 通过`multiple-tabs`是否在`cookie`中，判断用户是否已经登录系统，
 * 从而支持多标签页打开已经登录的系统后无需再登录。
 * 浏览器完全关闭后`multiple-tabs`将自动从`cookie`中销毁，
 * 再次打开浏览器需要重新登录系统
 * */
export const multipleTabsKey = "multiple-tabs";

/** 获取`token` */
export function getToken(): DataInfo<number> {
  // 此处与`TokenKey`相同，此写法解决初始化时`Cookies`中不存在`TokenKey`报错
  return Cookies.get(TokenKey)
    ? JSON.parse(Cookies.get(TokenKey))
    : storageLocal().getItem(userKey);
}

/**
 * @description 设置`token`以及一些必要信息并采用无感刷新`token`方案
 * 无感刷新：后端返回`accessToken`、`refreshToken`，`对应过期时间戳（毫秒级）`, `refreshToken`的过期时间（比如30天）应大于`accessToken`的过期时间（比如2小时））
 * 将`accessToken`、`expires`、`refreshToken`这三条信息放在key值为authorized-token的cookie里（过期自动销毁）
 * 不勾选“记住我”时，`multipleTabsKey`为会话级cookie，当浏览器完全关闭后自动销毁
 */
export function setToken(data: DataInfo<number>) {
  const { accessToken, tokenExpires, refreshToken, refreshTokenExpires } = data;
  const { isRemembered, loginDay } = useUserStoreHook();
  const cookieString = JSON.stringify({
    accessToken,
    tokenExpires,
    refreshToken,
    refreshTokenExpires
  });

  Cookies.set(TokenKey, cookieString, {
    expires: (refreshTokenExpires - Date.now()) / 86400000
  });

  Cookies.set(
    multipleTabsKey,
    "true",
    isRemembered
      ? {
          expires: loginDay
        }
      : {}
  );

  function setUserKey({ account, roles }) {
    useUserStoreHook().SET_USERNAME(account);
    useUserStoreHook().SET_ROLES(roles);
    storageLocal().setItem(userKey, {
      account,
      roles
    });
  }

  if (data.account && data.roles) {
    const { account, roles } = data;
    setUserKey({
      account,
      roles
    });
  } else {
    const account =
      storageLocal().getItem<DataInfo<number>>(userKey)?.account ?? "";
    const roles =
      storageLocal().getItem<DataInfo<number>>(userKey)?.roles ?? [];
    setUserKey({
      account,
      roles
    });
  }
}

/** 删除`token`以及key值为`user-info`的localStorage信息 */
export function removeToken() {
  Cookies.remove(TokenKey);
  Cookies.remove(multipleTabsKey);
  storageLocal().removeItem(userKey);
}

/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
  return "Bearer " + token;
};
