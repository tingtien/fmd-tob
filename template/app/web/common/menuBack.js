const menu = [{
  id: '1',
  title: '系统管理',
  icon: 'setting',
  childMenu: [
    {
      id: '11',
      title: '用户管理',
      router: '/management/user'
    },
    {
      id: '12',
      title: '角色管理',
      router: '/management/role'
    },
    {
      id: '13',
      title: '部门管理',
      router: '/management/depart'
    },
    {
      id: '14',
      title: '岗位管理',
      router: '/management/post'
    },
    {
      id: '15',
      title: '菜单管理',
      router: '/management/menu'
    },
  ]
}, {
  id: '2',
  title: '日志管理',
  icon: 'line-chart',
  childMenu: [{
    id: '21',
    title: '日志查询',
    router: '/management/log'
  }]
}];