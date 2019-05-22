const mockjs = require('mockjs');
module.exports = {
    // 支持值为 Object 和 Array
    'GET /api/users': '{ users: [1, 2] }',

    // GET 可省略
    '/api/users/1': {
        id: 'get'
    },

    // POST请求
    'POST /api/users/2': {
        id: 'post'
    },

    // mock高级用法
    'GET /api/tags': mockjs.mock({
        'list|100': [{
            name: '@city',
            'value|1-100': 50,
            'type|0-2': 1
        }],
    }),
};