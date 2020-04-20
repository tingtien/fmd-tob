module.exports = {
  port: 3033,
  URL: "http://10.1.56.11:3033",
  config: {
    staticURL: "//10.1.56.11:3033",
    reactRoute: '',
    setting: false,
    apiServer: 'http://10.1.56.133:8008' // 测试
  },
  webpackFilterDll: ["@fmware/theme", "@fmd/component-pro", "@fmd/component-pro-view"]
};