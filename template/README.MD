### 问题
* 登录成功后，返回用户ID
* 根据用户ID获取用户信息，包含角色ID、岗位ID、部门ID
* 根据角色ID获取角色权限信息，包括菜单权限
* 根据部门ID获取部门信息
* 密码重置？登录过期？
* 时序图接口
* 角色分配用户，增删改查

### 编译
* 测试环境文件编译命令   
  fm start --release test -c config/dev.config.js
* 生产环境编译命令   
  fm start --release prod -c config/dev.prod.js

### 启动
  pm2 start config-pm2/dev.config.js