module.exports = {
  port: 3000,
  URL: "http://localhost:3000",
  config: {
    staticURL: "//localhost:3000",
    reactRoute: '',
    setting: true,
    apiServer: 'http://localhost:3000'
  },
  webpackFilterDll: ["@fmware/theme", "@fmd/component-pro", "@fmd/component-pro-view"],
  codeCheck: "off"
};