module.exports = {
  'POST /system/role/list': (req, res) => {
    res.json(
      { "code": "10000", "data": { "total": 2, "rows": [{ "searchValue": null, "createBy": null, "createTime": "2019-05-05 15:58:53", "updateBy": null, "updateTime": null, "remark": "普通使用者", "params": {}, "pageNum": null, "pageSize": null, "orderByColumn": null, "isAsc": null, "ids": null, "roleId": 100, "roleName": "普通用户", "roleKey": "common-user", "roleSort": "2", "dataScope": "1", "status": "0", "delFlag": "0", "flag": false, "menuIds": null, "deptIds": null, "extra": null }, { "searchValue": null, "createBy": null, "createTime": "2018-03-16 11:33:00", "updateBy": null, "updateTime": null, "remark": "管理员", "params": {}, "pageNum": null, "pageSize": null, "orderByColumn": null, "isAsc": null, "ids": null, "roleId": 1, "roleName": "管理员", "roleKey": "admin", "roleSort": "1", "dataScope": "1", "status": "1", "delFlag": "0", "flag": false, "menuIds": null, "deptIds": null, "extra": null }], "code": 0 }, "message": "成功!" }
    );
  },
  'POST /system/role/remove': (req, res) => {
    res.json(
      { "code": "10000", "data": null, "message": "成功!" }
    );
  },
  'POST /system/role/edit': (req, res) => {
    res.json(
      { "code": "10000", "data": null, "message": "成功!" }
    );
  },
  'POST /system/role/authUser/unallocatedList': (req, res) => {
    res.json(
      { "code": "10000", "data": { "total": 1, "rows": [{ "searchValue": null, "createBy": null, "createTime": "2019-05-14 15:19:39", "updateBy": null, "updateTime": null, "remark": null, "params": {}, "pageNum": null, "pageSize": null, "orderByColumn": null, "isAsc": null, "ids": null, "userId": 102, "deptId": 100, "parentId": null, "roleId": null, "loginName": "test1", "userName": "test1", "email": "289495238@qq.com", "phonenumber": "18696785284", "sex": null, "avatar": null, "password": null, "salt": null, "status": "0", "delFlag": null, "loginIp": null, "loginDate": null, "dept": { "searchValue": null, "createBy": null, "createTime": null, "updateBy": null, "updateTime": null, "remark": null, "params": {}, "pageNum": null, "pageSize": null, "orderByColumn": null, "isAsc": null, "ids": null, "deptId": 100, "parentId": null, "ancestors": null, "deptName": null, "orderNum": null, "leader": null, "phone": null, "email": null, "status": null, "delFlag": null, "parentName": null }, "roles": [], "roleIds": null, "postIds": null, "admin": false }], "code": 0 }, "message": "成功!" }
    );
  },
  'POST /system/role/authUser/allocatedList': (req, res) => {
    res.json(
      { "code": "10000", "data": { "total": 1, "rows": [{ "searchValue": null, "createBy": null, "createTime": "2019-05-05 16:07:28", "updateBy": null, "updateTime": null, "remark": null, "params": {}, "pageNum": null, "pageSize": null, "orderByColumn": null, "isAsc": null, "ids": null, "userId": 100, "deptId": 200, "parentId": null, "roleId": null, "loginName": "xiechangjiang", "userName": "谢长江", "email": "1043862908@qq.com", "phonenumber": "15683623501", "sex": null, "avatar": null, "password": null, "salt": null, "status": "0", "delFlag": null, "loginIp": null, "loginDate": null, "dept": { "searchValue": null, "createBy": null, "createTime": null, "updateBy": null, "updateTime": null, "remark": null, "params": {}, "pageNum": null, "pageSize": null, "orderByColumn": null, "isAsc": null, "ids": null, "deptId": 200, "parentId": null, "ancestors": null, "deptName": null, "orderNum": null, "leader": null, "phone": null, "email": null, "status": null, "delFlag": null, "parentName": null }, "roles": [], "roleIds": null, "postIds": null, "admin": false }], "code": 0 }, "message": "成功!" }
    );
  },
  'POST /system/role/authUser/selectAll': (req, res) => {
    res.json(
      { "code": "10000", "data": null, "message": "成功!" }
    );
  },
  'POST /system/role/authUser/cancelAll': (req, res) => {
    res.json(
      { "code": "10000", "data": null, "message": "成功!" }
    );
  },
  'POST /system/role/authUser/cancel': (req, res) => {
    res.json(
      { "code": "10000", "data": null, "message": "成功!" }
    );
  },
};