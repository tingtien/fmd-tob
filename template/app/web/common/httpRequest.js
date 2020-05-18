/** 
 * @Author:linian 
 * @Date: 2019-04-09 10:07:00 
 * @Description: http 请求封装
 */
import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use(config => {
  return {
    ...config,
    timeout: 5000,
    withCredentials: true,
  };
}, error => {
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(response => {
  const resData = response.data;
  if (resData.code === '10000') {
    resData.success = true;
    return resData;
  } else {
    resData.success = false;
    if (resData.message === '请先登录') {
      window.location.href = '/login/index';
    }

    // 兼容布局样式设置
    if (resData.message === "设置成功") {
      return response;
    }
    return resData;
  }
}, error => {
  return Promise.reject(error);
});

export default axios;
