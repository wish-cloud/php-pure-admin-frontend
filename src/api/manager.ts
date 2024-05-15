import { http, baseUrlApi } from "@/utils/http";

type Result = {
  status: String;
  data?: Array<any>;
};

type ResultTable = {
  status: String;
  data?: {
    /** 列表数据 */
    data: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    per_page?: number;
    /** 当前页数 */
    current_page?: number;
  };
};

/** 用户列表 */
export const getUserList = (params?: object) => {
  return http.request<ResultTable>("get", baseUrlApi("manager/users"), {
    params
  });
};

/** 新增用户 */
export const createUser = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("manager/user/create"), {
    data
  });
};

/** 编辑用户 */
export const editUser = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("manager/user/edit"), {
    data
  });
};

/** 重置密码 */
export const changePassword = (data?: object) => {
  return http.request<Result>(
    "post",
    baseUrlApi("manager/user/changePassword"),
    {
      data
    }
  );
};

/** 切换状态 */
export const changeStatus = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("manager/user/changeStatus"), {
    data
  });
};

/** 删除用户 */
export const deleteUser = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("manager/user/delete"), {
    data
  });
};

/** 批量删除用户 */
export const batchDeleteUser = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("manager/user/batchDelete"), {
    data
  });
};

/** 分配角色 */
export const assignRole = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("manager/user/assignRole"), {
    data
  });
};

/** 角色列表 */
export const getRoleList = (params?: object) => {
  return http.request<ResultTable>("get", baseUrlApi("manager/roles"), {
    params
  });
};

/** 新增角色 */
export const createRole = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("manager/role/create"), {
    data
  });
};

/** 编辑角色 */
export const editRole = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("manager/role/edit"), {
    data
  });
};

/** 删除角色 */
export const deleteRole = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("manager/role/delete"), {
    data
  });
};

/** 所有角色数组 */
export const getAllRoleList = () => {
  return http.request<Result>("get", baseUrlApi("manager/all-roles"));
};

/** 菜单列表 */
export const getMenuList = (params?: object) => {
  return http.request<Result>("get", baseUrlApi("manager/menus"), { params });
};

/** 新增菜单 */
export const createMenu = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("manager/menu/create"), {
    data
  });
};

/** 编辑菜单 */
export const editMenu = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("manager/menu/edit"), {
    data
  });
};

/** 删除菜单 */
export const deleteMenu = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("manager/menu/delete"), {
    data
  });
};

/** 根据角色 id 查对应菜单 */
export const getRoleMenuIds = (params?: object) => {
  return http.request<Result>("get", baseUrlApi("manager/role-menu-ids"), {
    params
  });
};

/** 设置角色权限 */
export const setRoleMenu = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("manager/role/setMenu"), {
    data
  });
};
