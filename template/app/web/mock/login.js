const mockjs = require('mockjs');

module.exports = {
    // 登录
    'POST /login': (req, res) => {
        const user = {
            userName: 'fm.design',
            password: 'fmd666'
        };
        if (req.body.userName === user.userName && req.body.password === user.password) {
            res.json(
                {
                    "code": "10000",
                    "data": {
                        "searchValue": null,
                        "createBy": null,
                        "createTime": "2018-03-16 11:33:00",
                        "updateBy": null,
                        "updateTime": null,
                        "remark": "管理员",
                        "params": {},
                        "pageNum": null,
                        "pageSize": null,
                        "orderByColumn": null,
                        "isAsc": null,
                        "ids": null,
                        "userId": 1,
                        "deptId": 103,
                        "parentId": null,
                        "roleId": null,
                        "loginName": "admin",
                        "userName": "富民",
                        "email": "ry@163.com",
                        "phonenumber": "15888888888",
                        "sex": "0",
                        "avatar": "",
                        "password": "29c67a30398638269fe600f73a054934",
                        "salt": "111111",
                        "status": "0",
                        "delFlag": "0",
                        "loginIp": "172.18.0.2",
                        "loginDate": "2019-05-14 10:21:18",
                        "dept": {
                            "searchValue": null,
                            "createBy": null,
                            "createTime": null,
                            "updateBy": null,
                            "updateTime": null,
                            "remark": null,
                            "params": {},
                            "pageNum": null,
                            "pageSize": null,
                            "orderByColumn": null,
                            "isAsc": null,
                            "ids": null,
                            "deptId": 103,
                            "parentId": null,
                            "ancestors": null,
                            "deptName": null,
                            "orderNum": null,
                            "leader": null,
                            "phone": null,
                            "email": null,
                            "status": null,
                            "delFlag": null,
                            "parentName": null
                        },
                        "roles": [
                            {
                                "searchValue": null,
                                "createBy": null,
                                "createTime": null,
                                "updateBy": null,
                                "updateTime": null,
                                "remark": null,
                                "params": {},
                                "pageNum": null,
                                "pageSize": null,
                                "orderByColumn": null,
                                "isAsc": null,
                                "ids": null,
                                "roleId": 1,
                                "roleName": "管理员",
                                "roleKey": "admin",
                                "roleSort": "1",
                                "dataScope": "1",
                                "status": "0",
                                "delFlag": null,
                                "flag": false,
                                "menuIds": null,
                                "deptIds": null,
                                "extra": null
                            }
                        ],
                        "roleIds": null,
                        "postIds": null,
                        "admin": true
                    },
                    "message": "成功!"
                }
            );
        } else {
            res.json({
                "code": "10006",
                "data": null,
                "message": "用户名或密码错误！"
            });
        }
    },
    'POST /logout': (req, res) => {
        res.json(
            { "code": "10000", "data": null, "message": "成功!" }
        );
    },
};