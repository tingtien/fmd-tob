module.exports = {
    port: 3000,
    domain: "http://localhost:3000",
    staticURL: "//localhost:3000",
    globalJs: {
        reactRoute: '',
        setting: true,
        apiServer: 'http://localhost:3000'
    },
    vendorMultiple: {
        fmd: ["@fmd/component-pro"],
    },
    webpackFilterDll: ['@fmware/theme'],
    disableRem: true, // 禁用rem
    codeCheck: "off"
};