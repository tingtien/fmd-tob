module.exports = {
  // 获取用户权限
  'POST /system/index': (req, res) => {
    res.json(
      {
        "code": "10000",
        "data": [
          {
            "searchValue": null,
            "createBy": null,
            "createTime": "2019-05-08 14:07:37",
            "updateBy": null,
            "updateTime": null,
            "remark": null,
            "params": {},
            "pageNum": null,
            "pageSize": null,
            "orderByColumn": null,
            "isAsc": null,
            "ids": null,
            "menuId": 2006,
            "menuName": "主页",
            "parentName": null,
            "parentId": 0,
            "orderNum": "1",
            "url": "#",
            "menuType": "M",
            "visible": null,
            "perms": null,
            "icon": "home",
            "children": [
              {
                "searchValue": null,
                "createBy": null,
                "createTime": "2019-05-08 14:09:45",
                "updateBy": null,
                "updateTime": null,
                "remark": null,
                "params": {},
                "pageNum": null,
                "pageSize": null,
                "orderByColumn": null,
                "isAsc": null,
                "ids": null,
                "menuId": 2007,
                "menuName": "欢迎页",
                "parentName": null,
                "parentId": 2006,
                "orderNum": "1",
                "url": "/management/dashboard",
                "menuType": "C",
                "visible": null,
                "perms": null,
                "icon": "#",
                "children": [],
                "showType": null
              }
            ],
            "showType": null
          },
          {
            "searchValue": null,
            "createBy": null,
            "createTime": "2018-03-16 11:33:00",
            "updateBy": null,
            "updateTime": null,
            "remark": null,
            "params": {},
            "pageNum": null,
            "pageSize": null,
            "orderByColumn": null,
            "isAsc": null,
            "ids": null,
            "menuId": 2,
            "menuName": "日志管理",
            "parentName": null,
            "parentId": 0,
            "orderNum": "2",
            "url": "#",
            "menuType": "M",
            "visible": null,
            "perms": "",
            "icon": "deployment-unit",
            "children": [
              {
                "searchValue": null,
                "createBy": null,
                "createTime": "2019-04-30 14:45:35",
                "updateBy": null,
                "updateTime": null,
                "remark": null,
                "params": {},
                "pageNum": null,
                "pageSize": null,
                "orderByColumn": null,
                "isAsc": null,
                "ids": null,
                "menuId": 2000,
                "menuName": "日志查询",
                "parentName": null,
                "parentId": 2,
                "orderNum": "1",
                "url": "/management/log",
                "menuType": "C",
                "visible": null,
                "perms": null,
                "icon": "#",
                "children": [],
                "showType": null
              }
            ],
            "showType": null
          },
          {
            "searchValue": null,
            "createBy": null,
            "createTime": "2018-03-16 11:33:00",
            "updateBy": null,
            "updateTime": null,
            "remark": null,
            "params": {},
            "pageNum": null,
            "pageSize": null,
            "orderByColumn": null,
            "isAsc": null,
            "ids": null,
            "menuId": 1,
            "menuName": "系统管理",
            "parentName": null,
            "parentId": 0,
            "orderNum": "3",
            "url": "#",
            "menuType": "M",
            "visible": null,
            "perms": "",
            "icon": "setting",
            "children": [
              {
                "searchValue": null,
                "createBy": null,
                "createTime": "2018-03-16 11:33:00",
                "updateBy": null,
                "updateTime": null,
                "remark": null,
                "params": {},
                "pageNum": null,
                "pageSize": null,
                "orderByColumn": null,
                "isAsc": null,
                "ids": null,
                "menuId": 100,
                "menuName": "用户管理",
                "parentName": null,
                "parentId": 1,
                "orderNum": "1",
                "url": "/management/user",
                "menuType": "C",
                "visible": null,
                "perms": "system:user:view",
                "icon": "#",
                "children": [
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1000,
                    "menuName": "用户查询",
                    "parentName": null,
                    "parentId": 100,
                    "orderNum": "1",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:user:list",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  },
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1001,
                    "menuName": "用户新增",
                    "parentName": null,
                    "parentId": 100,
                    "orderNum": "2",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:user:add",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  },
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1002,
                    "menuName": "用户修改",
                    "parentName": null,
                    "parentId": 100,
                    "orderNum": "3",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:user:edit",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  },
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1003,
                    "menuName": "用户删除",
                    "parentName": null,
                    "parentId": 100,
                    "orderNum": "4",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:user:remove",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  },
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1004,
                    "menuName": "用户导出",
                    "parentName": null,
                    "parentId": 100,
                    "orderNum": "5",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:user:export",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  },
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1005,
                    "menuName": "用户导入",
                    "parentName": null,
                    "parentId": 100,
                    "orderNum": "6",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:user:import",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  },
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1006,
                    "menuName": "重置密码",
                    "parentName": null,
                    "parentId": 100,
                    "orderNum": "7",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:user:resetPwd",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  }
                ],
                "showType": null
              },
              {
                "searchValue": null,
                "createBy": null,
                "createTime": "2018-03-16 11:33:00",
                "updateBy": null,
                "updateTime": null,
                "remark": null,
                "params": {},
                "pageNum": null,
                "pageSize": null,
                "orderByColumn": null,
                "isAsc": null,
                "ids": null,
                "menuId": 101,
                "menuName": "角色管理",
                "parentName": null,
                "parentId": 1,
                "orderNum": "2",
                "url": "/management/role",
                "menuType": "C",
                "visible": null,
                "perms": "system:role:view",
                "icon": "#",
                "children": [
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1007,
                    "menuName": "角色查询",
                    "parentName": null,
                    "parentId": 101,
                    "orderNum": "1",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:role:list",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  },
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1008,
                    "menuName": "角色新增",
                    "parentName": null,
                    "parentId": 101,
                    "orderNum": "2",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:role:add",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  },
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1009,
                    "menuName": "角色修改",
                    "parentName": null,
                    "parentId": 101,
                    "orderNum": "3",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:role:edit",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  },
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1010,
                    "menuName": "角色删除",
                    "parentName": null,
                    "parentId": 101,
                    "orderNum": "4",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:role:remove",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  },
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1011,
                    "menuName": "角色导出",
                    "parentName": null,
                    "parentId": 101,
                    "orderNum": "5",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:role:export",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  }
                ],
                "showType": null
              },
              {
                "searchValue": null,
                "createBy": null,
                "createTime": "2018-03-16 11:33:00",
                "updateBy": null,
                "updateTime": null,
                "remark": null,
                "params": {},
                "pageNum": null,
                "pageSize": null,
                "orderByColumn": null,
                "isAsc": null,
                "ids": null,
                "menuId": 102,
                "menuName": "菜单管理",
                "parentName": null,
                "parentId": 1,
                "orderNum": "3",
                "url": "/management/menu",
                "menuType": "C",
                "visible": null,
                "perms": "system:menu:view",
                "icon": "#",
                "children": [
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1012,
                    "menuName": "菜单查询",
                    "parentName": null,
                    "parentId": 102,
                    "orderNum": "1",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:menu:list",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  },
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1013,
                    "menuName": "菜单新增",
                    "parentName": null,
                    "parentId": 102,
                    "orderNum": "2",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:menu:add",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  },
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1014,
                    "menuName": "菜单修改",
                    "parentName": null,
                    "parentId": 102,
                    "orderNum": "3",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:menu:edit",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  },
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1015,
                    "menuName": "菜单删除",
                    "parentName": null,
                    "parentId": 102,
                    "orderNum": "4",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:menu:remove",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  }
                ],
                "showType": null
              },
              {
                "searchValue": null,
                "createBy": null,
                "createTime": "2018-03-16 11:33:00",
                "updateBy": null,
                "updateTime": null,
                "remark": null,
                "params": {},
                "pageNum": null,
                "pageSize": null,
                "orderByColumn": null,
                "isAsc": null,
                "ids": null,
                "menuId": 103,
                "menuName": "部门管理",
                "parentName": null,
                "parentId": 1,
                "orderNum": "4",
                "url": "/management/depart",
                "menuType": "C",
                "visible": null,
                "perms": "system:dept:view",
                "icon": "#",
                "children": [
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1016,
                    "menuName": "部门查询",
                    "parentName": null,
                    "parentId": 103,
                    "orderNum": "1",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:dept:list",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  },
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1017,
                    "menuName": "部门新增",
                    "parentName": null,
                    "parentId": 103,
                    "orderNum": "2",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:dept:add",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  },
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1018,
                    "menuName": "部门修改",
                    "parentName": null,
                    "parentId": 103,
                    "orderNum": "3",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:dept:edit",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  },
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1019,
                    "menuName": "部门删除",
                    "parentName": null,
                    "parentId": 103,
                    "orderNum": "4",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:dept:remove",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  }
                ],
                "showType": null
              },
              {
                "searchValue": null,
                "createBy": null,
                "createTime": "2018-03-16 11:33:00",
                "updateBy": null,
                "updateTime": null,
                "remark": null,
                "params": {},
                "pageNum": null,
                "pageSize": null,
                "orderByColumn": null,
                "isAsc": null,
                "ids": null,
                "menuId": 104,
                "menuName": "岗位管理",
                "parentName": null,
                "parentId": 1,
                "orderNum": "5",
                "url": "/management/post",
                "menuType": "C",
                "visible": null,
                "perms": "system:post:view",
                "icon": "#",
                "children": [
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1020,
                    "menuName": "岗位查询",
                    "parentName": null,
                    "parentId": 104,
                    "orderNum": "1",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:post:list",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  },
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1021,
                    "menuName": "岗位新增",
                    "parentName": null,
                    "parentId": 104,
                    "orderNum": "2",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:post:add",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  },
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1022,
                    "menuName": "岗位修改",
                    "parentName": null,
                    "parentId": 104,
                    "orderNum": "3",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:post:edit",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  },
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1023,
                    "menuName": "岗位删除",
                    "parentName": null,
                    "parentId": 104,
                    "orderNum": "4",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:post:remove",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  },
                  {
                    "searchValue": null,
                    "createBy": null,
                    "createTime": "2018-03-16 11:33:00",
                    "updateBy": null,
                    "updateTime": null,
                    "remark": null,
                    "params": {},
                    "pageNum": null,
                    "pageSize": null,
                    "orderByColumn": null,
                    "isAsc": null,
                    "ids": null,
                    "menuId": 1024,
                    "menuName": "岗位导出",
                    "parentName": null,
                    "parentId": 104,
                    "orderNum": "5",
                    "url": "#",
                    "menuType": "F",
                    "visible": null,
                    "perms": "system:post:export",
                    "icon": "#",
                    "children": [],
                    "showType": null
                  }
                ],
                "showType": null
              }
            ],
            "showType": null
          },
          {
            "searchValue": null,
            "createBy": null,
            "createTime": "2019-05-16 17:55:48",
            "updateBy": null,
            "updateTime": null,
            "remark": null,
            "params": {},
            "pageNum": null,
            "pageSize": null,
            "orderByColumn": null,
            "isAsc": null,
            "ids": null,
            "menuId": 2008,
            "menuName": "异常页",
            "parentName": null,
            "parentId": 0,
            "orderNum": "4",
            "url": "#",
            "menuType": "M",
            "visible": null,
            "perms": null,
            "icon": "warning",
            "children": [
              {
                "searchValue": null,
                "createBy": null,
                "createTime": "2019-05-16 17:57:13",
                "updateBy": null,
                "updateTime": null,
                "remark": null,
                "params": {},
                "pageNum": null,
                "pageSize": null,
                "orderByColumn": null,
                "isAsc": null,
                "ids": null,
                "menuId": 2009,
                "menuName": "403",
                "parentName": null,
                "parentId": 2008,
                "orderNum": "1",
                "url": "/management/403",
                "menuType": "C",
                "visible": null,
                "perms": null,
                "icon": "#",
                "children": [],
                "showType": null
              },
              {
                "searchValue": null,
                "createBy": null,
                "createTime": "2019-05-16 17:57:47",
                "updateBy": null,
                "updateTime": null,
                "remark": null,
                "params": {},
                "pageNum": null,
                "pageSize": null,
                "orderByColumn": null,
                "isAsc": null,
                "ids": null,
                "menuId": 2010,
                "menuName": "404",
                "parentName": null,
                "parentId": 2008,
                "orderNum": "2",
                "url": "/management/404",
                "menuType": "C",
                "visible": null,
                "perms": null,
                "icon": "#",
                "children": [],
                "showType": null
              },
              {
                "searchValue": null,
                "createBy": null,
                "createTime": "2019-05-16 17:58:08",
                "updateBy": null,
                "updateTime": null,
                "remark": null,
                "params": {},
                "pageNum": null,
                "pageSize": null,
                "orderByColumn": null,
                "isAsc": null,
                "ids": null,
                "menuId": 2011,
                "menuName": "500",
                "parentName": null,
                "parentId": 2008,
                "orderNum": "3",
                "url": "/management/500",
                "menuType": "C",
                "visible": null,
                "perms": null,
                "icon": "#",
                "children": [],
                "showType": null
              }
            ],
            "showType": null
          }
        ],
        "message": "成功!"
      }
    );
  }
};