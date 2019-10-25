/** 
 * @Author:linian 
 * @Date: 2019-04-09 15:09:06 
 * @Description: 项目用到的所有后端接口
 */
import httpRequest from './httpRequest';;
const apiServer = MI.config.apiServer;

// 用户登录
export const login = params => {
  const url = `${apiServer}/login`;
  return httpRequest.post(url, params);
};

// 用户登出
export const logoutApi = () => {
  const url = `${apiServer}/logout`;
  return httpRequest.post(url);
};

// 查询用户列表
export const userList = params => {
  const url = `${apiServer}/system/user/list`;
  return httpRequest.post(url, params);
};

// 新增用户
export const addUser = params => {
  const url = `${apiServer}/system/user/add`;
  return httpRequest.post(url, params);
};

// 修改用户
export const editUser = params => {
  const url = `${apiServer}/system/user/edit`;
  return httpRequest.post(url, params);
};

// 删除用户
export const delUser = params => {
  const url = `${apiServer}/system/user/remove`;
  return httpRequest.post(url, params);
};

// 获取用户权限
export const userAuth = params => {
  const url = `${apiServer}/system/index`;
  return httpRequest.post(url, params);
};

// 重置用户密码
export const resetUserPwd = params => {
  const url = `${apiServer}/system/user/resetPwd`;
  return httpRequest.post(url, params);
};

// 用户详细
export const userDetail = params => {
  const url = `${apiServer}/system/user/edit/detail`;
  return httpRequest.post(url, params);
};

// 查询角色列表
export const roleList = params => {
  const url = `${apiServer}/system/role/list`;
  return httpRequest.post(url, params);
};

// 新增角色
export const addRole = params => {
  const url = `${apiServer}/system/role/add`;
  return httpRequest.post(url, params);
};

// 编辑角色
export const editRole = params => {
  const url = `${apiServer}/system/role/edit`;
  return httpRequest.post(url, params);
};

// 删除角色
export const delRole = params => {
  const url = `${apiServer}/system/role/remove`;
  return httpRequest.post(url, params);
};

// 获取角色菜单
export const roleMenuTreeData = params => {
  const url = `${apiServer}/system/menu/roleMenuTreeData`;
  return httpRequest.post(url, params);
};

// 分配用户-查询已分配用户列表
export const allocatedList = params => {
  const url = `${apiServer}/system/role/authUser/allocatedList`;
  return httpRequest.post(url, params);
};

// 分配用户-查询未分配用户列表
export const unallocatedList = params => {
  const url = `${apiServer}/system/role/authUser/unallocatedList`;
  return httpRequest.post(url, params);
};

// 分配用户-新增用户
export const addAuthUser = params => {
  const url = `${apiServer}/system/role/authUser/selectAll`;
  return httpRequest.post(url, params);
};

// 分配用户-取消授权
export const cancelAuthUser = params => {
  const url = `${apiServer}/system/role/authUser/cancel`;
  return httpRequest.post(url, params);
};

// 分配用户-批量取消授权
export const cancelAllAuthUser = params => {
  const url = `${apiServer}/system/role/authUser/cancelAll`;
  return httpRequest.post(url, params);
};

// 部门列表查询
export const departList = params => {
  const url = `${apiServer}/system/dept/list`;
  return httpRequest.post(url, params);
};

// 修改部门
export const editDepart = params => {
  const url = `${apiServer}/system/dept/edit`;
  return httpRequest.post(url, params);
};

// 新增部门
export const addDepart = params => {
  const url = `${apiServer}/system/dept/add`;
  return httpRequest.post(url, params);
};

// 删除部门
export const delDepart = params => {
  const url = `${apiServer}/system/dept/remove`;
  return httpRequest.post(url, params);
};

// 岗位列表查询
export const postList = params => {
  const url = `${apiServer}/system/post/list`;
  return httpRequest.post(url, params);
};

// 新增岗位
export const addPost = params => {
  const url = `${apiServer}/system/post/add`;
  return httpRequest.post(url, params);
};

// 修改岗位
export const editPost = params => {
  const url = `${apiServer}/system/post/edit`;
  return httpRequest.post(url, params);
};

// 删除岗位
export const delPost = params => {
  const url = `${apiServer}/system/post/remove`;
  return httpRequest.post(url, params);
};

// 菜单列表查询
export const menuList = params => {
  const url = `${apiServer}/system/menu/list`;
  return httpRequest.post(url, params);
};

// 新增菜单
export const addMenu = params => {
  const url = `${apiServer}/system/menu/add`;
  return httpRequest.post(url, params);
};

// 修改菜单
export const editMenu = params => {
  const url = `${apiServer}/system/menu/edit`;
  return httpRequest.post(url, params);
};

// 删除菜单
export const delMenu = params => {
  const url = `${apiServer}/system/menu/remove`;
  return httpRequest.post(url, params);
};

// 日志查询
export const logDetail = params => {
  const url = `${apiServer}/business/log/es/search`;
  return httpRequest.post(url, params);
};