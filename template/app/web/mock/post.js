module.exports = {
  'POST /system/post/list': (req, res) => {
    res.json(
      {
        "code": "10000", "data": {
          "total": 5,
          "rows": [
            { "searchValue": null, "createBy": "admin", "createTime": "2018-03-16 11:33:00", "updateBy": null, "updateTime": null, "remark": "", "params": {}, "pageNum": null, "pageSize": null, "orderByColumn": null, "isAsc": null, "ids": null, "postId": 4, "postCode": "user", "postName": "普通员工", "postSort": "4", "status": "0", "flag": false },
            { "searchValue": null, "createBy": "admin", "createTime": "2018-03-16 11:33:00", "updateBy": null, "updateTime": null, "remark": "", "params": {}, "pageNum": null, "pageSize": null, "orderByColumn": null, "isAsc": null, "ids": null, "postId": 3, "postCode": "hr", "postName": "人力资源", "postSort": "3", "status": "1", "flag": false },
            { "searchValue": null, "createBy": "admin", "createTime": "2018-03-16 11:33:00", "updateBy": null, "updateTime": null, "remark": "", "params": {}, "pageNum": null, "pageSize": null, "orderByColumn": null, "isAsc": null, "ids": null, "postId": 2, "postCode": "se", "postName": "项目经理", "postSort": "2", "status": "2", "flag": false },
            { "searchValue": null, "createBy": "admin", "createTime": "2018-03-16 11:33:00", "updateBy": null, "updateTime": null, "remark": "", "params": {}, "pageNum": null, "pageSize": null, "orderByColumn": null, "isAsc": null, "ids": null, "postId": 1, "postCode": "ceo", "postName": "董事长", "postSort": "1", "status": "3", "flag": false },
            { "searchValue": null, "createBy": "admin", "createTime": "2018-03-16 11:33:00", "updateBy": null, "updateTime": null, "remark": "", "params": {}, "pageNum": null, "pageSize": null, "orderByColumn": null, "isAsc": null, "ids": null, "postId": 5, "postCode": "xz", "postName": "行政管理", "postSort": "1", "status": "4", "flag": false }
          ], "code": 0
        }, "message": "成功!"
      }
    );
  },
  'POST /system/post/remove': (req, res) => {
    res.json(
      { "code": "10000", "data": null, "message": "成功!" }
    );
  },
  'POST /system/post/add': (req, res) => {
    res.json(
      { "code": "10000", "data": null, "message": "成功!" }
    );
  },
  'POST /system/post/edit': (req, res) => {
    res.json(
      { "code": "10000", "data": null, "message": "成功!" }
    );
  }
};