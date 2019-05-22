module.exports = {
    port: 3033,
    domain: "http://10.1.56.11:3033",
    staticURL: "//10.1.56.11:3033",
    globalJs: {
        reactRoute: '',
        setting: false,
        apiServer: 'http://10.1.56.133:8008' // 测试
    },
    vendorMultiple: {
        fmd: ["@fmd/component-pro"],
    },
    webpackFilterDll: ['@fmd/module'],
    disableRem: true, // 禁用rem
};