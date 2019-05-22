/**
 *@author zhaojian
 *@date 2019/2/21
 *@Description:
 */
module.exports = [
  {
    path: '/management/user',
    component: './UserList',
    loading: true
  },
  {
    path: '/management/user/:type(add|edit)',
    component: './AddOrEditUser',
    loading: true
  }
];