module.exports = {
  'POST /system/dept/list': (req, res) => {
    res.json(
      { "code": "10000", "data": [{ "searchValue": null, "createBy": "admin", "createTime": "2018-03-16 11:33:00", "updateBy": null, "updateTime": null, "remark": null, "params": {}, "pageNum": null, "pageSize": null, "orderByColumn": null, "isAsc": null, "ids": null, "deptId": 100, "parentId": 0, "ancestors": "0", "deptName": "富民银行", "orderNum": "0", "leader": "富民", "phone": "15888888888", "email": "ry@qq.com", "status": "0", "delFlag": "0", "parentName": null }, { "searchValue": null, "createBy": "admin", "createTime": "2019-05-05 16:06:16", "updateBy": null, "updateTime": null, "remark": null, "params": {}, "pageNum": null, "pageSize": null, "orderByColumn": null, "isAsc": null, "ids": null, "deptId": 200, "parentId": 100, "ancestors": "0,100", "deptName": "技术中台", "orderNum": "1", "leader": "豆芽", "phone": "15683623501", "email": "1043862908@qq.com", "status": "0", "delFlag": "0", "parentName": null }], "message": "成功!" }
    );
  },
  'POST /system/dept/add': (req, res) => {
    res.json(
      { "code": "10000", "data": null, "message": "成功!" }
    );
  },
  'POST /system/dept/edit': (req, res) => {
    res.json(
      { "code": "10000", "data": null, "message": "成功!" }
    );
  },
  'POST /system/dept/remove': (req, res) => {
    res.json(
      { "code": "10000", "data": null, "message": "成功!" }
    );
  }
};